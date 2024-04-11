'use client'
import { useFormState } from "react-dom";

import Password from "../components/password";
import { register } from "../lib/actions";
import Input from "../components/input";
import Button from "../components/button";

const Register: React.FC = () => {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h2>Register to Arena</h2>
                <form action={dispatch}>
                    <div className="mb-2">
                        <label className="block text-xs">Name</label>
                        <Input id="name" name="name"></Input>
                    </div>
                    <div className="mb-2">
                        <label className="block text-xs">Email</label>
                        <Input id="email" name="email"></Input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-xs">Password</label>
                        <Password></Password>
                    </div>
                    <Button >
                        Register
                    </Button>
                </form>
            </div>
        </main>)

}

export default Register;