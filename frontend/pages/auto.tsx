import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
export default function Auto() {
    
    const router = useRouter()
    const { authenticate } = useMoralis()
    
    async function handleClick() {
        await authenticate({ signingMessage: 'Sign in without names' })
            .then(() => {
                router.push('/marketplace')
            })
    }

    return (
        <button onClick={() => handleClick()} type="button" className="m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Sign In
        </button>
    )
}