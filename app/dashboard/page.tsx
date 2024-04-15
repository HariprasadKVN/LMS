import { signIn, signOut } from '../lib/actions';

const Dashboard: React.FC = () => {
    return <>This is your Dashboard
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button>
                Sign out
            </button>
        </form>
    </>
}

export default Dashboard