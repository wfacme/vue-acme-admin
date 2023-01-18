<template>
    <el-tabs v-model="onTabIndex" type="card" :closable="true" class="acme-tabs">
        <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.title" :name="item.id"></el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const onTabIndex = ref(1);
const tabList = reactive([
    { id: 1, title: '控制台' },
    { id: 2, title: '组件' },
]);
//生成tab列表
for (var i = 4; i < 10; i++) {
    tabList.push({
        id: i,
        title: '组件' + i
    });
}
</script>

<style lang="scss">
.acme-tabs {
    width: 100%;
    background-color: var(--acme-btn-bg);
    border-radius: var(--acme-border-radius);
    padding: 5px;

    .el-tabs__header {
        margin: 0 !important;
    }

    .el-tabs__header,
    .el-tabs__item,
    .el-tabs__nav {
        border: none !important;
    }

    .el-tabs__item {

        &:hover,
        &.is-active {
            border-radius: 25px;
            // border-radius: var(--acme-border-radius);
        }

        &:hover {
            color: #333;
            background-color: #fff;
        }

        &.is-active {
            color: #fff !important;
            background-color: var(--el-color-primary);
        }
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        line-height: var(--el-tabs-header-height);
    }
}
</style>