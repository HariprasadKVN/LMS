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

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await dbConnect();
    const password = formData.get("password")?.toString();
    const userAuth = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: await hashPassword(password ? password : ""),
    };
    console.log(userAuth);
    const x = await Auth.create(userAuth);
    console.log(x);
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
