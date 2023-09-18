"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (password.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[password])

    const changePassword = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token, password})
            setVerified(true)
            console.log(`setVerified: ${setVerified}`)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        console.log(urlToken)
    },[])
   

    return (
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-2">Change Password</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No Token"}</h2>
            <div className="mb-5">
            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href= "/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
            </div>
            <label htmlFor="password">New Password</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="password"
            type="password" 
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={changePassword}
                disabled={buttonDisabled}
                className={`my-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-black'}`}>
                Change Password
            </button>
        </div>
    )


}