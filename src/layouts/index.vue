<template>
    <div :class="['acme-layout', settingStore.collapse ? 'collapse' : '']">
        <header class="layout-header">
            <BaseHeader />
        </header>
        <div class="layout-container">
            <div class="layout-side">
                <BaseSide :collapse="settingStore.collapse" />
            </div>
            <div class="layout-content">
                <router-view v-slot="{ Component, route }" :key="key">
                    <transition appear name="fade-transform">
                        <!-- <keep-alive> -->
                        <div v-if="route.path">
                            <component :is="Component" :key="route.path" />
                        </div>
                        <!-- </keep-alive> -->
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingStore } from "~/store/modules/setting";
const route = useRoute();
const settingStore = useSettingStore();
const key = computed(() => route.path);
</script>


<style lang="scss">
.acme-layout {
    position: relative;
    width: 100%;
    height: 100vh;

    .layout-header {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: var(--acme-layout-header-height);
        z-index: 100;
    }

    .layout-container {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: var(--acme-layout-header-height);
        z-index: 10;
    }

    .layout-side {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: var(--acme-layout-side-width);
    }

    .layout-content {
        background-color: var(--acme-content-bg);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        left: var(--acme-layout-side-width);
        overflow-y: auto;
        padding: 10px;
    }
}
</style>