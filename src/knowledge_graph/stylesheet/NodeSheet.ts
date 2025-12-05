import { type StylesheetStyle } from 'cytoscape'
export const graphStylesheet: StylesheetStyle[] = [
  // 1. 默认节点样式 (作为基础)
  {
    selector: 'node',
    style: {
      'shape': 'ellipse',
      'background-color': '#666',
      'label': 'data(label)', // 将节点的 label 属性显示为文字
      'color': '#fff',         // 文字颜色
      'text-valign': 'center',  // 文字垂直居中
      'font-size': '12px',
      'text-outline-width': 2,
      'text-outline-color': '#666', // 给文字加个描边，增强可读性
      'transition-property': 'background-color, border-width',
      'transition-duration': .2
    }
  },

  // 2. 根据 `nodeType` 自定义节点样式
  {
    selector: "node[nodeType = 'person']", // 选择所有 nodeType 为 'person' 的节点
    style: {
      'shape': 'rectangle',
      'background-color': '#4A90E2', // 蓝色
      'text-outline-color': '#4A90E2',
      'background-image': 'data(imageUrl)', // 使用 imageUrl 数据作为背景图
      'background-fit': 'cover', // 图片填充方式
      'border-color': '#FFF',
      'border-width': 2, // 添加白色边框
    }
  },
  {
    selector: "node[nodeType = 'project']",
    style: {
      'shape': 'round-hexagon', // 圆角六边形
      'background-color': '#50E3C2', // 绿色
      'text-outline-color': '#50E3C2',
    }
  },
  {
    selector: "node[nodeType = 'skill']",
    style: {
      'shape': 'star', // 星形
      'background-color': '#F5A623', // 橙色
      'text-outline-color': '#F5A623',
    }
  },

  // 3. 根据 `importance` 动态映射节点大小
  {
    selector: "node[importance]", // 选择所有带 importance 属性的节点
    style: {
      // mapData(属性名, 最小值, 最大值, 映射开始值, 映射结束值)
      'width': 'mapData(importance, 0, 10, 30, 60)', // importance 从0-10映射到宽度30-60
      'height': 'mapData(importance, 0, 10, 30, 60)',
    }
  },

  // 4. 默认边样式
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)', // 显示边的标签
      'font-size': '10px',
      'color': '#555',
      'text-rotation': 'autorotate',
    }
  },

  // 5. 根据 `relationType` 自定义边样式
  {
    selector: "edge[relationType = 'works_on']",
    style: {
      'line-color': '#4A90E2',
      'target-arrow-color': '#4A90E2',
    }
  },
  {
    selector: "edge[relationType = 'uses_skill']",
    style: {
      'line-color': '#F5A623',
      'target-arrow-color': '#F5A623',
      'line-style': 'dashed', // 虚线
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': '#E91E63',
      'text-outline-color': '#E91E63',
      'border-width': 4,
      'border-color': '#FFF'
    }
  }
];