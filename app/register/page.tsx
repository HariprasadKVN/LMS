'use client'
import { useFormState } from "react-dom";

import Password from "../components/password";
import { register } from "../lib/actions";
import Input from "../components/input";
import Button from "../components/button";
import Email from "../components/email";
import { useRouter } from "next/navigation";



const Register: React.FC = () => {
    const router = useRouter();
    const [errorMessage, dispatch] = useFormState(register, undefined);

    const pop = (formData: FormData) => {
        dispatch(formData);

        // console.log(errorMessage);
        // console.log('success');
        
        // if (!errorMessage?.email && !errorMessage?.name && !errorMessage?.password) {
        //     //router.push('/login')
        // }
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h2>Register to Arena</h2>
                <form action={pop}>
                    <div className="mb-2">
                        <label className="block text-xs">Name</label>
                        <Input id="name" name="name"></Input>
                        <p className="text-xs text-red-600">{errorMessage?.name}</p>
                    </div>
                    <div className="mb-2">
                        <label className="block text-xs">Email</label>
                        <Email id="email" name="email"></Email>
                        <p className="text-xs text-red-600">{errorMessage?.email}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-xs">Password</label>
                        <Password></Password>
                        <p className="text-xs text-red-600">{errorMessage?.password}</p>
                    </div>
                    <p className="text-xs dark:text-green-400">You will be redirected to login if the user is created successfully</p>
                    <Button >
                        Register
                    </Button>
                </form>
            </div>
        </main>)

}

export default Register;