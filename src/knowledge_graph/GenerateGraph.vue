<template>
  <div>
    <div id="cy" class="cy"></div>

    <!-- 右侧配置面板 -->
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
    </div>
  </div>
</template>

<script setup lang="ts" name="GenerateGraph">
  import { ref, onMounted, type Ref } from 'vue'

  import cytoscape from 'cytoscape'
// 插件
// 布局插件
import fcose from 'cytoscape-fcose'; // 导入 fcose
import coseBilkent from 'cytoscape-cose-bilkent'
// 交互插件
import panzoom from 'cytoscape-panzoom'
import contextMenus from 'cytoscape-context-menus'
import $ from 'jquery'
// types
import type { NodeData } from './types/cytoscape-cose-bilkent'
import type { EventObject } from 'cytoscape';
// 注册插件
// 布局
cytoscape.use(coseBilkent)
cytoscape.use(fcose);
// 
cytoscape.use(panzoom)
cytoscape.use(contextMenus)

const cy:Ref<cytoscape.Core | null> = ref(null)
const selectedNode: Ref<NodeData | null> = ref(null)

onMounted(() => {
  cy.value = cytoscape({
    container: document.getElementById('cy'),

    elements: [
  // 节点（包含用户、商品、订单、评论等类型）
  { data: { id: 'A', label: '用户', type: 'Person' } },
  { data: { id: 'B1', label: '商品1', type: 'Product' } },
  { data: { id: 'B2', label: '商品2', type: 'Product' } },
  { data: { id: 'B3', label: '商品3', type: 'Product' } },
  { data: { id: 'C1', label: '订单1', type: 'Order' } },
  { data: { id: 'C2', label: '订单2', type: 'Order' } },
  { data: { id: 'D1', label: '评论1', type: 'Comment' } },
  { data: { id: 'D2', label: '评论2', type: 'Comment' } },
  { data: { id: 'E1', label: '支付记录', type: 'Payment' } },

  // 边（关联逻辑：用户→商品/订单/评论；订单→商品/支付；商品→评论）
  { data: { id: 'A-B1', source: 'A', target: 'B1', label: '购买' } },
  { data: { id: 'A-B2', source: 'A', target: 'B2', label: '浏览' } },
  { data: { id: 'A-B3', source: 'A', target: 'B3', label: '收藏' } },
  { data: { id: 'A-C1', source: 'A', target: 'C1', label: '创建' } },
  { data: { id: 'A-C2', source: 'A', target: 'C2', label: '创建' } },
  { data: { id: 'A-D1', source: 'A', target: 'D1', label: '发布' } },
  { data: { id: 'A-D2', source: 'A', target: 'D2', label: '发布' } },
  { data: { id: 'C1-B1', source: 'C1', target: 'B1', label: '包含' } },
  { data: { id: 'C2-B2', source: 'C2', target: 'B2', label: '包含' } },
  { data: { id: 'C1-E1', source: 'C1', target: 'E1', label: '关联' } },
  { data: { id: 'B1-D1', source: 'B1', target: 'D1', label: '对应' } },
  { data: { id: 'B2-D2', source: 'B2', target: 'D2', label: '对应' } }
],

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#4A90E2',
          'label': 'data(label)',
          'color': '#fff',
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#999',
          'target-arrow-color': '#999',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
        }
      },
      {
        selector: ':selected',
        style: {
          'background-color': '#F39C12',
          'line-color': '#F39C12',
          'target-arrow-color': '#F39C12'
        }
      }
    ],

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
    }
  })
  if (cy.value) {
  // 生成 cose-bilkent 布局（仅配置布局本身的规则，不含动画）
    const layout = cy.value.layout({
      name: 'fcose',
      nodeRepulsion: 2000, // cose-bilkent 支持的合法配置项
      idealEdgeLength: 100,
      fit: true, // 布局完成后适配容器
      padding: 30,
    });

    // 执行布局，并通过 animate() 方法实现平滑动画
    layout.run(); // run() 无参数，仅执行布局计算
    cy.value.animate({
      duration: 500, // 动画时长（毫秒）
      easing: 'ease-out', // 缓动效果（可选）
    });
}

  // =========================
  // 点击节点：显示右侧配置项
  // =========================
  cy.value.on('tap', 'node', (evt) => {
    const node = evt.target.data()
    selectedNode.value = {
      id: node.id,
      label: node.label,
      type: node.type
    }
  })

  // 点击空白区域取消选中
  cy.value.on('tap', (evt) => {
    if (evt.target === cy.value) selectedNode.value = null
  })
  // 
  cy.value.on('drag', 'node', () => {
    cy.value.layout({ name: 'fcose', incremental: true }).run();
  });
  // =========================
  // 右键菜单
  // =========================
  cy.value.contextMenus({
    menuItems: [
      {
        id: 'delete',
        content: '删除节点',
        selector: 'node',
        onClickFunction: (event:EventObject) => {
          event.target.remove()
          selectedNode.value = null
        }
      },
      {
        id: 'addNode',
        content: '添加相邻节点',
        selector: 'node',
        onClickFunction: (event:EventObject) => {
          const parent = event.target
          const newId = 'N' + Math.floor(Math.random() * 10000)

          if(cy.value){
            cy.value.add([
            { data: { id: newId, label: '新节点', type: 'Unknown' } },
            { data: { source: parent.id(), target: newId, label: '关联' } }
          ])
          }
        }
      }
    ]
  })

  // =========================
  // 缩放控件
  // =========================
  cy.value.panzoom({})
})

const updateNodeLabel = () => {
  if (!selectedNode.value || !cy.value) return;
  const node = cy.value.getElementById(selectedNode.value.id);
  node.data('label', selectedNode.value.label);
};

const deleteNode = () => {
  if (!selectedNode.value || !cy.value) return;
  cy.value.getElementById(selectedNode.value.id).remove();
  selectedNode.value = null;
};
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