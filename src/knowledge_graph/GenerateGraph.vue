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
  import { ref, onMounted, type Ref, onUnmounted, watch } from 'vue'

  import cytoscape, { type Core } from 'cytoscape'
// 插件
// 布局插件
import fcose from 'cytoscape-fcose'; // 导入 fcose
import coseBilkent from 'cytoscape-cose-bilkent'; // 布局插件
// 交互插件
import panzoom from 'cytoscape-panzoom'; // 平移缩放插件
import contextMenus from 'cytoscape-context-menus'
// types
import type { KGNode,KGEdge} from './types/kgData'
import type { EventObject } from 'cytoscape';
// 注册插件
// 物理
cytoscape.use(fcose);
// 布局
cytoscape.use(coseBilkent)
// 
cytoscape.use(panzoom)
cytoscape.use(contextMenus)

interface Props {
  nodes: KGNode[],
  edges: KGEdge[],
  isInteractive?:boolean
}
const props = withDefaults(defineProps<Props>(),{
  isInteractive:true,
})
const emit = defineEmits(['node-click','graph-click']);
// 样式
import { graphStylesheet } from './stylesheet/NodeSheet';

const cy = ref<HTMLDivElement | null>(null);
let cyInstance: Core | null = null;
const selectedNode: Ref<KGNode | null> = ref(null)

const initGraph = () => { 
  if(!cy.value){
    console.error('图谱容器不存在');
    return;
  }
  if(cyInstance){
    cyInstance.destroy();
  }
  cyInstance = cytoscape({
    container: cy.value,
    elements: {
      nodes:props.nodes,
      edges:props.edges
    },
    layout: {
      name: 'fcose',
      incremental: true, // 保留拖拽联动，但优化参数
      nodeRepulsion: 4500, // 降低排斥力（默认可能4500+，太大易弹飞）
      idealEdgeLength: 120, // 增大理想边长，避免节点过度拥挤
      gravity: 0.3, // 增加全局引力，让节点不易飘走
      numIter: 100, // 限制迭代次数（拖拽后快速稳定，不持续晃动）
      // animate: false, // 禁用拖拽后的动画惯性，拖拽停则节点停
      animationDuration: 0, // 动画时长设为0，进一步减少延迟
      fit: true, // 保持画布适配节点
      padding: 30 // 画布内边距，避免节点贴边
    },
    style: graphStylesheet,
    zoomingEnabled: props.isInteractive,
    userZoomingEnabled: props.isInteractive,
    panningEnabled: props.isInteractive,
    userPanningEnabled: props.isInteractive,
    boxSelectionEnabled: props.isInteractive,
    autoungrabify: !props.isInteractive,
    autounselectify: !props.isInteractive,
  })
  if (props.isInteractive) {
    cyInstance.on('tap', 'node', (event) => emit('node-click', event.target.data()));
  }
}
const handleContainerClick = () => {
  if(!props.isInteractive){
    emit('graph-click');
  }
}
onMounted(initGraph);
watch(
  ()=>[props.nodes,props.edges],
  initGraph,
  {deep:true}
)
onUnmounted(() => cyInstance?.destroy());

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