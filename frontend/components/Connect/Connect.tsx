import { useMoralis } from 'react-moralis'
import { NextRouter, useRouter } from 'next/router'

export default function Connect() {
    const { isAuthenticated, logout, user } = useMoralis()
    const router: NextRouter = useRouter()

    if (isAuthenticated) {
        return (
            <>
                <button onClick={async () => {
                    await logout()
                        .then(res => {
                            router.push('/')
                        })
                }}>
                    {user?.get('ethAddress')}
                </button>
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => router.push('/auto')}>
                    Auto Login
                </button>
            </>
            
        )
    }

}