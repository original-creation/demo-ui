<script lang="ts">
export default {
  name: 'navbar',
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
    }
  }
}

</script>
<template>
  <nav class="flex items-center justify-between flex-wrap 1bg-teal-500 p-6 bg-gray-500">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
      </svg>
      <span class="font-semibold text-xl tracking-tight">Original Creation</span>
    </div>
    <div class="block lg:hidden">
      <button @click="toggle"
        class="flex items-center px-3 py-2 border rounded text-gray-000 text-gray-000 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div :class="open ? 'block' : 'hidden'" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-xl lg:flex-grow text-black">
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-000 hover:text-white mr-8">
          <router-link to="/">Home</router-link>
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-000 hover:text-white mr-4">
          <router-link to="/demo">Start demo</router-link>
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-000 hover:text-white mr-4 ml-4">
          <router-link to="/contact">Contact Us</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>