import { signOut } from '@/auth';

const Dashboard = () => {
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