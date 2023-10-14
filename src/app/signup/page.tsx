"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, GlassBox, Input, Button, InputContainer, FormTitle, ActionGroup, FormRow, FormLabelSide, LabelP } from './SignupStyles';

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

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
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 3 && user.password.length > 3 && user.username.length > 3){
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <Container>
            <GlassBox>
                <FormTitle>{loading ? "Processing ..." : "Register"}</FormTitle>

                <FormRow>
                    <FormLabelSide htmlFor="username">Username:</FormLabelSide>
                    <InputContainer>
                        <Input
                            id="username"
                            type="text" 
                            value={user.username}
                            placeholder="username"
                            onChange={(e) => setUser({...user, username: e.target.value})}
                        />
                    </InputContainer>
                </FormRow>

                <FormRow>
                    <FormLabelSide htmlFor="email">Email:</FormLabelSide>
                    <InputContainer>
                        <Input
                            id="email"
                            type="text" 
                            value={user.email}
                            placeholder="user@mail.com"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                    </InputContainer>
                </FormRow>

                <FormRow>
                    <FormLabelSide htmlFor="password">Password:</FormLabelSide>
                    <InputContainer>
                        <Input
                            id="password"
                            type="password" 
                            value={user.password}
                            placeholder="password"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </InputContainer>
                </FormRow>

                <Button onClick={onSignup} disabled={buttonDisabled}>
                    Register
                </Button>

                <ActionGroup>
                    <Link href="/login" passHref>
                        <LabelP>Login Here</LabelP>
                    </Link>
                </ActionGroup>
            </GlassBox>
        </Container>
    )
}
