<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>

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
