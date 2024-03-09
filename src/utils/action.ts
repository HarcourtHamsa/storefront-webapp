
export function parseCookieString(cookieString: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    // Split the cookie string into individual cookies
    const cookieArray = cookieString.split(';');
    // Iterate over each cookie
    cookieArray.forEach(cookie => {
        // Split each cookie into key-value pairs
        const [key, value] = cookie.trim().split('=');
        // Decode the value (in case it's URL encoded)
        cookies[key] = decodeURIComponent(value);
    });
    return cookies;
}