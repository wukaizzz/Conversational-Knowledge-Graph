<template>
  <div class="flex flex-col h-full overflow-y-auto  bg-token-main-surface-primary thread-xl:pt-(--header-height) [scrollbar-gutter:stable_both-edges]">
    <div class="relative">
      <div aria-hidden="true" data-edge="true" class="pointer-events-none h-px w-px absolute start-0 top-0">
      </div>
    </div>
    <div ref="containerRef" class="flex flex-col text-sm thread-xl:pt-(--header-height) pb-25">
      <!-- message -->
      <MessageItem
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        @preview-click="onPreviewClick"        
      >
      </MessageItem>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatFull">
  import type { ChatMessage } from '@/types/chat';
  import { ref,watch,nextTick } from 'vue';
  import MessageItem from './MessageItem.vue';
  const props = defineProps<{
    messages:ChatMessage[]
  }>();
  const emit = defineEmits<{
    (e:'graph-select',data:any):void;
  }>();
  const containerRef = ref<HTMLElement | null>(null); 
  const onPreviewClick = (data:any)=>{
    emit('graph-select',data);
  }
  watch(
    () => {
      return props.messages.length;
    },
    () => {
      nextTick(()=>{
        if(containerRef.value){
          containerRef.value.scrollTop = containerRef.value.scrollHeight;
        }
      })
    }
  )
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