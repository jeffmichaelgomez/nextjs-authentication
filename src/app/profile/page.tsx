"use client";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast"
import Link from "next/link";

export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = React.useState("nothing")
    const logout = async () => {
        try{
           await axios.get('/api/users/logout')
            setLoading(true);
            toast.success("Logout Success");
            router.push("/login");
        }catch(error: any){
            console.log(error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user');
        console.log(res.data)
        setData(res.data.user._id)
    }

    const [loading, setLoading] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing ..." : "Profile"}</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === 'nothing' ? "Nothing" : 
            <Link className="text-green-500" href={`/profile/${data}`}>Click for User ID
            </Link>}</h2>
            <hr />
            <button 
            onClick={getUserDetails}
            className="mt-4 bg-purple-500 hover:bg-purple-700 text-white fond-bold py-2 px-4 rounded">
            Get User Details
            </button>
            <hr />
            <button 
            onClick={logout}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 rounded">
            Logout
            </button>
        </div>

    )
}