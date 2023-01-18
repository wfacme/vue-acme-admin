<template>
    <el-sub-menu v-if="item.children?.length" :index="item.path" style="margin-bottom:5px;">
        <template #title>
            <el-icon v-if="item?.meta?.icon">
                <acme-icon :class="item?.meta?.icon" />
            </el-icon>
            <span>{{ item?.meta?.title }}</span>
        </template>
        <sidebar-menu v-for="(val, key) in item.children" :item="val" :key="key" />
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else>
        <el-icon v-if="item?.meta?.icon">
            <acme-icon :class="item?.meta?.icon" />
        </el-icon>
        {{ item.meta?.title }}
    </el-menu-item>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';
defineProps<{ item: RouteRecordRaw }>();
</script>

<style lang="scss">
.el-sub-menu,
.el-menu-item {
    overflow: hidden;
    border-radius: var(--acme-border-radius);
}

.el-sub-menu {

    &.is-opened,
    &.is-active {
        background-color: var(--acme-btn-bg);

        .el-menu {
            background-color: transparent !important;
        }
    }
}

.el-menu {
    padding: 5px;
}

.el-menu-item {
    min-width: auto !important;

    &.is-active {
        color: #fff;
        background-color: var(--el-color-primary-light-3);
        // background-color: var(--el-color-primary);
    }
}
</style>