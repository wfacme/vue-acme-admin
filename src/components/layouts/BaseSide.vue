<template>
    <div :class="['acme-side hidden-sm-and-down', !props.collapse ? 'open' : '']">
        <div class="side-menu">
            <div :class="['menu-item', onMenuItemPath == item.path ? 'on' : '']" v-for="(item, index) in routers"
                :key="index" @click="navToPath(item)">
                <el-icon :size="25" v-if="item?.meta?.icon">
                    <acme-icon :class="item?.meta?.icon" />
                </el-icon>
                <div class="title">{{ item.meta?.title }}</div>
            </div>
        </div>
        <div class="side-sub-menu" v-if="!props.collapse">
            <el-menu router :unique-opened="true" :default-active="defaultActive" class="menu-content">
                <sidebar-menu v-for="(item, index) in onSubMenuList" :item="item" :key="item.path" />
            </el-menu>
        </div>
    </div>
</template>

<script lang="ts" name="Baseside" setup>
import { computed, ref, watch } from 'vue';
import { toRaw } from '@vue/reactivity';
import { useSettingStore } from "~/store/modules/setting";
import { navigateTo } from "~/composables/routerUtils";
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from "~/store/modules/permission";


const props = defineProps({
    collapse: {
        type: Boolean,
        default: true
    }
})

const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();
const permissionStore = usePermissionStore();
const routers = toRaw(permissionStore.routers);

//判断菜单是否选中
const onMenuItemPath = ref<String>();
watch(route, () => {
    let breadcrumbs = route.matched.filter((item: RouteRecordRaw) => item.name !== 'root');
    onMenuItemPath.value = breadcrumbs[0]?.path || route.path;
}, { immediate: true, deep: true })
const navToPath = (item: RouteRecordRaw): void => {
    onMenuItemPath.value = item.path;
    // settingStore.collapse = false;
    navigateTo(item);
}
const onSubMenuList = computed((): RouteRecordRaw[] => {
    let onParentMenu = routers.find(item => item.path == onMenuItemPath.value);
    return onParentMenu?.children || ([] as Array<RouteRecordRaw>);
});

//默认激活菜单
const defaultActive = computed(() => {
    const { meta, path } = route;
    // if()
    return path;
});

</script>

<style lang="scss">
$side-item-size: 60px;

.acme-side {
    height: 100%;
    display: flex;
    box-shadow: 10px 0 10px -10px rgba(0, 0, 0, .1);

    .side-menu {
        height: 100%;
        padding: 0 10px;
        width: var(--acme-layout-side-main-width);
        background-color: var(--acme-side-main-menu-bg);

        .menu-item {
            color: #f5f5f5;
            cursor: pointer;
            display: flex;
            margin-bottom: 10px;
            text-align: center;
            border-radius: var(--acme-border-radius);
            height: $side-item-size;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 12px;
            position: relative;
            transition: .3s ease-in-out;
            background-color: var(--acme-side-menu-item-bg);

            &:hover {
                color: #f5f5f5;
                color: var(--el-color-primary);
            }

            &.on {
                color: #f5f5f5;
                background-color: var(--el-color-primary);
            }

            .title {
                margin-top: 2px;
            }
        }
    }

    .side-sub-menu {
        width: 0;
        flex-grow: 1;
        overflow-y: auto;
        padding: 0 5px;
        background-color: var(--acme-side-menu-bg);

        .menu-content {
            border: none !important;
            border-radius: var(--acme-border-radius);
        }
    }

    &.open {

        .menu-item.on {
            &:after {
                content: "";
                right: -10px;
                top: 50%;
                width: 10px;
                margin-top: -7px;
                position: absolute;
                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-right: 7px solid var(--acme-side-menu-bg);
                // background-color: var(--el-color-primary);
            }
        }
    }
}
</style>