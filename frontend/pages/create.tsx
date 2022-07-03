import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useMoralis } from 'react-moralis';
import { api } from '../components/constants';
import axios from 'axios'

export default function Login() {

    const [cover, setCover] = useState<null | File>()
    const [song, setSong] = useState<null | File>()
	const { user, Moralis } = useMoralis()

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0
        },
		onSubmit: async ({ name, price }, { setSubmitting }) => {
            const formData = new FormData()
            const coverMoralis = new Moralis.File(cover?.name!, cover!)
            await coverMoralis.saveIPFS()
            const url = coverMoralis.url()

            formData.append('audio', song as File)
            formData.append('name', name)
            formData.append('cover', url)
            formData.append('uid', user?.get('ethAddress'))
            formData.append('price', String(price))

            console.table({
                name,
                url,
                uid: user?.get('ethAddress'),
                price
            })

            const headers = new Headers({ 
                'Content-Type': 'multipart/form-data'
            })

            axios({
                method: 'POST',
                url: api.CREATE_MUSIC,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
                //handle success
                console.log(response);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              });
		}	
    })

  return (
    <form className='px-4 py-6' onSubmit={formik.handleSubmit}>
        <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Song Name:</label>
            <input value={formik.values.name} onChange={formik.handleChange} name='name' type="text" id="name" className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="The Motto" required />
        </div>
        <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price (in ETH):</label>
            <input value={formik.values.price} onChange={formik.handleChange} name='price' type="number" id="price" className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0.01" required />
		</div>
		<div className="mb-6">
            <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900">Song Cover:</label>
			<input
				name='cover'
				id='cover'
				type='file'
				onChange={(e) => setCover(e.target.files![0])}
				required
				className='form-file block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none'
			/>
          </div>
          <div className="mb-6">
            <label htmlFor="song" className="block mb-2 text-sm font-medium text-gray-900">Song:</label>
			<input
				name='song'
				id='song'
                type='file'
				onChange={(e) => setSong(e.target.files![0])}
				required
				className='form-file block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none'
			/>
            </div>
		  {/* TODO: Add Loader Widget  */}
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
  )
}
