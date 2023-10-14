import {SignJWT, jwtVerify, type JWTPayload} from 'jose';
import jwt from 'jsonwebtoken';

interface Token extends jwt.JwtPayload {
    isAdmin: boolean;
    id: string;
    username: string;
    email: string;
}

export async function sign(payload: Token, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60; // one hour

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<Token> {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));

    // Check if the token is expired.
    if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new Error('Token is expired.');
    }
    // Add other checks as required.

    // if its all good, return it.
    return payload as Token;
}