"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";

export default function ForgotPasswordPage(){
    const [email, setEmail] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (email.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[email])

    const recoverUserPassword = async () => { 

    }

    const onReset = async () => {
        await axios.post("/api/users/emailreset", {email: email});
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Recover Password</h1>
            <label htmlFor="email" className="mt-2">Email</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="email"
            type="text"
            value={email}
            placeholder="user@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            />
             <button
                onClick={onReset}
                disabled={buttonDisabled}
                className={`my-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-black'}`}>
                Send to Email
            </button>
        </div>
    )
}