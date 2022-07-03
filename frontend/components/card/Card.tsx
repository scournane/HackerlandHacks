import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { api } from '../constants';

export default function Card({ aid, user, name, image, preview, mid, amount }: { user: string; name: string; image: string, preview: string; mid: string; amount: string; aid: string; }) {

  const [audio, setAudio] = useState<HTMLAudioElement | any>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [starting, setStarting] = useState<number>(0)
  const [duration, setDuration] = useState<string>('')

  async function config() {
    const audio = new Audio(preview)
    setAudio(audio)
    await new Promise(r => setTimeout(r, 250));
    if (audio.duration) {
      setDuration(timeStamp(audio.duration))
    } else {
      setDuration(timeStamp(0))
    }
  }

  useEffect(() => {
    config()
  }, [])

  const { user: MoralisUser, Moralis } = useMoralis()

  async function playAudio() {
    audio!.play()

    const headers = new Headers({'Content-Type': 'application/json'})
    const body = JSON.stringify({
      duration: audio.duration,
      uid: MoralisUser?.get('ethAddress')
    })

    await fetch(api.PLAY_MUSIC, {
      method: 'POST',
      body,
      headers
    })
  }

  function pauseAudio() {
    audio!.pause()
  }

  async function pay() {
    await Moralis.enableWeb3()
    await Moralis.transfer({
      amount: Moralis.Units.ETH(amount),
      receiver: aid,
      type: 'native'
    })
      .then(async () => {
        const headers = new Headers({
          'Content-Type': 'application/json'
        })
        const body = JSON.stringify({
          mid: mid,
          uid: MoralisUser?.get('ethAddress')
        })
        await fetch(api.PURCHASE_MUSIC, {
          method: 'POST',
          body,
          headers
        })
      })
  }

  async function donate() {
    await Moralis.enableWeb3()
    //await Moralis.authenticate({ signingMessage: 'Confirm your indentity'})
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

  if (audio) {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
          <img height={5000} width={10000} className="w-full h-1/3" src={image} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name} {duration} </div>
            <p className="text-gray-700 text-base">
              by {user}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={playing ? () => { pauseAudio(); setPlaying(false) } : () => { playAudio(); setPlaying(true) } }>
              {!playing ? `Play from ${timeStamp(audio!.currentTime)}` : 'Pause '}
          </button>
          <button onClick={() => pay()} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Get Music (Crypto)
          </button>
          {/* TODO:Enable Stripe */}
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Get Music (Stripe)
            </button>
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
  } else {
    return (
      // TODO: Add Loader Spinner
      <div>
        Loading...
      </div>
    )
  }
  
  
}


