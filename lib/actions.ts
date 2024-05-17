"use server";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import dbConnect from "@/store/dbConnect";
import { z } from "zod";
import { redirect } from "next/navigation";
import { User } from "@/store/definitions";
import Auth from "@/models/userAuth";
import NextAuth from "next-auth";
import { authConfig } from "@/app/../auth.config";
import Credentials from "next-auth/providers/credentials";
import { createEmployee } from "./employeeAction";

const authUserSchema = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(6),
});

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function getUser(email: string, password: string): Promise<User | null> {
  try {
    await dbConnect();
    let user: User = { id: "", name: "", email: "", other: "" };
    const matched = (await Auth.find()).filter(
      (item) =>
        bcrypt.compareSync(email, item.email) &&
        bcrypt.compare(password, password),
    );

    if (matched && matched.length > 0) {
      user.name = matched[0].name;
      user.id = matched[0]._id;
      return user;
    }
    return null;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const getValue = (data: FormDataEntryValue | null): string => {
  if (!data) return "";
  else return data.toString();
};

export async function register(
  prevState:
    | {
        name: string | undefined;
        email: string | undefined;
        password: string | undefined;
      }
    | undefined,
  formData: FormData,
): Promise<{
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}> {
  const result = authUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (result.success) {
    await dbConnect();
    const userAuth = {
      name: formData.get("name"),
      email: await hashPassword(getValue(formData.get("email"))),
      password: await hashPassword(getValue(formData.get("password"))),
    };
    const email = getValue(formData.get("email"));

    const matched = (await Auth.find()).filter((item) =>
      bcrypt.compareSync(email, item.email),
    );

    if (matched && matched.length > 0) {
      return new Promise((resolve) => {
        resolve({
          name: undefined,
          email: "Email already exists. Please user another email",
          password: undefined,
        });
      });
    } else {
      const authObj = await Auth.create(userAuth);
      await createEmployee(authObj._id.toString());
      redirect("/login");
    }
  } else {
    const { name, email, password } = result.error.formErrors.fieldErrors;
    return new Promise((resolve) => {
      resolve({
        name: name ? name[0] : "",
        email: email ? email[0] : "",
        password: password ? password[0] : "",
      });
    });
  }
}
