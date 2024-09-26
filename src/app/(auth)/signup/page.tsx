"use client";

import { RegisterationType } from '@/Type/type'
import { RMFont } from '@/UI/fonts'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [values, setValues] = useState<RegisterationType>({
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        const response = await axios.post('/api/authentication/signup', values)
        console.log(response)
        setValues({
            username: "",
            email: "",
            password: ""
        })
        if(response.data.success){
            router.push("/application")
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-white">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <Link href="/">
                            <h1 className={`${RMFont.className} text-5xl text-black font-bold`}>Easior</h1>
                        </Link>
                    </div>

                    <form>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter username" />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter password" />
                            </div>


                            <div className="flex items-center bg-white">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                                    I accept the <Link href="/terms" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</Link>
                                </label>
                            </div>
                        </div>

                        <div className="!mt-12">
                            <button
                                type="button"
                                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                onClick={handleSubmit}
                            >
                                Create an account
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
