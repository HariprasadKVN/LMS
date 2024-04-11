import { signOut } from '@/auth';
    return <>This is your Dashboard
        <form action={async () => {
            'use server';
            await signOut();
        }}>
                Sign out
            </button>
        </form>
    </>
}

export default Dashboard