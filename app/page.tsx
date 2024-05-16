import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from './loading';

const LoginPage: React.FC = () => {
    const NoSSRLoading = dynamic(() => import('@/components/login/login'), { ssr: false })

    return (
        <div className="flex justify-center content-center">
            <div className="border border-blue-950/90 dark:border-teal-300 
                rounded my-1 px-2 py-1">
                <Suspense fallback={<Loading></Loading>}>
                    <NoSSRLoading></NoSSRLoading>
                </Suspense>
            </div>
        </div>
    );
}

export default LoginPage;