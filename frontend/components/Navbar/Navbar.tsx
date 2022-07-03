import Connect from '../Connect/Connect'
import { useMoralis } from 'react-moralis'
import { links } from './NavLinks'
import Link from 'next/link'

export default function Navbar() {

    const { isAuthenticated } = useMoralis()

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img height={100} width={100} src='https://media.discordapp.net/attachments/992560938555285628/993011270276108348/Song_Store.png' />
                <span className="font-semibold text-xl tracking-tight">SongStore</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    {isAuthenticated ? <Music /> : <Auth />}
                </div>
                <div>
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    <Connect />
                </a>
                </div>
            </div>
        </nav> 
    )
}

function Auth() {
    return (
        <>
            {links.auth.map((values, index) => (
                <Link key={`nav-link-${index}`} href={values.link}>
                    <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        {values.name}
                    </span>
                </Link>
            ))}
        </>
    )
}

function Music() {
    return (
        <>
            {links.music.map((values, index) => (
                <Link key={`nav-link-${index}`} href={values.link} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        {values.name}
                    </span>
                </Link>
            ))}
        </>
    )
}

