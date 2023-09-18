"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            toast.success("Signup Success");
            router.push("/login");
        }catch (error: any){
            console.log("Signup failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 3 && user.password.length > 3 && user.username.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="p-4">{loading ? "Processing ..." : "Register"}</h1>
            <hr />
            {/* username input */}
            <label htmlFor="username">Username</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="username"
            type="text" 
            value={user.username}
            placeholder="username"
            onChange={(e) => setUser({...user, username: e.target.value})}
            />
            {/* email input */}
            <label htmlFor="email">Email</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="email"
            type="text" 
            value={user.email}
            placeholder="user@mail.com"
            onChange={(e) => setUser({...user, email: e.target.value})}
            />
            {/* password input */}
            <label htmlFor="password">Password</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="password"
            type="password" 
            value={user.password}
            placeholder="password"
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
            {/* Button starts here */}
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`my-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-black'}`}>
                Register
            </button>
            <Link href="/login" className="text-green-500">Login Here</Link>
        </div>
    )
}