<script setup lang="ts">
import DemoApp from './components/DemoApp.vue';
import Navbar from './components/Navbar.vue'
import { ref } from 'vue';

const demoOn = ref(false);

</script>

<template>
  <div v-show="!demoOn">
    <header id="nav-wrapper">
      <Navbar />
    </header>
    <div><button @click="demoOn = true" v-show="!demoOn">Demo</button></div>
    <main id="main">
      <router-view />
    </main>
  </div>
  <div v-show="demoOn">
    <DemoApp/>
  </div>
</template>
