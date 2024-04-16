'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Input from '../components/input';
import Password from '../components/password';
import Link from 'next/link';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';

const LoginPage: React.FC = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="flex justify-center content-center">
            <div className="border border-blue-950/90 dark:border-teal-300 
                rounded my-1 px-2 py-1">
                <form action={dispatch}>
                    <div className="text-lg font-bold text-center">Enter the REALM</div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-xs mb-1 mt-2">Email/User ID</label>
                        <Input id="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs mb-1 mt-2">Password</label>
                        <Password ></Password>
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row-reverse">
                        <button className="border                             
                            dark:border-teal-300 
                            dark:bg-teal-500 
                            dark:hover:bg-teal-700 
                            dark:active:bg-teal-500
                            border-blue-950/90
                            bg-blue-700/50 
                            hover:bg-blue-700 
                            hover:text-white/50
                            active:bg-blue-700/50
                            active:text-inherit 
                            m-1 px-2 py-1 rounded-md">
                            Login
                        </button>
                        <div className="content-center text-sm px-4">
                            <Link href={'/register'}>Register</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default LoginPage;