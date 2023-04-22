<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Original Creation Demo Site" />
  <div>
    <a href="https://originalcreation.se" target="_blank">
      <img src="/vite.svg" class="logo" alt="Original Creation AB logo" />
    </a>
    <a href="https://originalcreation.se" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Original Creation AB logo" />
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
