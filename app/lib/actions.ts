'use server';
import { signIn } from '@/auth';
import dbConnect from '@/lib/dbConnect';
import Auth from '@/models/Auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('authenticate');
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function addUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await dbConnect();
    console.log(formData.get('name'));
    const auth = await Auth.create({name:formData.get('name')});


  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}