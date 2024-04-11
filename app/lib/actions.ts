"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import Auth from "@/models/userAuth";
import dbConnect from "@/lib/dbConnect";

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("authenticate");
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
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await dbConnect();
    const userAuth = {
      name: formData.get("name"),
      email: await hashPassword(getValue(formData.get("email"))),
      password: await hashPassword(getValue(formData.get("password"))),
    };
    const email = await hashPassword(getValue(formData.get("email")));
    const x = await Auth.findOne({ email: email });
    console.log(x);

    if (await Auth.findOne({ email: email })) {
    } else {
      const x = await Auth.create(userAuth);
    }
  } catch (error) {
    throw error;
  }
}
