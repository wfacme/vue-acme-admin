<template>
    <component :is="iconCLass[1]" v-if="iconCLass[0] == 'el'" />
    <i :class="iconCLass" v-else></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
    class: {
        type: [String,Array],
        default: 'el'
    },
});
const iconCLass = computed(() => {
    if(Array.isArray(props.class)){
        return props.class;
    }
    return props.class.split(' ');
});
</script>