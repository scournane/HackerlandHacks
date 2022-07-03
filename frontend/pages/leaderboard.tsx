import React, { useState, useEffect } from 'react'
import { api } from '../components/constants';

export default function Leaderboard() {
  
    const [leaderboard, setLeaderboard] = useState<any[]>([])

    useEffect(() => {
        getLeaderboard()
    }, [])

    async function getLeaderboard() {
        const request = await fetch(api.GET_LEADERBOARD)
        const json = await request.json()
        setLeaderboard(json)
    }

    return (
      <div className="py-4 relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Duration Listened
                    </th>
                </tr>
                </thead>
                <tbody>
                    {leaderboard.map((values, index) => {
                        return (
                            <tr key={`leader-row-${index}`} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {values.uid}
                                </th>
                                <td className="px-6 py-4">
                                    {values.time}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}