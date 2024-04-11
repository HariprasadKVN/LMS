'use client'
import { useFormState } from "react-dom";
import { addUser, authenticate } from '@/app/lib/actions';

const Register: React.FC = () => {
    const [errorMessage, dispatch] = useFormState(addUser, undefined);

    return <>Register
    <form action={dispatch}>
        <input name="name" className="dark:bg-inherit border border-slate-400/50" type="text"/>
        <button>Register</button>
    </form>
    </>
}

export default Register;