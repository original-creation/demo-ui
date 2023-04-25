<script setup lang="ts">

import { ref } from 'vue';
import MainChoice from '../components/MainChoice.vue';
import { MockService } from '@/services/mockservice';
import RenderTree from '../components/RenderTree.vue';

const mService = new MockService();
const searchActor = ref<string>("");
const searchType = ref<string>("undefined");
const searchValue = ref<string>("");

const dagOn = ref(false);
const dagUuid = ref<string>("");

function search(value: string) {
  searchValue.value = value;
  searchType.value="uuid";
  dagOn.value = true;
  dagUuid.value = value;
}

function browse(actor: string, value: string) {
  searchValue.value = value;
  searchActor.value = actor;
  searchType.value="product";
  dagOn.value =false;
}

function displayDAG(value: string){
  dagOn.value = true;
  dagUuid.value = value;
}
</script>
<template>
  <div class="demoContainer">
    <div v-show="searchType!='undefined'" @click="searchType='undefined'; dagOn=false"> <img src="../assets/icons8-back-16.png"/></div>
    <div v-show="searchType==='undefined'">
      <MainChoice @searchme="search" @browseme="browse"></MainChoice>
    </div>
    <div v-show="searchType!='undefined'">
      <div v-show="!dagOn">
        <div v-for="i in mService.getProductDeliveries(searchActor, searchValue)">
          <div class="item" @click="displayDAG(i.uuid)">{{ i.date }}</div>
        </div>
      </div>
    </div>

    <div v-show="dagOn">
      <RenderTree :uuid=dagUuid></RenderTree>
    </div>
  </div>
</template>
<style scoped>
.demoContainer{
  padding: 20px;
}
.item{
  background-color: lightgray;
  border: 2pt solid #2DD48F;
  margin: 3px;
}
.item:hover{
  background-color: #2DD48F;
  border: 2pt solid #2DD48F;
  margin: 3px;
  color:white;
}
</style>