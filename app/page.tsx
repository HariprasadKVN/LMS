import dynamic from 'next/dynamic';

const LoginPage: React.FC = () => {
    const NoSSRLogin= dynamic(() => import('@/components/login/login'), { ssr: false })

    return (
        <div className="flex justify-center content-center">
            <div className="border border-blue-950/90 dark:border-teal-300 
                rounded my-1 px-2 py-1">
                <NoSSRLogin></NoSSRLogin>
            </div>
        </div>
    );
}

export default LoginPage;