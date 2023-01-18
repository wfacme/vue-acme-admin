
import { useCookies } from '@vueuse/integrations/useCookies';

const Cookies = useCookies();

const TokenKey = 'Admin-Token'

export function removeToken(): void {
    return Cookies.remove(TokenKey)
}

export function getToken(): String | undefined {
    return Cookies.get(TokenKey);
}

export function setToken(token: string, expires: Date = (new Date((new Date().getTime()) + 3 * 24 * 60 * 1000))): void {
    return Cookies.set(TokenKey, token, {
        expires,
    })
}