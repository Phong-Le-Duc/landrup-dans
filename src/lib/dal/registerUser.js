import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";

export async function registerUser(data) {
    try {
        const body = new URLSearchParams();
        body.set("username", data.username);
        body.set("password", data.password);
        body.set("firstname", data.firstname);
        body.set("lastname", data.lastname);
        body.set("age", String(data.age));
        body.set("role", data.role || "default");

        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
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

        const loginResponse = await fetch(`${API_BASE_URL}/auth/token`, {
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

        Cookies.set("token", authData.token, {
            sameSite: "lax",
            path: "/",
        });
        Cookies.set("username", data.username, { path: "/" });
        Cookies.set("role", authData.role || data.role || "default", { path: "/" });

        return {
            ok: true,
            status: response.status,
            data: { ...responseData, ...authData },
        };
    } catch (error) {
        console.error("Error submitting register request:", error);
        return {
            ok: false,
            status: 500,
            data: { message: "Noget gik galt på serveren, prøv igen senere." },
        };
    }
}
