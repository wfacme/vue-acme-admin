import { defineStore } from 'pinia';
import Settings, { Setting } from "~/config";
export const useSettingStore = defineStore(
    // 唯一ID
    'setting',
    {
        state: () => (<Setting>Settings),
        getters: {
        },
        actions: {
        },
    },
)
