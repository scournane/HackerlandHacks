import { useMoralis } from 'react-moralis'

export default function Connect() {
    const { authenticate, isAuthenticated, logout, user } = useMoralis()
    
    return (
        <button onClick={isAuthenticated ? logout() : authenticate({ signingMessage: 'Sign into Hackerland Songs' })}>
            {isAuthenticated ? user.get('ethAddress') : 'Sign In'}
        </button>
    )

}