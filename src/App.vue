<template>
  <div id="contain">
    <n-layout>
            <n-layout-header>
                <h1>TO-DO</h1>
                <n-button-group >
                  <n-button round color="#8a2be2" @click="goMain"> 主页 </n-button>
                  <n-button round color="#8a2be2" @click="goFinish"> 归档页 </n-button>
                </n-button-group>
            </n-layout-header>
            <n-layout-content>
               <router-view/>
            </n-layout-content>
      </n-layout>
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NGrid,
    NH1,
    NButton,
    NButtonGroup
  } from "naive-ui";
  import { useRouter } from "vue-router";
  
  const router = useRouter()
  const goMain = () => {
    router.push({path : "/" })
  }
  const goFinish = () => {
    router.push({path : "/Finish" })
  }
</script>

<style>
#contain {
  background: #f5f5f5;
}
.n-layout-header {
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}

.n-layout-content {
  margin: auto;
  padding: 16px;
  max-width: 360px;
}

.n-button {
  margin-bottom: 10px;
  min-width: 90px;
}

</style>