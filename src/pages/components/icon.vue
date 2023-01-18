<template>
     <el-card class="box-card" shadow="never" style="border:none;margin-bottom: 10px;">
        <template #header>
            <div class="card-header">
                <strong>自定义图标</strong>
                <span style="margin-left: 10px;font-size:12px;color:#999;">(使用: {{acmeTipsHtml}},自定义前缀+图标名)</span>
            </div>
        </template>
        <div class="acme-icon">
            <div class="icon-item" v-for="(item, index) in acmeIcons" :key="index">
                <div class="item">
                    <el-icon size="20">
                        <acme-icon :class="'acme ' + item" />
                    </el-icon>
                    <div class="title">{{item}}</div>
                </div>
            </div>
        </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="border:none;">
        <template #header>
            <div class="card-header">
                <strong>element plus 图标</strong>
                <span style="margin-left: 10px;font-size:12px;color:#999;">(使用: {{elementPlusTipsHtml}})</span>
            </div>
        </template>
        <div class="acme-icon">
            <div class="icon-item" v-for="(item, index) in elementPlusIcons" :key="index">
                <div class="item">
                    <el-icon size="20">
                        <acme-icon :class="'el ' + item" />
                    </el-icon>
                    <div class="title">{{item}}</div>
                </div>
            </div>
        </div>
    </el-card>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const elementPlusTipsHtml:string = '<acme-icon class="el setting" />'; 

const acmeTipsHtml:string = '<acme-icon class="acme a-enter" />'; 

const elementPlusIcons = reactive<String[]>([])
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    elementPlusIcons.push(key);
}
const acmeIcons =  reactive<String[]>([
    "a-enter"
])
</script>
  

<style lang="scss">
.acme-icon {
    .icon-item {
        display: inline-block;
        text-align: center;
        width:102px;
        height: 100px;
        background-color: var(--el-color-primary-light-9);
        margin:1px;border-radius:2px;
        cursor: pointer;
        .item{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .title{
            margin-top: 10px;
            color:#999;
            font-size: 12px;
        }
        &:hover{
            color:#fff !important;
            background-color: var(--el-color-primary-light-5);
            .title{
                color:#fff;
            }
        }
    }
}
</style>