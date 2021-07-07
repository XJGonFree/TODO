<template>
    <n-space vertical>
      <n-list v-if="FinishList.length">
        <draggable
          :list="FinishList"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
          handle = ".icon_move"
          animation = "200"
        ><!--
          item所用的是上面捆绑的 list中的index 和 el
          task的属性是在taskitem中设置好的props
          需要传入的是数字和对象
          @是子组件中定义的函数，在子组件中设置emit可直接触发父组件的函数
        -->
          <template #item="{ index, element }">
            <finish-task-item
              :taskIndex="index"
              :task="element"
              :key="element.id"
              @back="() => gobackList(index,element)"
            />
          </template>
        </draggable>
      </n-list>
      <n-thing v-else> 请完成至少一项任务 </n-thing>
  </n-space>
</template>
<script setup>
import { computed , ref } from "vue";
import {useStore} from "vuex";
import {
  NList,
  NListItem,
  NButton,
  NSpace,
  NThing,
  NModal,
  NInput,
} from "naive-ui";
import FinishTaskItem from "../components/FinishTaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";

const store = useStore()
const FinishList = computed(()=>store.state.FinshTask_list)
const gobackList = (index,task) =>{
    store.commit("backToNormal",{
        index:index,
        task:task
    })
}
</script>
<style>
.n-thing {
  text-align: center;
}
</style>