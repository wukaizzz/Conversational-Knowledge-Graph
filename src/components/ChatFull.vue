<template>
  <div class="flex flex-col h-full bg-token-main-surface-primary thread-xl:pt-(--header-height) [scrollbar-gutter:stable_both-edges]">
    <!-- toubu -->
    <HeaderBar></HeaderBar>
    <div class="relative">
      <div aria-hidden="true" data-edge="true" class="pointer-events-none h-px w-px absolute start-0 top-0">
      </div>
    </div>
    <div ref="containerRef" 
    class="overflow-y-auto custom-scrollbar flex-1 flex flex-col text-sm thread-xl:pt-(--header-height) pb-25 pt-[2rem] px-[2rem]">
      <!-- message -->
      <MessageItem
        v-for="msg in chatStore.currentMessages"
        :key="msg.id"
        :message="msg"
      >
      </MessageItem>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatFull">
  import { ref,watch,nextTick, onActivated } from 'vue';
  import MessageItem from './MessageItem.vue';
  import HeaderBar from './HeaderBar.vue';
  import { useRoute } from 'vue-router';
  import { useChatStore } from '@/stores/chatStore';
  import type { TransformedData } from '@/knowledge_graph/types/kgData';
  const route = useRoute();
  const chatStore = useChatStore();
  const containerRef = ref<HTMLElement | null>(null); 
  const initData = async () =>{
    const sessionId = route.params.sessionId;
    if(!sessionId){
      console.log("当前没有sessionId,跳过加载");
      return;
    }
    await chatStore.loadChatMessages(sessionId as string);
  }
  watch(
    () => route.params.sessionId,
    (newId)=>{
      if(!newId && typeof newId === 'string'){
        console.log('切换路由，加载新对话');
        initData();
      }else{
        console.log('路由参数不为字符串，chatFull');
      }
    }
  ,{ immediate:true}
  )
  watch(
    () => {
      return chatStore.currentMessages.length;
    },
    () => {
      nextTick(()=>{
        if(containerRef.value){
          containerRef.value.scrollTop = containerRef.value.scrollHeight;
        }
      })
    }
  )
  onActivated(()=>{
    const id = route.params.sessionId;
    if(chatStore.currentSessionId !== id){
      initData();
    }
  })
</script>

<style scoped lang="css">
  .thread-xl {
    display: block;
    height: 100%;
    overflow-y: auto;
  }
  .pb-25 {
    padding-bottom: calc(var(--spacing)*25);
  }
  .custom-scrollbar {
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  /* 纵向滚动条宽度 */
  height: 4px;
  /* 横向滚动条高度 */
}

/* 新增：隐藏所有滚动条按钮（包括上下/左右箭头） */
.custom-scrollbar::-webkit-scrollbar-button {
  display: none; /* 核心：去掉上/下箭头 */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  /* 轨道透明 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  /* 滑块颜色：半透明灰色 */
  border-radius: 20px;
  /* 圆角，像胶囊一样 */
  border: transparent;
  /* 留白 */
  /* 新增：限制滑块长度（核心） */
  min-height: 20px; /* 滑块最小高度（值越小，滑块越短，建议≥15px避免过短） */
  max-height: 30px; /* 滑块最大高度（严格限制最长长度） */
  min-width: 20px; /* 横向滚动条滑块最小宽度（按需调整） */
  max-width: 30px; /* 横向滚动条滑块最大宽度 */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
  /* 悬停时加深，提示可拖动 */
}

/* 可选：深色模式适配 */
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  /* 同步限制深色模式滑块长度 */
  min-height: 20px;
  max-height: 30px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>