<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>Don't miss our fantastic <a href="https://originalcreation.se" target="_blank">web site</a>!
    </p>
  </div>

  </template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
