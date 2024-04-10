'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';

const LoginPage: React.FC = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <main className="flex items-center justify-center md:h-screen">
            <form action={dispatch}>
                <h1>Login to Arena</h1>
                <div className="mb-2">
                    <label htmlFor="userid" className="block text-xs">User ID</label>
                    <input
                        id="userid"
                        type="text"
                        name="email"
                        className="
                            appearance-none
                            border 
                            border-slate-400/50                            
                            bg-inherit
                            text-inherit
                            rounded-md px-2 py-1"/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-xs">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="
                            appearance-none
                            border 
                            border-slate-400/50                            
                            bg-inherit
                            text-inherit
                            rounded-md px-2 py-1" />
                </div>
                <button className="border border-green-300 bg-green-500 m-1 px-2 py-1 rounded-md">
                    Login
                </button>
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
            </form>
        </main>
    );
}

export default LoginPage;