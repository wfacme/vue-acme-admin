import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '~/composables/auth';
export const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            permissions: [] as string[],
        }),
        getters: {
            isLogin: (state) => {
                return getToken();
            },
        },
        actions: {
            login(data: {
                username: string
                password: string
            }) {
                return new Promise<void>((resolve, reject) => {
                    if (data.username != 'admin') reject('用户名有误');
                    if (data.password != '123456') reject('密码错误');
                    setToken('AHjsywn2846sdjdywjghsdjsyu');
                    resolve()
                })
            },
            logout() {
                return new Promise<void>((resolve) => {
                    removeToken();
                    resolve()
                })
            },
        },
    },
)
