<template>
  <n-list-item class="task-item-wrapper">
    <template #prefix>
      <n-icon size="16" class="icon_move">
        <drag-indicator-outlined />
      </n-icon>
    </template>
    <swiper
      :initial-slide="1"
      :slides-per-view="1"
      :resistance-ratio="0"
      :speed="200"
      @activeIndexChange="onActiveIndexChange"
    >
      <swiper-slide class="back-start-slide">撤回</swiper-slide>
      <swiper-slide>{{ task.content }}</swiper-slide>
      <swiper-slide class="back-end-slide">撤回</swiper-slide>
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit, ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";
//定义父组件需要传入子组件的参数 props
const props = defineProps({
  taskIndex: Number,
  task: Object,
});
//子组件中出发父组件的函数
const emit = defineEmit(["back"]);

const onActiveIndexChange = (instance) => {
  const { activeIndex } = instance;
  if (activeIndex === 0 || activeIndex === 2) {
    emit("back");//触发父组件中的finish捆绑的 函数
    setTimeout(() => {
      instance.destroy();
    }, 1);
  }
};
</script>
<style>
  .back-start-slide {
    padding-right: 20px;
    color: white;
    background: #0099ff;
    justify-content: flex-end;
    box-sizing:border-box;
  }
  .back-end-slide {
    padding-left: 20px;
    color: white;
    background: #0099ff;
    justify-content: flex-start;
    box-sizing:border-box;
  }
.task-item-wrapper:not(:last-child) {
  border-bottom: none;
}
</style>