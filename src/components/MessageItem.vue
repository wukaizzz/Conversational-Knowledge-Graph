<template>
  <div>
    <div :class="['flex w-full mb-[20px]',isUser ? 'justify-end': 'justify-start']">
      <div v-if="!isUser" :class="['w-8 h-8 rounded-full bg-blue-500 mr-3 flex-shrink-0']">您的图谱展示如下</div>
      <div :class="['max-w-[80%] rounded-xl p-4 shadow-sm', isUser ? 'bg-blue-600 text-white' :'bg-white border border-gray-200 text-gray-800']">
        <div v-if="message.content" class="text-sm leading-relaxed whitespace-pre-wrap">
          {{ message.content }}
        </div>
        <div v-if="message.type === 'graph' && message.graphData && !message.isResumeCard" class="mt-3">
          <div 
            class="relative w-[320px] h-[240px] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-all cursor-pointer group"
          >            
            <img 
            :src="message.snapshotUrl" 
            alt="Knowledge Graph snapshot"
            class="rounded-lg border shadow-sm w-full h-48 object-cover object-center"
            >
            <!-- <GenerateGraph
              :nodes="message.graphData.nodes"
              :edges="message.graphData.edges"
              :is-interactive="false"
              class="w-full h-full pointer-events-none"
            >
            </GenerateGraph> -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <span class="opacity-0 group-hover:opacity-100 bg-white/90 text-xs px-2 py-1 rounded text-gray-600 font-medium transition-opacity">
              点击查看全屏图谱
            </span>
          </div>
          </div>
        </div>
        <div v-if="message.type === 'graph' && message.isResumeCard">
          <img 
            :src="message.snapshotUrl" 
            class="w-[320px] h-[240px] object-cover rounded-lg border border-gray-200"
            alt="Graph snapshot"
            @click="handleGraphClick"
          />
        </div>
        <div v-if="message.type === 'loading'" class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="MessageItem">
  import GenerateGraph from '@/knowledge_graph/GenerateGraph.vue';
  import type { TransformedData } from '@/knowledge_graph/types/kgData';
import { useKgStore } from '@/stores/kgStore';
  import type { ChatMessage } from '@/types/chat';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  const props = defineProps<{
    message:ChatMessage
  }>();
  const isUser = computed(()=>{
    return props.message.role === 'user'
  })
  const kgStore = useKgStore();
  const handleGraphClick = ()=>{
    const {type,graphData} = props.message;
    if(type === 'graph' && graphData){
      kgStore.showKG(graphData);
    }
  }
</script>

<style scoped lang="css">

</style>