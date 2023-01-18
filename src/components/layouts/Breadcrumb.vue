<script lang="ts" setup>
import { computed } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute, RouteRecordRaw } from 'vue-router';
const route = useRoute();
const breadcrumbs = computed(() => {
  return route.matched.filter((item: RouteRecordRaw) => item.name !== 'root');
});


</script>

<template>
  <el-breadcrumb class="app-breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <el-icon v-if="item.meta?.icon">
          <acme-icon :class="item.meta?.icon" />
        </el-icon>
        {{ item.meta?.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss">
</style>