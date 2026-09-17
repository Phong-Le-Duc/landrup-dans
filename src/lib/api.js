export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export function apiUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
}

export function normalizeAssetUrl(url) {
    if (!url || typeof url !== "string") {
        return url;
    }

    const backendBase = API_BASE_URL;

    return url
        .replace(/^https?:\/\/localhost(?::\d+)?/i, backendBase)
        .replace(/^https?:\/\/127\.0\.0\.1(?::\d+)?/i, backendBase);
}
