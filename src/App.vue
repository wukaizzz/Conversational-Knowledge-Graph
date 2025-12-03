<script setup lang="ts">
import ChatView from './views/ChatView.vue';
import KGView from './knowledge_graph/KGView.vue';
import { RouterLink, RouterView } from 'vue-router'
import { useKgStore } from './stores/kgStore';
const kgStore = useKgStore();
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/chat">chat</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <div class="flex h-screen w-full">
    <router-view name="main" class="w-full h-full" />
    <div 
      :class="[
        'absolute inset-0 z-50 bg-white transition-transform duration-500 ease-in-out',
        kgStore.isVisable 
          ? 'translate-x-0'        // 显示：位置归位
          : 'translate-x-full'     // 隐藏：移出屏幕右侧 (如果是左侧滑出用 -translate-x-full)
      ]"
    >
      <Transition name="fade">
      <KGView 
        v-if="kgStore.isVisable" 
        class="absolute inset-0 z-50 bg-white"
        @close="kgStore.hideKG()"
      />
    </Transition>
    </div>
  </div>
</template>
      <!-- :class="['transition-all duration-500 ease-in-out overflow-hidden',
          kgStore.isVisable 
          ? 'absolute inset-0 z-50 w-full h-full' 
          : 'w-0 relative z-0 border-r delay-200'
      ]", -->
<style scoped>
  .fade-enter-active, .fade-leave-active { 
    transition: opacity 0.3s; 
  }
  .fade-enter-from, .fade-leave-to { 
    opacity: 0; 
  }
</style>
