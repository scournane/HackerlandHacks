import React, {useEffect, useState} from 'react'
import { api } from '../components/constants'
import Card from '../components/card/Card'

export default function Marketplace() {

    const [songs, setSongs] = useState<any[]>([{
        name: 'asfdad',
        artist: 'John Doe',
        uid: '0x9116895d9248E29B8bb400c09d550376f6Bb517a',
        cover: 'data:image/jpeg;base64,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',
        amount: '0.01',
        genre: 'pop',
        mid: 'assdfasdfasdfasdf',
        preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }])

    async function getSongList() {
        const fetchReq = await fetch(api.GET_ALL_MUSIC, {
            method: 'GET'
        })
        const json = await fetchReq.json()
        setSongs(json)
    }

    useEffect(() => {
        getSongList()
    }, [])

    return (
        <div className='px-5 py-3'>
            <div className='flex flex-row space-x-3 py-4'>
                <button className='font-semibold underline-offset-1 decoration-teal-400 underline text-black-400'>
                    Trending
                </button>
                <button>
                    Pop
                </button>
                <button>
                    Jazz
                </button>
                <button>
                    Country
                </button>
                <button>
                    Rock
                </button>
                <button>
                    Classical
                </button>
            </div>
            <div>
                {songs.map((values, index) => {
                    return (
                        <div key={`song-item-${index}`}>
                            <Card
                                name={values.name}
                                user={values.uid}
                                image={values.cover}
                                amount={values.price}
                                mid={values.mid}
                                preview={values.preview}
                                aid={values.uid}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
