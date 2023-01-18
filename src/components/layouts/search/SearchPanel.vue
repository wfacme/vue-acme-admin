<template>
    <el-input size="large" v-model="keyword" placeholder="请输入要检索的菜单名称" suffix-icon="Search" clearable />
    <div class="shortcut-key hidden-sm-and-down">
        <div class="key-item"><span class="key">S</span> 唤醒搜索</div>
        <div class="key-item"> <span class="key">
                <el-icon>
                    <acme-icon class="el top" />
                </el-icon>
                <el-icon>
                    <acme-icon class="el bottom" />
                </el-icon>
            </span> 选择结果 </div>
        <div class="key-item"> <span class="key">
                <el-icon>
                    <acme-icon class="acme a-enter" />
                </el-icon>
            </span> 访问页面 </div>
        <div class="key-item"> <span class="key">ESC</span> 退出 </div>
    </div>
    <div class="search-result">
        <div ref="searchResultRef" class="result" v-if="results.length">
            <div v-for="(result, index) in results" :key="index"
                :class="['result-item', onItemIndex == index ? 'on' : '']" @click="navToPath(result.item)"
                @mouseover="onItemIndex = index">
                <div class="item">
                    <div class="item-icon">
                        <el-icon>
                            <acme-icon :class="result.item.icon"></acme-icon>
                        </el-icon>
                    </div>
                    <div class="item-content">
                        <div class="title">{{ result.item?.title }}</div>
                        <div class="breadcrumb">{{ result.item?.breadcrumb }}</div>
                        <div class="path">{{ result.item?.path }}</div>
                    </div>
                </div>
                <div class="enter">
                    <el-icon>
                        <acme-icon class="acme a-enter" />
                    </el-icon>
                </div>
            </div>
        </div>
        <div v-else>
            <el-empty description="检索数据为空" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import hotkeys from 'hotkeys-js';
import { toRaw } from '@vue/reactivity';
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from '~/store/modules/permission';
import { useFuse } from '@vueuse/integrations/useFuse'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import { navigateTo } from "~/composables/routerUtils";

const keyword = ref("");
//默认选中
const onItemIndex = ref<number>(0);
const emit = defineEmits(['close'])
//格式化所有菜单信息
type MenuItem = {
    title: String | unknown,
    breadcrumb: String,
    // path?: String | unknown,
    icon?: String | unknown,

} & RouteRecordRaw
const permissionStore = usePermissionStore();
const menuList = reactive<MenuItem[]>([]);
function formatMenus(menus: RouteRecordRaw[], titlePrefix: String | unknown[] = []) {
    menus.map((item: RouteRecordRaw) => {
        if (item.children && item.children.length) {
            formatMenus(item.children, [...titlePrefix, item.meta?.title]);
        } else if (item.path) {
            menuList.push({
                ...item,
                title: item.meta?.title,
                icon: item.meta?.icon || 'el document',
                breadcrumb: [...titlePrefix, item.meta?.title].join(' > '),
            });
        }
    });
}
const options = computed<UseFuseOptions<MenuItem>>(() => ({
    fuseOptions: {
        keys: ['title', 'path', 'breadcrumb'],
        shouldSort: true,
    },
    matchAllWhenSearchEmpty: true,

}))
const { results } = useFuse(keyword, menuList, options)


const navToPath = (item: RouteRecordRaw) => {
    navigateTo(item);
    //关闭当前弹窗
    emit('close');
}

const onKeyUp = () => {
    if (results.value.length) {
        onItemIndex.value -= 1
        if (onItemIndex.value < 0) {
            onItemIndex.value = results.value.length - 1
        }
    }
}

const onKeyDown = () => {
    if (results.value.length) {
        onItemIndex.value += 1
        if (onItemIndex.value > results.value.length - 1) {
            onItemIndex.value = 0
        }
    }
}

const onKeyEnter = () => {
    if (onItemIndex.value !== -1 && results.value[onItemIndex.value]) {
        const { item } = results.value[onItemIndex.value];
        navToPath(item);
    }
}

onMounted(() => {
    formatMenus(toRaw<Array<RouteRecordRaw>>(permissionStore.routers));
    hotkeys('up', onKeyUp);
    hotkeys('down', onKeyDown);
    hotkeys('enter', onKeyEnter);
});
onUnmounted(() => {
    hotkeys.unbind('up', onKeyUp);
    hotkeys.unbind('down', onKeyDown);
    hotkeys.unbind('enter', onKeyEnter);
});
</script>

<style lang="scss">
.shortcut-key {
    margin-top: 10px;

    .key-item {
        color: #909399;
        background-color: #f4f4f5;
        border: 1px solid #e9e9eb;
        border-radius: 7px;
        padding: 0 10px;
        white-space: nowrap;
        margin: 5px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 35px;

        .key {
            color: #333;
            margin-right: 5px;
        }
    }
}

.search-result {
    padding: 10px;
    max-height: 70vh;
    overflow-y: auto;
    margin-top: 20px;
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: var(--acme-border-radius);

    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;

        .item {
            width: 0;
            flex-grow: 1;
        }

        .enter {
            color: #fff;
            width: 50px;
            font-size: 30px;
            visibility: hidden;
            transition: all .2s;
            transform: translateX(20px);
        }

        &.on {
            border-radius: var(--acme-border-radius);
            background-color: var(--el-color-primary-light-7);

            .item-icon {
                font-size: 30px;
                color: var(--el-color-primary);
            }

            .enter {
                visibility: visible;
                transform: translateX(0);
            }
        }
    }

    .item {
        display: flex;
        align-items: center;
        line-height: 1.5;

        .item-icon {
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 24px;
            transition: all .2s;
            text-align: center;
            border-right: 1px solid #ebebeb;
        }

        .item-content {
            padding-left: 15px;

            .title {
                font-size: 18px;
                font-weight: 700;
            }

            .breadcrumb {
                font-size: 12px;
                color: 666px;
            }

            .path {
                color: #999;
                font-size: 12px;
            }
        }

    }
}
</style>