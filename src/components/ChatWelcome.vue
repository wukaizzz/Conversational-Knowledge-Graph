<template>
  <div class="h-full w-full flex flex-col items-center justify-center p-4 bg-token-main-surface-primary text-white relative overflow-hidden">
    
    <div class="z-10 flex flex-col items-center mb-8 animate-fade-in">
      <h1 class="text-3xl font-semibold tracking-wide text-white/90">
        {{ greeting }}
      </h1>
    </div>

    <div 
      class="z-10 w-full max-w-2xl relative group transition-all duration-300"
      :class="{ 'scale-105': isFocused }"
    >
      <div 
        class="relative flex items-center w-full bg-[#2F2F2F] hover:bg-[#383838] rounded-full px-4 py-3 shadow-2xl transition-colors duration-200 outline-none"
      >
        <button class="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="M12 5v14"/>
          </svg>
        </button>

        <input
          v-model="inputText"
          type="text"
          class="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg px-3 h-full"
          placeholder="键入一个关键词"
          focus:ring-0
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter.prevent="handleSubmit"
        />

        <div class="flex items-center gap-1 shrink-0">
          <button 
            @click="handleSubmit" 
            data-testid="send-button" 
            class="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 shrink-0 flex items-center justify-center"
          >
            <SendBtn/>
          </button>
        </div>
        
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 opacity-60">
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SendBtn from './icons/SendBtn.vue';
// 定义事件，通知父组件开始对话
const emit = defineEmits(['start-chat']);

const inputText = ref('');
const isFocused = ref(false);

const greeting = computed(() => {
  const hour = new Date().getHours();
  
  // 如果想保留之前的创意逻辑：
  if (hour < 5) return '夜深了，今天想了解什么';
  if (hour < 11) return '早上好，今天想了解什么?';
  if (hour < 13) return '中午好，今天想了解什么?';
  if (hour < 18) return '下午好，今天想了解什么?';
  return '晚上好，今天想了解什么?';
});

const handleSubmit = () => {
  if (!inputText.value.trim()) return;
  emit('start-chat', inputText.value);
  inputText.value = '';
};
</script>

<style scoped>
/* 简单的淡入动画 */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>