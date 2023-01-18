<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'

defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref('')

const toast = () => {
  ElMessage.success('Hello')
}
</script>

<template>
  <div class="hello">
    <img src="../assets/logo.png"  style="margin-top:60px;" alt="">
    <h1>{{ msg }}</h1>
    <p>
      See
      <a href="https://element-plus.org" target="_blank">element-plus</a> for
      more information.
    </p>
    <!-- example components -->
    <el-button @click="toast">El Message</el-button>
    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-button type="success" @click="count++">count is: {{ count }}</el-button>
    <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
    <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
    <el-button type="info" @click="count++">count is: {{ count }}</el-button>
    <br />
    <br />
    <el-date-picker v-model="curDate" type="date" placeholder="Pick a day"></el-date-picker>
  </div>
</template>

<style>
.ep-button {
  margin: 4px;
}
.hello{
text-align: center;
}
</style>
