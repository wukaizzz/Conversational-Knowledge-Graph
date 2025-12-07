<template>
  <div>
    <header id="page-header" class="sticky top-0 px-2 flex items-center justify-between z-20 h-header-height pointer-events-auto max-md:hidden bg-token-main-surface-primary start-0 end-0 thread-xl:absolute thread-xl:start-0 thread-xl:end-0 thread-xl:shadow-none!">
      <div class="flex items-center">
        <button type="button" class="group flex cursor-pointer justify-center items-center gap-1 rounded-lg min-h-9 px-2.5 text-lg hover:bg-token-surface-hover text-token-text-primary focus-visible:bg-token-surface-hover font-normal whitespace-nowrap focus-visible:outline-none">
          <div class="rounded-lg">Chat KG</div>
          <DropDown></DropDown>
        </button>
      </div>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <button v-if="route.name !== 'ChatWelcome'" class="relative text-token-text-primary mx-2 btn btn-ghost">
              <div  @click="gotoKG" class="flex w-full items-start justify-center gap-1.5">
                <!-- svg -->
                前往图谱
              </div>
            </button>
            <div v-if="route.name === 'ChatWelcome'" class="flex items-center">
              <div class="realtive" type="button">
                <button class="keyboard-focus:bg-token-surface-hover flex h-9 w-9 items-center justify-center rounded-lg focus:outline-none keyboard-focused:bg-token-surface-hover hover:bg-token-surface-hover no-draggable">
                  <a href="https://github.com/wukaizzz/Conversational-Knowledge-Graph" target="_blank"><Github></Github></a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts" name="HeaderBar">
  import { useChatStore } from '@/stores/chatStore';
import DropDown from './icons/DropDown.vue';
  import Github from './icons/Github.vue';
  import { useKgStore } from '@/stores/kgStore';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const kgStore = useKgStore();
  const chatStore = useChatStore();
  function gotoKG(){
    const graphData = chatStore.latestGraphData;
    if(graphData){
      kgStore.showKG(graphData);
    }else{
      alert('当前对话暂未生成知识图谱');
      // ElMessage.warning('当前对话暂未生成知识图谱');
    }
  };
</script>

<style scoped lang="css">
  
</style>