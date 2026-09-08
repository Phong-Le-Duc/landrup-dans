"use server";
import { cookies } from "next/headers";

export async function getCurrentUser() {
    const cookieStore = await cookies()
    if (!cookieStore.has("token")) return null;

    const token = cookieStore.get("token")?.value
    const userId = cookieStore.get("userId")?.value



    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })

    const user = await res.json()
    console.log(user)
    return user;
}
