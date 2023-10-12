"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FormWrapper, StyledForm, FormTitle, ProfileInfo, StyledButton, AdminButton } from './ProfileStyles';
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = React.useState("nothing");
    const [isAdmin, setIsAdmin] = React.useState(false); // Assuming you'll set this after fetching user details

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Success");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user');
        setData(res.data.user._id);
        setIsAdmin(res.data.user.isAdmin);
    };

    return (
        <FormWrapper>
            <StyledForm>
                <FormTitle>Profile Dashboard</FormTitle>
                
                {/* User Details */}
                <ProfileInfo>
                    <h3>User Details</h3>
                    <p>
                        User ID: {data === 'nothing' ? "Nothing" : 
                        <Link href={`/profile/${data}`}>Click for User ID</Link>}
                    </p>
                </ProfileInfo>

                {/* Buttons */}
                <StyledButton onClick={getUserDetails}>Get User Details</StyledButton>

                {isAdmin && <AdminButton onClick={() => router.push("/products")}>Admin Panel</AdminButton>}

                <StyledButton onClick={logout} style={{marginTop: '1rem'}}>Logout</StyledButton>
            </StyledForm>
        </FormWrapper>
    );
}
