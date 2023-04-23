<script setup lang="ts">
import { ref, Ref } from 'vue'
import { MockService } from '../services/mockservice';
import { Branch } from '@/types/branch';
import { BranchRole } from '@/types/branch_role';
import { Actor } from '@/types/actor';
    
    const emits = defineEmits(["searchme", "browseme"])
    const searchOn = ref(false);
    const browseOn = ref(false);
    const productsOn = ref(false);
    const certificationOn = ref(false);
    const searchValue = "ff8cf69c-968c-47bc-b834-f1cbb9f08932"


    const mService = new MockService();
    let selectedBranch :  Ref<Branch |null> = ref(null);
    let selectedBranchRole : Ref<BranchRole |null> = ref(null);
    let selectedBranchActor :  Ref<Actor |null>  = ref(null);

</script>
<template> 
    <div class="display"  v-if="!searchOn">
        <div class="rowDisplay" @click="browseOn=true">Browse</div>
        <div @click="searchOn=true">Search</div>
    </div>
    
    <div class="display" >
        <div v-show="searchOn" class="rowDisplay" @click="searchOn=false"><img src="../assets/icons8-back-16.png"/></div>    
        <div v-show="searchOn" class="rowDisplay" id="searchBar" ><input :value=searchValue /></div>
        <div v-show="searchOn" @click="searchOn=true, emits.call('yes', 'searchme', searchValue)" >Search</div>
        
    </div>

    <div id="browse" v-show="browseOn && !searchOn">

        <select id="branch"  v-model="selectedBranch" @change="selectedBranchActor = null">
      <option disabled value="">Please select one</option>
      <option v-for="option in mService.getBranchNames()" :value="option">{{ option.name }}</option>
    </select>
    
    <div v-if="selectedBranch!=undefined" class="content">
        <select id="role" v-model="selectedBranchRole"  @change="selectedBranchActor = null">
        <option disabled value="">Please select one</option>
        <option v-for="option in selectedBranch.roles" :value="option">{{ option.name }}</option>
      </select>
        <div v-if="selectedBranchRole!=undefined">
          <select id="actor"  v-model="selectedBranchActor" >
            <option disabled value="">Please select one</option>
            <option v-for="option in selectedBranchRole.actors" :value="option" >{{ option.name }}</option>
          </select>
        </div>

        <div v-if="selectedBranchActor!=undefined">
          <div class="row display">
            <div class="left"  @click="productsOn=!productsOn, certificationOn=false">List products</div> 
            <div class="right" @click="certificationOn=!certificationOn, productsOn=false" >List certifications</div> 
          </div>
          <br>
          <div class="product-list" v-show="productsOn">
            <div v-for="p in mService.getProductItems(selectedBranchActor)">
                <div class="product-item" @click="emits.call(undefined, 'browseme', selectedBranchActor.uuid, p.id)">{{ p.name }}</div>
            </div>
        </div>

        <div class="product-list" v-show="certificationOn">
            <div v-for="c in mService.getCertifications(selectedBranchActor)">
                <div class="product-item" >{{ c.name }}</div> <!-- @click="emits.call(undefined, 'browseme', selectedBranchActor.uuid, c.id)"-->
            </div>
        </div>
      </div>
    </div>

    </div>
</template>
<style scoped>
.display {
    display: inline-flex;
    cursor: pointer;
}
.rowDisplay {
    padding-right: 20px;
}

.row{
  align-items: center;
}
.left{
  padding: 5px;
}
.right{
  padding: 5px;
}
.product-item{
  background-color: azure;
  border: 1px solid gray;
  margin: 3px;
  border-radius: 25%;
  min-width: 70px;
  
}
.product-list{
  display: inline-flex;
  padding: 5px;
}
</style>