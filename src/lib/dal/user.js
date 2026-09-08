"use server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";

export async function getCurrentUser() {
    const cookieStore = await cookies()
    if (!cookieStore.has("token")) return null;

    const token = cookieStore.get("token")?.value
    const userId = cookieStore.get("userId")?.value



    const res = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    })

    const user = await res.json()
    console.log(user)
    return user;
}
