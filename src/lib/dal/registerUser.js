"use server";

import { cookies } from "next/headers";

export async function registerUser(data) {
    try {
        const body = new URLSearchParams();
        body.set("username", data.username);
        body.set("password", data.password);
        body.set("firstname", data.firstname);
        body.set("lastname", data.lastname);
        body.set("age", String(data.age));
        body.set("role", data.role || "default");

        const response = await fetch("http://localhost:4000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        const responseData = await response.json();

        if (!response.ok) {
            return {
                ok: false,
                status: response.status,
                data: responseData,
            };
        }

        const loginResponse = await fetch("http://localhost:4000/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        });

        const authData = await loginResponse.json();

        if (!loginResponse.ok || !authData?.token) {
            return {
                ok: false,
                status: loginResponse.status,
                data: authData || { message: "Kunne ikke logge ind efter oprettelse." },
            };
        }

        const cookieStore = await cookies();
        cookieStore.set("token", authData.token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        });
        cookieStore.set("username", data.username, { path: "/" });
        cookieStore.set("role", authData.role || data.role || "default", { path: "/" });

        return {
            ok: true,
            status: response.status,
            data: { ...responseData, ...authData },
        };
    } catch (error) {
        console.error("Error submitting register request:", error);
        throw error;
    }
}
