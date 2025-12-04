import { defineStore } from "pinia";
import { reactive, ref } from "vue";

// 默认物理参数
const DEFAULT_CONFIG = {
  nodeRepulsion: 4500,
  idealEdgeLength: 50,
  edgeElasticity: 0.45,
  gravity: 0.25,
  numIter:2500,
}
export const useKgStore = defineStore('kg',()=>{
  const isVisable = ref(false);
  const isFullScreen = ref(false);
  // 数据库状态
  const isLoading = ref(false);
  const currentSessionId = ref<string | null>(null);
  const layoutConfig = reactive({...DEFAULT_CONFIG});

  const showKG = () =>{isVisable.value = true};
  const hideKG = () => {isVisable.value = false};
  const toggleFullScreen = ()=> {isFullScreen.value = !isFullScreen.value;}
  // 加载数据
  const loadGraphNodes = async (sessionId: string) => {

  }
  const loadSessionGraph = async(sessionId:string) => {
    currentSessionId.value = sessionId;
    isLoading.value = true;
    try {
      // const response = await ajaxPrefilter.get('')
      const dbConfig = null;
      const targetConfig = dbConfig || DEFAULT_CONFIG;
      Object.assign(layoutConfig,targetConfig);
      // 获得节点
      // await loadNodes(sessionId);
    }catch(error) {
      console.log('加载图谱配置失败',error);
      Object.assign(layoutConfig,DEFAULT_CONFIG);
    }finally {
      isLoading.value = false;
    }
  }
  
  const saveConfigDB = async()=>{
    if(!currentSessionId){
      return;
    }
    try{
      console.log('正在保存配置到数据库',layoutConfig);
      // await
    }catch(error){
      console.log('保存数据库失败',error);
    }
  }
  const resetConfig = ()=>{
    Object.assign(layoutConfig,DEFAULT_CONFIG);
  }
  
  return {
    isVisable,
    showKG,
    hideKG,
    isFullScreen,
    isLoading,
    currentSessionId,
    layoutConfig,
    toggleFullScreen,
    loadSessionGraph,
    loadGraphNodes,
    saveConfigDB,
    resetConfig
  }
})
