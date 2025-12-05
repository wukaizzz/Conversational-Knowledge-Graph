<template>
  <div class="flex flex-col h-full overflow-y-auto  bg-token-main-surface-primary thread-xl:pt-(--header-height) [scrollbar-gutter:stable_both-edges]">
    <div class="relative">
      <div aria-hidden="true" data-edge="true" class="pointer-events-none h-px w-px absolute start-0 top-0">
      </div>
    </div>
    <div ref="containerRef" class="flex flex-col text-sm thread-xl:pt-(--header-height) pb-25">
      <!-- message -->
      <MessageItem
        v-for="msg in chatStore.currentMessages"
        :key="msg.id"
        :message="msg"
        @preview-click="onPreviewClick"        
      >
      </MessageItem>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatFull">
  import { ref,watch,nextTick, onActivated } from 'vue';
  import MessageItem from './MessageItem.vue';
  import { useRoute } from 'vue-router';
  import { useChatStore } from '@/stores/chatStore';
  import type { TransformedData } from '@/knowledge_graph/types/kgData';
  const route = useRoute();
  const chatStore = useChatStore();
  const emit = defineEmits<{
    (e:'graph-select',data:any):void;
  }>();
  const containerRef = ref<HTMLElement | null>(null); 
  const onPreviewClick = (data:TransformedData)=>{
    emit('graph-select',data);
  }
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
</style>