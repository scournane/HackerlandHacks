import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useMoralis } from 'react-moralis';
import { NextRouter, useRouter } from 'next/router';

export default function Login() {

	const { authenticate, Moralis, user } = useMoralis()
	const router: NextRouter = useRouter()

    const formik = useFormik({
        initialValues: {
            first: '',
            last: ''
        },
			onSubmit: async ({ first, last }, { setSubmitting }) => {
				setSubmitting(true)
				await authenticate({ signingMessage: 'Welcome to Hackerland' })
					.then(() => {
						user?.set('Full Name', `${first.toLocaleUpperCase()} ${last.toLocaleUpperCase()}`)
						router.push('/marketplace')
					})
					.catch(() => {
						alert('Something went wrong..')
						throw new Error('Error...')
					})
					setSubmitting(false)
			}
			
    })

  return (
    <form className='px-4 py-6' onSubmit={formik.handleSubmit}>
    <div className="mb-6">
      <label htmlFor="first" className="block mb-2 text-sm font-medium text-gray-900">First Name:</label>
      <input value={formik.values.first} onChange={formik.handleChange} name='first' type="first" id="first" className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
    </div>
    <div className="mb-6">
      <label htmlFor="last" className="block mb-2 text-sm font-medium text-gray-900">Last Name:</label>
      <input value={formik.values.last} onChange={formik.handleChange} name='last' type="last" id="last" className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
		</div>
		  {/* TODO: Add Loader Widget  */}
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
  )
}
