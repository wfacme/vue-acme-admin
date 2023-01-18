<template>
  <div>
  </div>
</template>
<script lang="ts" setup>
import router from '~/router';
import { onMounted } from 'vue';
onMounted(() => router.go(-1));
</script>