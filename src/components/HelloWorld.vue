<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="container mx-auto bg-gray-400 rounded-xl shadow border p-7 m-8">
    <h1>{{ msg }}</h1>
  </div>
  <div class="card">
    <p>Don't miss our fantastic <a href="https://originalcreation.se" target="_blank">web site</a>!
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
