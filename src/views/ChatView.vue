<template>
  <div class="relative flex flex-1 h-full w-full transition-colors overflow-hidden">
      <div class="relative flex h-full w-full flex-row">
        <!-- <div class="box hover:bg-token-surface-hover">111</div>
        <div class="box">111</div> -->
        <ChatSideBar></ChatSideBar>
        <div class="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <main class="relative h-full w-full flex-1 overflow-hidden" id="main" z-index="-1">
            <div id="thread" class="group h-full w-full">
              <div class="composer-parent flex flex-col focus-visible:outline-0 h-full overflow-hidden">
                <!-- toubu -->
                  <!-- <HeaderBar></HeaderBar> -->
                <div class="relative flex flex-col grow overflow-hidden basis-auto">
                  <div class="relative flex-1 min-h-0 overflow-hidden">
                <!-- full -->
                    <RouterView v-slot="{Component}">
                      <KeepAlive :include="['ChatFull']">
                        <Transition name="fade" mode="out-in">                    <component 
                          :is="Component"
                          v-on="getComponentEvents(Component)"
                        />
                        </Transition>
                      </KeepAlive>
                    </RouterView>
                  </div>
                </div>
                <!-- @graph-click="handleGraphSelect" -->
                <!-- weibu -->
                <Transition name="slide-up">
                  <div 
                    v-if="route.name !== 'ChatWelcome'"
                    class="w-full flex-shrink-0 bg-token-main-surface-primary z-20"
                    >
                    <ChatInput
                      :disabled="isGenerating"
                      @send="handleUserSend"
                    ></ChatInput>
                  </div>
                </Transition>
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
  import { ref, Transition, watch, type VNode } from 'vue';
  import { transformGraphData } from '@/knowledge_graph/utils/transform';
  // pinia
  import { useKgStore } from '@/stores/kgStore';
  import { useChatStore } from '@/stores/chatStore';
  const route = useRoute();
  const router = useRouter();
  const kgStore = useKgStore();
  const chatStore = useChatStore();
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
          "source": "vue_js",
          "target": "javascript",
          "label": "基于"
        },
        {
          "source": "vue_js",
          "target": "frontend_framework",
          "label": "属于"
        },
        {
          "source": "vue_js",
          "target": "evan_you",
          "label": "由...创建"
        },
        {
          "source": "vue_js",
          "target": "single_page_application",
          "label": "适用于"
        },
        {
          "source": "vue_js",
          "target": "component",
          "label": "采用"
        },
        {
          "source": "vue_js",
          "target": "virtual_dom",
          "label": "使用"
        },
        {
          "source": "vue_js",
          "target": "react",
          "label": "类似"
        },
        {
          "source": "vue_js",
          "target": "angular",
          "label": "类似"
        },
        {
          "source": "vue_js",
          "target": "progressive_framework",
          "label": "是"
        }
    ]
  }
  //
  const handleStartChat = (content:string) => {
    handleUserSend(content);
  } 
  const componentEventMap = {
  ChatWelcome: { 'start-chat': handleStartChat },
  // ChatDetail: { ... }
  };
  type ValidComponentName = keyof typeof componentEventMap;
  const getComponentName = (componentVNode: VNode): ValidComponentName | null => {
    const componentDef = componentVNode.type;
    // 提取组件名并校验是否在合法列表中
    let componentName: string | undefined = '';
    if (typeof componentDef === 'object' && componentDef !== null) {
      const def = componentDef as any;
      componentName = def.name || def.__name;
    }
    // 类型守卫：确保返回的是合法组件名或 null
    if (componentName && componentName in componentEventMap) {
      return componentName as ValidComponentName;
    }
    return null;
  };
  const getComponentEvents = (componentVNode:VNode) =>{
    const name = getComponentName(componentVNode);
    if(name){
      return componentEventMap[name];
    }
    return {};
  }
  const handleUserSend = async (text:string) => {
    console.log(`${text}`);
    chatStore.addUserMessage(text);
    isGenerating.value = true;
    const loadingId = chatStore.addLoadingMessage();
    setTimeout(async ()=>{
      chatStore.removeMessage(loadingId);
      // const data = transformGraphData(mockGraphData,true);
      await chatStore.addAssistantMessage(
        '这是为您生成的图谱',
        mockGraphData
      )
      isGenerating.value = false;
    },1500)
  } 
 
  watch(
    ()=>route.params.sessionId,
    async(newId)=>{
      if(typeof newId === 'string' && newId.trim()){
        console.log(`正在准备切换路由，跳转到${{ newId }}`);
        await kgStore.loadSessionGraph(newId);
        // 确保每次路由切换都刷新聊天数据
        await chatStore.loadChatMessages(newId);
      }else {
        console.log('sessionId无效',newId);
        chatStore.currentSessionId = null;
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
  /* 底部输入框滑入动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 页面淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>