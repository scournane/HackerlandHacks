import React from 'react'
import Image from 'next/image'
import { Badge, Avatar } from 'web3uikit';
import { api } from '../components/constants';
import { useMoralis } from 'react-moralis';
import { useState, useEffect } from 'react';

export default function Profile() {

    const { user } = useMoralis()

    const [profile, setProfileData] = useState<{ uid: string; music: any[]; favorites: any[]; time: number; }>({
        uid: '',
        music: [{
            name: '',
            artist: '',
            uid: '',
            cover: 'https://c.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif',
            amount: '',
            genre: '',
            mid: '',
            audio: ''
        }],
        favorites: [],
        time: 0
    })

    async function getData() {
        const data_request = await fetch(api.USER_PROFILE(user?.get('ethAddress')))
        const json = await data_request.json()
        setProfileData(json)
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div>
          <div className="px-3 max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">

		    <div className="p-4 md:p-12 text-center lg:text-left w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
		
                <Image width={150} height={150} className="text-center text-4xl block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" alt='profile pic' src="data:image/jpeg;base64,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" />
			    <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user?.getUsername()}</h1>
			    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                  <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg> {profile.time}</p>
                    <p className="pt-8 text-sm">A Song Writer and Music Listener</p>
                </div>
                <div className="absolute top-0 right-0 h-12 w-18 p-4">
                    <button className="js-change-theme focus:outline-none">🌙</button>
              </div>
              <div className='py-2 px-6'>
              {profile.music.map((values, index) => {

                    return (
                        <ProfileCard
                            key={`music-profile-${index}`}
                            aid={values.wallet}
                            image={values.cover}
                            mid={values.mid}
                            name={values.name}
                            preview={values.audio}
                            user={values.wallet}
                        />
                    )})}
              </div>
              
              </div>
          </div>
        
  )
}

function ProfileCard({ aid, user, name, image, preview, mid, genre }: { user: string; name: string; image: string, preview: string; mid: string; genre: string; aid: string; }) {

    const { Moralis, user: MoralisUser } = useMoralis()

    async function donate() {
            await Moralis.enableWeb3()
            await Moralis.authenticate({ signingMessage: 'Confirm your indentity'})
            await Moralis.transfer({
              amount: Moralis.Units.ETH(0.1),
              receiver: aid,
              type: 'native'
            })
          }
        
          function timeStamp(totalSeconds: number) {
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            seconds = Math.round(seconds)
            return `${minutes}:${seconds}`
          }
          
          async function favorite() {
            const body = JSON.stringify({
              uid: MoralisUser?.get('ethAddress'),
              mid
            })
            const headers = new Headers({'Content-Type': 'application/json'})
            await fetch(api.FAVORITE, {
              method: 'POST',
              headers,
              body
            })
          }

    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
          <Image height={5000} width={10000} className="w-full h-1/3" src={image} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base">
              by {user}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <audio controls>
                    <source src={preview}>
                    </source>        
            </audio>
            <button onClick={() => donate()} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Donate
          </button>
          <button onClick={() => favorite()} className="flex bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className='px-2'>
                Favorite
              </span>
            </button>
        </div>
      </div>
    )
  } 

