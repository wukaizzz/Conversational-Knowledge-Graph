<template>
  <div class="relative flex flex-1 h-full w-full transition-colors">
      <div class="relative flex h-full w-full flex-row">
        <!-- <div class="box hover:bg-token-surface-hover">111</div>
        <div class="box">111</div> -->
        <ChatSideBar></ChatSideBar>
        <div class="relative flex h-full min-w-0 flex-1 flex-col">
          <main class="relative h-full w-full flex-1 overflow-auto" id="main" z-index="-1">
            <div id="thread" class="group h-full w-full">
              <div class="composer-parent flex flex-col focus-visible:outline-0 overflow-hidden h-full">
                <!-- toubu -->
                  <HeaderBar></HeaderBar>
                <div class="relative flex flex-col grow overflow-hidden basis-auto">
                  <div class="relative h-full">
                <!-- full -->
                    <RouterView v-slot="{Component}">
                      <KeepAlive :include="['ChatFull']">
                        <component 
                        :is="Component"
                        @graph-click="handleGraphSelect"
                        />
                      </KeepAlive>
                    </RouterView>
                  </div>
                </div>
                <!-- weibu -->
                <div class="w-full flex-shrink-0">
                  <ChatInput
                    :disabled="isGenerating"
                    @send="handleUserSend"
                  ></ChatInput>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts" name="ChatView">
// 组件
  import HeaderBar from '@/components/HeaderBar.vue';
  import ChatSideBar from '@/components/ChatSideBar.vue';
  import ChatFull from '@/components/ChatFull.vue';
  import ChatInput from '@/components/ChatInput.vue';
  // 类型
  import type { ChatMessage } from '@/types/chat';
  import type { RawGraphData } from '@/knowledge_graph/types/kgData';
  import { useRoute,useRouter } from 'vue-router';
  import { ref, watch } from 'vue';
  import { transformGraphData } from '@/knowledge_graph/utils/transform';
  // pinia
  import { useKgStore } from '@/stores/kgStore';
  import { useChatStore } from '@/stores/chatStore';
  const route = useRoute();
  const router = useRouter();
  const kgStore = useKgStore();
  const chatStore = useChatStore();
  const messages = ref<ChatMessage[]>([]);
  const isGenerating = ref(false);
  const mockGraphData:RawGraphData = {
    "nodes": [
      {
        "id": "vue_js",
        "label": "Vue.js",
        "wiki": "https://baike.baidu.com/item/Vue.js"
      },
      {
        "id": "javascript",
        "label": "JavaScript",
        "wiki": "https://baike.baidu.com/item/JavaScript"
      },
      {
        "id": "frontend_framework",
        "label": "前端框架",
        "wiki": "https://baike.baidu.com/item/前端框架"
      },
      {
        "id": "evan_you",
        "label": "尤雨溪",
        "wiki": "https://baike.baidu.com/item/尤雨溪"
      },
      {
        "id": "single_page_application",
        "label": "单页应用",
        "wiki": "https://baike.baidu.com/item/单页应用"
      },
      {
        "id": "component",
        "label": "组件",
        "wiki": "https://baike.baidu.com/item/组件"
      },
      {
        "id": "virtual_dom",
        "label": "虚拟DOM",
        "wiki": "https://baike.baidu.com/item/虚拟DOM"
      },
      {
        "id": "react",
        "label": "React",
        "wiki": "https://baike.baidu.com/item/React"
      },
      {
        "id": "angular",
        "label": "Angular",
        "wiki": "https://baike.baidu.com/item/Angular"
      },
      {
        "id": "progressive_framework",
        "label": "渐进式框架",
        "wiki": "https://baike.baidu.com/item/渐进式框架"
      }
    ],
    "edges": [
        {
          "source_id": "vue_js",
          "target_id": "javascript",
          "label": "基于"
        },
        {
          "source_id": "vue_js",
          "target_id": "frontend_framework",
          "label": "属于"
        },
        {
          "source_id": "vue_js",
          "target_id": "evan_you",
          "label": "由...创建"
        },
        {
          "source_id": "vue_js",
          "target_id": "single_page_application",
          "label": "适用于"
        },
        {
          "source_id": "vue_js",
          "target_id": "component",
          "label": "采用"
        },
        {
          "source_id": "vue_js",
          "target_id": "virtual_dom",
          "label": "使用"
        },
        {
          "source_id": "vue_js",
          "target_id": "react",
          "label": "类似"
        },
        {
          "source_id": "vue_js",
          "target_id": "angular",
          "label": "类似"
        },
        {
          "source_id": "vue_js",
          "target_id": "progressive_framework",
          "label": "是"
        }
    ]
  }
  const handleUserSend = async (text:string) => {
    chatStore.currentMessages.push({
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: text,
      isResumeCard: false,
      timestamp: Date.now()
    })
    isGenerating.value = true;
    const loadingId = 'loading-' + Date.now();
    chatStore.currentMessages.push({
      id:loadingId,
      role: 'assistant',
      type: 'loading',
      isResumeCard: false,
      timestamp: Date.now(),
    })
    setTimeout(()=>{
      // 保留符合条件的
      if(chatStore.currentSessionId){
        const currentMessages = chatStore.messageCache[chatStore.currentSessionId] || []
        chatStore.messageCache[chatStore.currentSessionId] = currentMessages.filter(m => m.id != loadingId);
      }else{
        console.log('sessionId不存在');
      }
      const transformed = transformGraphData(mockGraphData,true);
      chatStore.currentMessages.push({
        id:Date.now().toString(),
        role: 'assistant',
        type: 'graph',
        content: `这是为您生成的关于${text}的知识图谱`,
        graphData: transformed,
        isResumeCard: false,
        timestamp: Date.now(),
      })
      isGenerating.value = false;
    },1500)
  } 
  const handleGraphSelect = (graphData:any) => {
    kgStore.showKG();
    // 
  }
  watch(
    ()=>route.params.sessionId,
    async(newId)=>{
      if(typeof newId === 'string' && newId.trim()){
        console.log(`正在准备切换路由，跳转到${{ newId }}`);
        await kgStore.loadSessionGraph(newId);
      }else {
        console.log('sessionId无效',newId);
      }
    },
    { immediate:true}
  )
</script>

<style scoped>
  .composer-parent {
    --composer-footer_height: var(--composer-bar_footer-current-height,32px);
    --composer-bar_height: var(--composer-bar_current-height,52px);
    --composer-bar_width: var(--composer-bar_current-width,768px);
    --mask-fill: linear-gradient(180deg,#fff 0%,#fff);
    --mask-erase: linear-gradient(180deg,#000 0%,#000);
}

</style>