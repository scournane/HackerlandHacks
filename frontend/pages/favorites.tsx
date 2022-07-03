import React from 'react'
import { useEffect, useState } from 'react';
import { api } from '../components/constants';
import { useMoralis } from 'react-moralis';
import Image from 'next/image'

export default function Favorites() {

  const { user } = useMoralis()

  const [fav, setFavs] = useState<any[]>([{
    name: '',
    artist: '',
    uid: '',
    cover: '',
    amount: '',
    genre: '',
    mid: '',
    audio: ''
}])

  async function getFavorites() {
    const request = await fetch(api.GET_FAVORITES(user?.get('ethAddress')))
    const json = await request.json()
    setFavs(json)
  }

  useEffect(() => {
    getFavorites()
  }, [])

  if (fav) {
    return (
      <div className="p-3">
        {fav.map((values, index) => {
  
          return (
            <ProfileCard
                key={`music-profile-${index}`}
                aid={values.uid}
                genre={values.genre}
                image={values.cover}
                mid={values.mid}
                name={values.name}
                preview={values.preview}
                user={values.artist}
              />
          )})}
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
  
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
        <img height={5000} width={10000} className="w-full h-1/3" src={image} alt="Sunset in the mountains" />
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
            </button>
        </div>
      </div>
    )
  } 