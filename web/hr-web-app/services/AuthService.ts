"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// not used up to now
export async function getSession() {
    return await getServerSession(authOptions);
}

// not used up to now
export async function getCurrentUser() {
  
    try {
        const session = await getSession()
        
        if (!session) return null

        return session.user
        
    } catch (error) {
        return null
    }
}