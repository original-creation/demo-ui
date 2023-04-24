<script setup lang="ts">
import Navbar from './components/Navbar.vue'

</script>

<template>
    <header id="nav-wrapper">
      <Navbar />
    </header>
    <main id="main">
      <router-view />
    </main>
</template>
