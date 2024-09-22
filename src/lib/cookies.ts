export const setCookie = (name: string, value: unknown, days: number, path: string): void => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const cookieValue = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${name}=${cookieValue}; expires=${expires}; path=${path}; Secure; SameSite=Strict`;
}

export const getCookie = (name: string): unknown | null => {
    if (typeof document === 'undefined') {
        return null;
    }
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];

    if (!cookieValue) return null;

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch (error) {
        console.error('Error parsing cookie:', error);
        return null;
    }
}

export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}