<template>
    <n-space vertical>
      <n-list v-if="list.length">
        <draggable
          :list="list"
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
            <task-item
              :taskIndex="index"
              :task="element"
              :key="element.id"
              @finish="()=>onFinish_Task(index,element)"
              @delete="() => onDel_Task(index)"
              @edit="() => onEdit_Task(index,element)"
            />
          </template>
        </draggable>
      </n-list>

      <n-thing v-else> 请添加待办任务 </n-thing>
      <div class="extra">
        <n-button circle color="#ff69b4" @click="showAddTask = true"> 添加 </n-button>
      </div>
  </n-space>

  <n-modal
    v-model:show="showAddTask"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>添加任务</div>
    </template>
    <div>
      <n-input
        v-model:value="content"
        type="input"
        placeholder="请填写任务信息...."
      />
    </div>

    <template #action>
      <n-button @click="onAdd_Task">添加</n-button>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showEditTask"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
        <div>编辑任务</div>
    </template>
    <div>
      <n-input 
        v-model:value="EditContent"
        type = "input"
      />
    </div>
    <template #action>
      <n-button @click="onUpdate_Task">提交</n-button>
    </template>
  </n-modal>
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
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
/** 
 * 初始化Task对象
 * 需要设置的有内容和id
*/
const initTask = {
  id:'',
  content:'',
};
const store = useStore();
const list = computed(() => store.state.Task_list);

let showAddTask = ref(false);
let content = ref(initTask.content);
let EditContent = ref("");
let showEditTask = ref(false);
let EditIndex = ref('')

const onAdd_Task = () =>{//需要提交添加业务修改状态
  store.commit("addTask",{//设置task对象
    ...initTask,//复用initTask中的属性
    id : new Date(),//设置id为当前时间戳
    content:content.value,
  });
  showAddTask.value = false;//关闭窗口清空内容
  content.value = "";
}

const onFinish_Task = (index,task) =>{//同上
  store.commit("finishTask",{
    index:index,
    task:task
  })
}

const onDel_Task = (index) =>{//同上
  store.commit("deleteTask",index)
}


//打开编辑窗口 设置编辑框中的值
const onEdit_Task = (index,task) =>{
  showEditTask.value = true;
  EditContent.value = task.content
  EditIndex.value = index
}
//提交编辑后的Task
const onUpdate_Task = () =>{
  let EditTast = {
    ...initTask,
    content:EditContent.value
  }
  store.commit("updateTask",{
    index:EditIndex.value,
    task:EditTast
  })
  EditContent.value = ""
  showEditTask.value = false;
}
</script>
<style>
.n-thing {
  text-align: center;
}

.extra {
  display: flex;
  justify-content: center;
}
</style>