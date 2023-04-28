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
  console.log("value to search for is : "+value);
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
  <div class="container mx-auto w-2/3 bg-gray-400 rounded-xl shadow border p-1 m-8">
    <div v-show="searchType!='undefined'" @click="searchType='undefined'; dagOn=false" class="hover:bg-gray-500 cursor-pointer">
      <button class="bg-transparent"><div class="flex"><img src="../assets/icons8-back-16.png" />Back</div></button>
      </div>
    <div v-show="searchType==='undefined'">
      <MainChoice @searchme="search" @browseme="browse"></MainChoice>
    </div>
    <div v-show="searchType!='undefined'">
      <div v-show="!dagOn">
        <div v-for="i in mService.getProductDeliveries(searchActor, searchValue)">
          <div class="border-slate-100 border p-2 hover:bg-white cursor-pointer" @click="displayDAG(i.uuid)">{{ i.date }}</div>
        </div>
      </div>
    </div>
    <div v-show="dagOn">
      <RenderTree :uuid=dagUuid></RenderTree>
    </div>
  </div>
</template>