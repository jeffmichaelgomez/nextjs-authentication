import Link from "next/link";

export default function UserProfile({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className = "mb-5">Profile</h1>
            <hr />
            <p className="text-1xl mb-5">User ID: <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span></p>
            <Link href="/profile" className="text-green-500">Go back to profile</Link>
        </div>
    )
}