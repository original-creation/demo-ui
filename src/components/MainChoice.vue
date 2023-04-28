<script setup lang="ts">
import { ref, Ref } from 'vue'
import { MockService } from '../services/mockservice';
import { Branch } from '@/types/branch';
import { BranchRole } from '@/types/branch_role';
import { Actor } from '@/types/actor';

const mService = new MockService();

const emits = defineEmits(["searchme", "browseme"])

const searchOn = ref(false);
const browseOn = ref(false);
const productsOn = ref(false);
const certificationOn = ref(false);
const searchValue = ref("ff8cf69c-968c-47bc-b834-f1cbb9f08932");

let selectedBranch: Ref<Branch | null> = ref(null);
let selectedBranchRole: Ref<BranchRole | null> = ref(null);
let selectedBranchActor: Ref<Actor | null> = ref(null);

</script>
<template>
  <div class="container row-auto flex-row m-2 flex" v-if="!searchOn">
    <div class="text-center hover:hover:bg-gray-500 cursor-pointer w-1/2" @click="browseOn = true">Browse</div>
    <div class="text-center hover:hover:bg-gray-500 cursor-pointer w-1/2" @click="searchOn = true">Search</div>
    <div class="text-center hover:hover:bg-gray-500 cursor-pointer w-1/2">Register data</div>
  </div>
  
  <div v-show="searchOn" class="text-center hover:bg-gray-500 p-1 cursor-pointer w-1/3" @click="searchOn = false"><div class="flex"><img src="../assets/icons8-back-16.png" />Back</div></div>
  <div class="container flex-row m-2 flex p-0 w-auto">
    <div v-show="searchOn" class="text-center p-1 cursor-pointer w-3/4" id="searchBar"><input v-model=searchValue class="w-full" /></div>
    <div v-show="searchOn" class="text-center hover:bg-gray-500 p-1 cursor-pointer w-1/4" @click="searchOn = true, emits.call('yes', 'searchme', searchValue)">Search</div>
  </div>

  <div id="browse" v-show="browseOn && !searchOn" class="content">
    <select id="branch" v-model="selectedBranch" @change="selectedBranchActor = null">
      <option disabled value="">Please select one</option>
      <option v-for="option in mService.getBranchNames()" :value="option">{{ option.name }}</option>
    </select>

    <div v-if="selectedBranch != undefined">
      <select id="role" v-model="selectedBranchRole" @change="selectedBranchActor = null">
        <option disabled value="">Please select one</option>
        <option v-for="option in selectedBranch.roles" :value="option">{{ option.name }}</option>
      </select>
      <div v-if="selectedBranchRole != undefined">
        <select id="actor" v-model="selectedBranchActor">
          <option disabled value="">Please select one</option>
          <option v-for="option in selectedBranchRole.actors" :value="option">{{ option.name }}</option>
        </select>
      </div>

      <div v-if="selectedBranchActor != undefined">
        <div class="container flex-row flex p-1 w-auto">
          <div class="text-center hover:bg-white p-1 cursor-pointer w-1/2" @click="productsOn = !productsOn, certificationOn = false">List products</div>
          <div class="text-center hover:bg-white p-1 cursor-pointer w-1/2" @click="certificationOn = !certificationOn, productsOn = false">List certifications</div>
        </div>
        <div class="container flex-row m-2 flex p-1 min-w-fit" v-show="productsOn">
          <div v-for="p in mService.getProductItems(selectedBranchActor)">
            <div class="w-auto text-center hover:bg-white p-1 cursor-pointer border-red-50 border pl-5 pr-5 m-2"  @click="emits.call(undefined, 'browseme', selectedBranchActor.uuid, p.id)">{{
              p.name }}</div>
          </div>
        </div>
        <div class="container flex-row m-2 flex p-1 min-w-fit" v-show="certificationOn">
          <div v-for="c in mService.getCertifications(selectedBranchActor)">
            <div class="w-auto text-center hover:bg-white p-1 cursor-pointer border-red-50 border pl-5 pr-5 m-2">{{ c.name }}</div>
            <!-- @click="emits.call(undefined, 'browseme', selectedBranchActor.uuid, c.id)"-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>