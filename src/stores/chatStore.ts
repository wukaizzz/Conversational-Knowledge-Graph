import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { ChatMessage,ChatSessions } from "@/types/chat";
// import fetchMessagesMap

const DEFAULT_DATA = {
  "session_001": [
    {
      "id": "msg_001_1",
      "role": "user",
      "type": "text",
      "content": "你好，请问什么是前端工程化？",
      "isResumeCard": false,
      "timestamp": 1709600000000
    },
    {
      "id": "msg_001_2",
      "role": "assistant",
      "type": "text",
      "content": "前端工程化是指将软件工程的方法和思想应用到前端开发中，包括模块化、组件化、规范化和自动化。",
      "isResumeCard": false,
      "timestamp": 1709600010000
    }
  ],
  "session_002": [
    {
      "id": "msg_002_1",
      "role": "user",
      "type": "text",
      "content": "帮我生成一个关于 Vue.js 生态的知识图谱",
      "isResumeCard": false,
      "timestamp": 1709600020000
    },
    {
      "id": "msg_002_2",
      "role": "assistant",
      "type": "graph",
      "content": "好的，这是为您生成的 Vue.js 生态图谱，包含了核心库和相关工具。",
      "graphData": {
        "nodes": [
          {
            "group": "nodes",
            "data": {
              "id": "node_vue",
              "label": "Vue.js",
              "wiki": "https://en.wikipedia.org/wiki/Vue.js"
            }
          },
          {
            "group": "nodes",
            "data": {
              "id": "node_vite",
              "label": "Vite",
              "wiki": "https://en.wikipedia.org/wiki/Vite_(software)"
            }
          },
          {
            "group": "nodes",
            "data": {
              "id": "node_pinia",
              "label": "Pinia",
              "wiki": "https://pinia.vuejs.org/"
            }
          }
        ],
        "edges": [
          {
            "group": "edges",
            "data": {
              "source_id": "node_vite",
              "target_id": "node_vue",
              "label": "构建工具"
            }
          },
          {
            "group": "edges",
            "data": {
              "source_id": "node_pinia",
              "target_id": "node_vue",
              "label": "状态管理"
            }
          }
        ]
      },
      "isResumeCard": false,
      "timestamp": 1709600030000
    }
  ],
  "session_003": [
    {
      "id": "msg_003_1",
      "role": "user",
      "type": "text",
      "content": "分析一下 React 和 Angular 的区别",
      "isResumeCard": false,
      "timestamp": 1709600040000
    },
    {
      "id": "msg_003_2",
      "role": "assistant",
      "type": "loading",
      "content": "正在检索知识库并构建关系模型...",
      "isResumeCard": false,
      "timestamp": 1709600045000
    }
  ],
  "session_004": [
    {
      "id": "msg_004_1",
      "role": "assistant",
      "type": "graph",
      "content": "这是您上次查看的 React 架构图保存结果。",
      "graphData": {
        "nodes": [
          {
            "group": "nodes",
            "data": {
              "id": "node_react",
              "label": "React",
              "wiki": "https://react.dev"
            }
          },
          {
            "group": "nodes",
            "data": {
              "id": "node_fiber",
              "label": "React Fiber",
              "wiki": "https://github.com/acdlite/react-fiber-architecture"
            }
          }
        ],
        "edges": [
          {
            "group": "edges",
            "data": {
              "source_id": "node_react",
              "target_id": "node_fiber",
              "label": "核心架构"
            }
          }
        ]
      },
      "isResumeCard": true,
      "snapshotUrl": "https://example.com/snapshots/react-graph-thumb.png",
      "timestamp": 1709600050000
    }
  ]
}
export const useChatStore = defineStore('chatMsgs',()=>{
  // Record语法糖
  // const messageCache = reactive<ChatSessions>({});
  const messageCache = DEFAULT_DATA as unknown as ChatSessions;//????
  const currentSessionId = ref<string | null>(null);
  const isLoading = ref(false);
  // 通过计算属性，动态获得消息
  const currentMessages = computed(()=>{
    if(!currentSessionId.value){
      return [];
    }
    return messageCache[currentSessionId.value] || [];
  })
  const loadChatMessages = async (sessionId:string)=>{
    currentSessionId.value = sessionId;
    if(messageCache[sessionId] && messageCache[sessionId].length > 0){
      console.log('命中缓存');
      return;
    }
    try {
      console.log('尝试请求对话数据');
      // const messages = await fetchMessagesMap
      // messageCache[sessionId] = messages;
    }catch(error){
      console.log('加载对话配置失败',error);
    }finally{
      isLoading.value = false;
    }
  }
  const addMessage = (sessionId:string,message:ChatMessage)=>{
    if(!messageCache[sessionId]){
      messageCache[sessionId] = []
    }
    messageCache[sessionId].push(message);
  }
  return {
    messageCache,
    isLoading,
    currentSessionId,
    currentMessages,
    loadChatMessages,
    addMessage
  }
})
