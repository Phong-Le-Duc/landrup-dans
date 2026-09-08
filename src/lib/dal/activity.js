"use server";

import { API_BASE_URL } from "@/lib/api";

export async function getActivities() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/activities`);

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
        console.log("getAllActivities error:", error);
        return {
            success: false,
            message: "something went wrong on the server, try again later",
        };
    }
}

export async function getAllActivities() {
    return getActivities();
}

export async function getActivityById(id) {
    try {
        if (!id) {
            throw new Error("Missing ID");
        }

        if (Number.isNaN(Number(id))) {
            throw new Error("ID is not a number");
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/activities/${id}`);
        if (!res.ok) {
            if (res.status === 404) {
                return { data: null };
            }
            throw new Error(res.statusText || "Something went wrong");
        }

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return { data: await res.json() };
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("getActivityById error:", error);
        return {
            success: false,
            message: "something went wrong on the server, try again later",
        };
    }
}

export async function addUserActivity(userId, activityId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!activityId) throw new Error("Missing activityId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `${API_BASE_URL}/api/v1/users/${userId}/activities/${activityId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}

export async function deleteUserActivity(userId, activityId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!activityId) throw new Error("Missing activityId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `${API_BASE_URL}/api/v1/users/${userId}/activities/${activityId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return { success: true };
}

export async function getUserActivities(userId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(`${API_BASE_URL}/api/v1/users/${userId}/activities`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Status ${res.status}: ${body}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return { data: await res.json() };
    }

    throw new Error("Not JSON");
}



export async function createActivity(activityData) {
    const res = await fetch(`${API_BASE_URL}/api/v1/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityData),
    });
    const data = await res.json();
    return { ok: res.ok, data };
}