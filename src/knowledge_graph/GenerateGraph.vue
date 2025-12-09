<template>
  <div class="w-full h-full" @click="handleContainerClick">
    <div ref="cy" class="cy"></div>

    <!-- 右侧配置面板
    <div class="side-panel" v-if="selectedNode">
      <h3>节点详情</h3>

      <p><strong>ID：</strong>{{ selectedNode.id }}</p>
      <p><strong>名称：</strong>
        <input
          v-model="selectedNode.label"
          @input="updateNodeLabel"
        >
      </p>

      <p><strong>类型：</strong>{{ selectedNode.type }}</p>

      <button @click="deleteNode">删除节点</button>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="GenerateGraph">
  import { ref, onMounted, type Ref, onUnmounted, watch, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
  import  { type Core,type Position} from 'cytoscape'
// 插件在配置文件中注册，避免多次执行插件的注册
// types
import type { RawGraphData,KGNode,KGEdge,TransformedData} from './types/kgData'
import type { EventObject } from 'cytoscape';
// 路由管理
import { useRouter } from 'vue-router';
const router = useRouter();
// 数据转换
import { transformGraphData } from './utils/transform';
// 节流函数
import { throttle,debounce } from '@/utils/throttle';
import { useKgStore } from '@/stores/kgStore';
// 缩放阈值
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 1;
const kgStore = useKgStore();
interface Props {
  nodes: KGNode[],
  edges: KGEdge[],
  isInteractive?:boolean,
  isLabelHidden?:boolean,
  isLightMode?:boolean,
}
const props = withDefaults(defineProps<Props>(),{
  isInteractive:true,
  isLabelHidden:false,
  isLightMode:true
})
const emit = defineEmits(['node-click','graph-click']);
// 样式
import { graphStylesheet} from './stylesheet/NodeSheet';

const cy = ref<HTMLDivElement | null>(null);
// 引入具体的实例
import cytoscape from '@/knowledge_graph/utils/cytoscape-setup'
let cyInstance:Core | null = null;
let resizeObserver:ResizeObserver | null = null;
const selectedNode: Ref<KGNode | null> = ref(null)

const runLayout = ( isUpdate = false) => {
  console.log('正在执行重绘，当前斥力:', kgStore.layoutConfig.nodeRepulsion);
  if(!cyInstance){
    console.log('图谱容器不存在');
    return;
  }
  const isRandomize = !isUpdate;
  const layout = cyInstance.layout({
    name:'fcose',
    randomize : isRandomize,
    fit:!isUpdate,
    // 节点生成
    animate: true,
    animationDuration: 500,
    // 物理参数
    nodeRepulsion:  kgStore.layoutConfig.nodeRepulsion,
    idealEdgeLength: kgStore.layoutConfig.idealEdgeLength,
    edgeElasticity: kgStore.layoutConfig.edgeElasticity,
    gravity: kgStore.layoutConfig.gravity,
    numIter: kgStore.layoutConfig.numIter,
    // 增量布局时的优化参数
  })
  layout.run();
}
const handleContainerClick = () => {
  if(!props.isInteractive){
    emit('graph-click');
  }
}
function fetchNewNodes(sourceId:string,curPos:Position):TransformedData{
  const newRawGraphData:RawGraphData =  {
"nodes": [
{
"id": "frontend_framework",
"label": "前端框架",
"wiki": "https://baike.baidu.com/item/前端框架"
},
{
"id": "ui_framework",
"label": "UI框架",
"wiki": "https://baike.baidu.com/item/UI框架"
},
{
"id": "mvvm_pattern",
"label": "MVVM模式",
"wiki": "https://baike.baidu.com/item/MVVM"
},
{
"id": "data_binding",
"label": "数据绑定",
"wiki": "https://baike.baidu.com/item/数据绑定"
},
{
"id": "component_development",
"label": "组件化开发",
"wiki": "https://baike.baidu.com/item/组件化开发"
},
{
"id": "dom_manipulation",
"label": "DOM操作",
"wiki": "https://baike.baidu.com/item/DOM操作"
},
{
"id": "state_management",
"label": "状态管理",
"wiki": "https://baike.baidu.com/item/状态管理"
},
{
"id": "routing",
"label": "路由",
"wiki": "https://baike.baidu.com/item/路由"
},
{
"id": "web_application",
"label": "Web应用",
"wiki": "https://baike.baidu.com/item/Web应用"
},
{
"id": "development_efficiency",
"label": "开发效率",
"wiki": ""
}
],
"edges": [
{
"source": "frontend_framework",
"target": "ui_framework",
"label": "包含类型"
},
{
"source": "frontend_framework",
"target": "mvvm_pattern",
"label": "常采用"
},
{
"source": "frontend_framework",
"target": "data_binding",
"label": "实现"
},
{
"source": "frontend_framework",
"target": "component_development",
"label": "支持"
},
{
"source": "frontend_framework",
"target": "dom_manipulation",
"label": "封装"
},
{
"source": "frontend_framework",
"target": "state_management",
"label": "提供"
},
{
"source": "frontend_framework",
"target": "routing",
"label": "集成"
},
{
"source": "frontend_framework",
"target": "web_application",
"label": "用于构建"
},
{
"source": "frontend_framework",
"target": "development_efficiency",
"label": "提升"
},
{
"source": "mvvm_pattern",
"target": "data_binding",
"label": "核心是"
},
{
"source": "component_development",
"target": "ui_framework",
"label": "基于"
},
{
"source": "state_management",
"target": "data_binding",
"label": "依赖"
},
{
"source": "routing",
"target": "web_application",
"label": "应用于"
}
]
}
  const newGraphData:TransformedData = transformGraphData(newRawGraphData,false,curPos);
  console.log(curPos,newGraphData.nodes[0]?.position);
  return newGraphData;
}
const handleSaveAndExit = () => {
  if(!cyInstance){
    console.log('保存并退出失败，图谱容器不存在');
    return;
  }
  const snapshot = cyInstance.png({
    output: 'base64uri',
    full: false,
    scale: .5,
    bg: '#ffffff'
  });
  const currentGraphData = cyInstance.json().elements;
  const sessionData = {
    id: 'topic-vue-js',
    lastmodified: Date.now(),
    nodeCount: cyInstance.nodes().length,
    thumbnail: snapshot,
    fullData: currentGraphData
  }
  localStorage.setItem('session_vue_js',JSON.stringify(sessionData));
}
const handleLabelsHide = () => {
  if(!cyInstance){
    console.log('图谱容器不存在');
    return;
  }
  const instance = cyInstance;
  instance.batch(()=>{
    const nodes = instance.nodes();
    if(props.isLabelHidden){
      nodes.addClass('hide-labels');
    }else{
      nodes.removeClass('hide-labels');
    }
  })
}
const handleLightMode = () => {
  if(!cyInstance){
    console.log('图谱容器不存在');
    return;
  }
  const instance = cyInstance;
  instance.batch(()=>{
    const nodes = instance.nodes();
    const edges = instance.edges();
    if(props.isLightMode){
      nodes.removeClass('darkMode');
      edges.removeClass('darkMode');
    }else{
      nodes.addClass('darkMode');
      edges.addClass('darkMode');
    }
  })
}
const handleResetView = ()=> {
  if(!cyInstance){
    console.log('图谱容器不存在');
    return;
  }
  cyInstance.animate({
    fit:{
      eles: cyInstance.elements(),
      padding: 50,
    },
    duration: 300,
    easing:'ease-in-out-cubic'
  })
}

const handleNodeClick = throttle((event:EventObject)=>{
    const isCtrlPressed = event.originalEvent.ctrlKey || event.originalEvent.metaKey;
    if(isCtrlPressed && cyInstance){
      const node = event.target;
      const curPos = node.position();
      console.log(`crtl+点击了${node.id()}`);
      console.log('节流回调执行时间：', new Date().toLocaleTimeString(), '毫秒：', Date.now());
      const newElements = fetchNewNodes(node.id(),curPos);
      const addedElements = cyInstance.add(newElements);
      // 动态添加
      runLayout(true);
    }else{
      console.log('没按ctrl或图谱容器不存在');
    }
},4000);
// 布局节流
const throttleRunLayout = throttle(()=>{
  console.log('节流重绘布局触发了');
  runLayout(true);
},100,{ leading:true ,trailing:true});
// 监听配置
watch(
  ()=>kgStore.layoutConfig,
  (newVal,oldVal)=>{
    console.log('监听到 kgStore.layoutConfig 变化:', newVal);
    throttleRunLayout();
  },
  {deep:true}
)

watch(
  ()=>props.isLabelHidden,
  ()=>{
    handleLabelsHide();
  },
)
watch(
  ()=>props.isLightMode,
  ()=>{
    handleLightMode();
  }
)
const debounceHandResize = debounce(()=>{
  console.log('缩放');
  if(cyInstance){
    cyInstance.resize();
    cyInstance.fit();
  }
},0);
// 节点经过的定时器
let hoverNodeTimer:number | null = null;
let hoverEdgeTimer:number | null = null;
onMounted(() =>{
  cyInstance = cytoscape({
    container: cy.value,
    elements:{
      nodes: props.nodes,
      edges: props.edges
    },
    style: graphStylesheet,
  });
  if(!cyInstance){
    console.log('挂载时实例化图谱失败,GenerateGraph.vue');
    return;
  }
  runLayout();
  // ctrl+点击拓展节点
  cyInstance.on(
    'tap',
    'node',
    handleNodeClick
  );
  // 图谱跟随浏览器缩放
  resizeObserver = new ResizeObserver(() => {
    window.requestAnimationFrame(() => {
      debounceHandResize();
    });
  });
  if(cy.value){
    resizeObserver.observe(cy.value);
  }
  // 交互事件
  cyInstance.on('mouseover','node',(e)=>{
    const node = e.target;
    node.addClass('highlight');
    node.connectedEdges().addClass('highlight');
    node.neighborhood().edges().addClass('highlight');
    if(hoverNodeTimer){
      clearTimeout(hoverNodeTimer);
    }
    hoverNodeTimer = setTimeout(()=>{
      const connectionCount = node.degree();
      const label = node.data('label');
      const text = `${label} - connections: ${connectionCount}`;
      node.data('detailLabel',text);
      node.addClass('show-detail');
    },400)
  })
  cyInstance.on('mouseout','node',(e)=>{
    const node = e.target;
    if(hoverNodeTimer){
      clearTimeout(hoverNodeTimer);
    }
    node.removeClass('highlight show-detail');
    node.connectedEdges().removeClass('highlight');
    node.removeData('detailLabel');
  });
  cyInstance.on('mouseover','edge',(e)=>{
    const edge = e.target;
    edge.addClass('highlight');
    if(hoverEdgeTimer){
      clearTimeout(hoverEdgeTimer);
    }
    hoverEdgeTimer = setTimeout(()=>{
      const label = edge.data('label');
      const text = `${label}`;
      edge.data('detailLabel',text);
    },100)
  })
  cyInstance.on('mouseout','edge',(e)=>{
    const edge = e.target;
    if(hoverEdgeTimer){
      clearTimeout(hoverEdgeTimer);
    }
    edge.removeClass('highlight');
    edge.removeData('detailLabel');
  })
  // 缩放阈值
  cyInstance.on('zoom',()=>{
    if(!cyInstance){
      console.log('图谱容器不存在');
      return;
    }
    const instance = cyInstance;
    const currentZoom = cyInstance.zoom();
    let opacity = (currentZoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
    if(opacity < 0){
      opacity = 0;
    }
    if(opacity > 1){
      opacity = 1;
    }
    instance.batch(()=>{
      instance.style()
      .selector('node')
      .style('text-opacity',opacity)
      .style('text-outline-opacity',opacity)
      .update();
      instance.style()
      .selector('edge')
      .style('text-opacity',opacity)
      .style('text-background',opacity)
      .style('text-border-opacity',opacity)
      .update();
    })
  })
});

onBeforeUnmount(()=>{
  if(resizeObserver){
    resizeObserver.disconnect();
  }
  if(cyInstance){
    cyInstance.destroy();
  }
})
defineExpose({
  handleSaveAndExit,
  handleResetView
})
//   // =========================
//   // 点击节点：显示右侧配置项
//   // =========================
//   cy.value.on('tap', 'node', (evt) => {
//     const node = evt.target.data()
//     selectedNode.value = {
//       id: node.id,
//       label: node.label,
//       type: node.type
//     }
//   })

//   // 点击空白区域取消选中
//   cy.value.on('tap', (evt) => {
//     if (evt.target === cy.value) selectedNode.value = null
//   })
//   // 
//   cy.value.on('drag', 'node', () => {
//     cy.value.layout({ name: 'fcose', incremental: true }).run();
//   });
//   // =========================
//   // 右键菜单
//   // =========================
//   cy.value.contextMenus({
//     menuItems: [
//       {
//         id: 'delete',
//         content: '删除节点',
//         selector: 'node',
//         onClickFunction: (event:EventObject) => {
//           event.target.remove()
//           selectedNode.value = null
//         }
//       },
//       {
//         id: 'addNode',
//         content: '添加相邻节点',
//         selector: 'node',
//         onClickFunction: (event:EventObject) => {
//           const parent = event.target
//           const newId = 'N' + Math.floor(Math.random() * 10000)

//           if(cy.value){
//             cy.value.add([
//             { data: { id: newId, label: '新节点', type: 'Unknown' } },
//             { data: { source: parent.id(), target: newId, label: '关联' } }
//           ])
//           }
//         }
//       }
//     ]
//   })

//   // =========================
//   // 缩放控件
//   // =========================
//   cy.value.panzoom({})
// })

// const updateNodeLabel = () => {
//   if (!selectedNode.value || !cy.value) return;
//   const node = cy.value.getElementById(selectedNode.value.id);
//   node.data('label', selectedNode.value.label);
// };

// const deleteNode = () => {
//   if (!selectedNode.value || !cy.value) return;
//   cy.value.getElementById(selectedNode.value.id).remove();
//   selectedNode.value = null;
// };
</script>

<style scoped>
  .cy {
  flex: 1;
  height: 100vh;
  border: 1px solid #ddd;
}

  .side-panel {
    width: 260px;
    background: #fafafa;
    border-left: 1px solid #ddd;
    padding: 15px;
  }
</style>