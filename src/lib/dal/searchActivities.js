"use server";

import { API_BASE_URL } from "@/lib/api";

export async function searchActivities(query) {
    try {
        const res = await fetch(
            `${API_BASE_URL}/api/v1/activities?query=${query}`
        );

        if (!res.ok) {
            throw new Error(res.statusText || "Something went wrong");
        }

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            const data = await res.json();
            return { data };
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("searchActivities error:", error);
        return {
            success: false,
            message: "something went wrong on the server, try again later",
        };
    }
}