import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { ChatMessage } from "@/types/chat";
import type { RawGraphData, TransformedData } from "@/knowledge_graph/types/kgData";
import { generateGraphSnapshot } from "@/knowledge_graph/utils/graphSnapshot";
import { transformGraphData } from "@/knowledge_graph/utils/transform";
// import fetchMessagesMap

const DEFAULT_DATA:ChatSessions = {
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
              "id": "node_vue",
              "label": "Vue.js",
              "wiki": "https://en.wikipedia.org/wiki/Vue.js"
          },
          {
              "id": "node_vite",
              "label": "Vite",
              "wiki": "https://en.wikipedia.org/wiki/Vite_(software)"
            
          },
          {
              "id": "node_pinia",
              "label": "Pinia",
              "wiki": "https://pinia.vuejs.org/"
            
          }
        ],
        "edges": [
          {
              "source": "node_vite",
              "target": "node_vue",
              "label": "构建工具"
            
          },
          {
              "source": "node_pinia",
              "target": "node_vue",
              "label": "状态管理"
            
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
      "id": "msg_003_1",
      "role": "user",
      "type": "text",
      "content": "分析一下 React 和 Angular 的区别",
      "isResumeCard": false,
      "timestamp": 1709600040000
    },
    {
      "id": "msg_004_1",
      "role": "assistant",
      "type": "graph",
      "content": "这是您上次查看的 vue生态 架构图保存结果。",
      "graphData": {
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
      },
      "isResumeCard": true,
      "snapshotUrl": "https://example.com/snapshots/react-graph-thumb.png",
      "timestamp": 1709600050000
    }
  ]
}
type ChatSessions = Record<string, ChatMessage[]>;
export const useChatStore = defineStore('chatMsgs',()=>{
  // Record语法糖
  const messageCache = reactive<ChatSessions>(DEFAULT_DATA);
  // const messageCache = DEFAULT_DATA as ChatSessions;
  const sessionIds = Object.keys(messageCache);
  const currentSessionId = ref<string | null>(null);
  const isLoading = ref(false);
  // 通过计算属性，动态获得消息列表
  let currentMessages = computed(()=>{
    if(!currentSessionId.value){
      return [];
    }
    return messageCache[currentSessionId.value] || [];
  })
  const loadChatMessages = async (sessionId:string)=>{
    if(!sessionId){
      console.log('sessionId传递错误');
      return;
    }
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
  const addUserMessage = (text:string)=>{
    if (!currentSessionId.value){
      console.log('currentSessionId无效m,添加用户回答失败');
      return;
    }
    const newMessage:ChatMessage = {
      id:Date.now().toString(),
      role:"user",
      type:"text",
      content:text,
      isResumeCard:false,
      timestamp:Date.now()
    }
    const sessionId = currentSessionId.value;
    if(!messageCache[sessionId]){
      messageCache[sessionId] = [];
    }
    messageCache[sessionId].push(newMessage);

  }
  const addLoadingMessage = ():string => {
    if(!currentSessionId.value){
      console.log('currentSessionId无效');
      return '';
    }
    const sessionId = currentSessionId.value;
    const loadingId = 'loading-' + Date.now();
    if (!messageCache[sessionId]) {
      messageCache[sessionId] = [];
    }
    messageCache[sessionId].push({
      id:loadingId,
      role:'assistant',
      type:'loading',
      isResumeCard:false,
      timestamp:Date.now(),
    })
    return loadingId;
  }
  const removeMessage = (msgId:string)=>{
    if (!currentSessionId.value){
      console.log('currentSessionId无效');
      return;
    }
    const sessionId = currentSessionId.value;
    if(messageCache[sessionId]){
      console.log('删除对应的消息成功');
      messageCache[sessionId] = messageCache[sessionId].filter((m)=>m.id !== msgId);
    }
  }
  const addAssistantMessage = async (content:string,graphData:RawGraphData)=>{
    if(!currentSessionId.value){
      console.log('currentSessionId无效');
      return;
    }
    const sessionId = currentSessionId.value;
    const newMessage = reactive<ChatMessage>({
      id:Date.now().toString(),
      role:'assistant',
      type:'graph',
      content:content,
      graphData:graphData,
      isResumeCard: true,
      snapshotUrl:'',
      timestamp:Date.now()
    })
    if(!messageCache[sessionId]){
      messageCache[sessionId] = [];
    }
    messageCache[sessionId].push(newMessage);
    
    try {
      const transformedData = transformGraphData(graphData,true)
      const snapshot = await generateGraphSnapshot(transformedData.nodes,transformedData.edges);
      newMessage.snapshotUrl = snapshot;
      console.log('快照生成成功');
    }catch(error){
      // newMessage.snapshotUrl = snapshot;
      console.log('生成快照失败',error);
    }
  }
  // 对话中最新的图谱数据
  const latestGraphData = computed(() => {
    const msgs = currentMessages.value;
    for(let i = msgs.length - 1;i >= 0;i--){
      const msg = msgs[i];
      if(msg?.type === 'graph' && msg.graphData){
        return msg.graphData;
      }
    }
    return null;
  })
  return {
    messageCache,
    sessionIds,
    isLoading,
    currentSessionId,
    currentMessages,
    latestGraphData,
    loadChatMessages,
    addUserMessage,
    addLoadingMessage,
    removeMessage,
    addAssistantMessage
  }
})
