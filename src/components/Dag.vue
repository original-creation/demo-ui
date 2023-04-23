<script setup lang = "ts">
import { MockService } from '@/services/mockservice';
//import cytoscape from 'cytoscape';

    const mService = new MockService();

    const props = defineProps(['uuid']);

</script>
<template>

  <div>
    Work in progress ...
     use cytoscape ...
     <div>{{ props.uuid }}</div>
    </div>
</template>
<style scoped>
</style>