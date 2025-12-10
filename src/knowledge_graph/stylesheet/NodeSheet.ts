import { type StylesheetStyle } from 'cytoscape';
const colors = {
  core: '#e11d48',    // 核心: 玫瑰红
  person: '#3b82f6',  // 人物: 蓝色
  concept: '#10b981', // 概念: 绿色
  tool: '#f59e0b',    // 工具: 黄色
  default: '#6b7280'  // 默认: 灰色
};

export const graphStylesheet: StylesheetStyle[] = [
  {
    selector: 'node.darkMode',
    style: {
      'label': 'data(label)',
      'color': '#fff',
      // 默认背景色
      'background-color': colors.default,
      'text-wrap': 'wrap',
      'font-size': 12,
      'font-weight': 'bold',
      'overlay-opacity': 0,
    }
  },
  {
    selector: 'edge.darkMode',
    style: {
      'line-color': '#475569',
      // --- 箭头 ---
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#475569',
      'label': 'data(label)',
      'color': '#fff', 
      // 'text-background-color': '#000',
      'text-outline-color': '#000000',
      'text-outline-width': 2,
      'font-size': 12,
    }
  },
  {
    selector: 'node.darkMode.show-detail',
    style: {
      'label': 'data(detailLabel)',
      'text-valign': 'top',
      'text-halign': 'right',
      'text-margin-x': 5,
      'text-margin-y': -5,
      'text-opacity': 1,
      'color': '#374151',
      'font-size': 12,
      'font-weight': 'normal',
      // 背景设置
      'text-background-color': '#ffffff',
      'text-background-opacity': 1,
      'text-background-shape': 'roundrectangle',
      'text-background-padding': '8',
      // 边框设置
      'text-border-width': 1,
      'text-border-style': 'solid',
      'text-border-color': '#e5e7eb',
      'text-border-opacity': 1,
      'z-index': 1000
    }
  },
  {
    selector: 'node',
    style: {
      'shape': 'ellipse',
      'width': 60,
      'height': 60,
      // 'border-width': 2,
      // 'border-color': '#ffffff',
      // 'border-opacity': 0.8,
      'label': 'data(label)',
      // 新增：默认标签位置在下方，文字颜色为深灰
      'color': '#374151',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-opacity': 1,
      // 文字和节点的间距
      'text-margin-y': 8,
      // 新增：默认背景色
      'background-color': colors.default,
      'text-wrap': 'wrap',
      'font-size': 12,
      'font-weight': 'bold',
      'overlay-opacity': 0,
    }
  },

  // 2. 重点节点样式 (Highlighted)
  {
    selector: 'node[id = "vue_js"], node[id = "react"], node[id = "angular"]',
    style: {
      'background-color': '#e11d48',
      'width': 80,
      'height': 80,
      'font-size': 14,
      'z-index': 10 // 保证大节点在上方
    }
  },
  //边样式 (Edge Style)
  {
    selector: 'edge',
    style: {
      // --- 线条基础 ---
      'width': 2,
      'line-color': '#d1d5db',
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#d1d5db',

      // --- 标签基础 ---
      'label': 'data(label)',
      'font-size': 10,
      'color': '#6b7280',
      'text-rotation': 'autorotate',
      'text-background-color': '#fff',
    }
  },
  {
    selector: 'node.highlight',
    style: {
      // 'border-width': 6,            
      'font-weight': 'bold',
      'font-size': 14,
      'z-index': 100
    }
  },
  {
    selector: 'edge.highlight',
    style: {
      'width': 4,
      'z-index': 999,
      // 线段的文字加粗变色
      'font-weight': 'bold',
      // 'color': '#374151',
      'text-opacity': 1
    }
  },
  {
    selector: 'node.show-detail',
    style: {
      'label': 'data(detailLabel)',
      'text-valign': 'top',
      'text-halign': 'right',
      'text-margin-x': 5,
      'text-margin-y': -5,
      'text-opacity': 1,
      'color': '#374151',
      'font-size': 12,
      'font-weight': 'normal',
      // 背景设置
      'text-background-color': '#ffffff',
      'text-background-opacity': 1,
      'text-background-shape': 'roundrectangle',
      'text-background-padding': '8',
      // 边框设置
      'text-border-width': 1,
      'text-border-style': 'solid',
      'text-border-color': '#e5e7eb',
      'text-border-opacity': 1,
      'z-index': 1000
    }
  },
  // cytoscape面板问题无法呈现(text,target-text)
  // {
  //   selector: 'edge.show-detail',
  //   style: {
  //     // 'color': '#374151',
  //     'width':3
  //   }
  // }
  {
    selector: 'node.darkMode.hide-labels',
    style: {
      'text-opacity': 0,
      'text-outline-opacity': 0,
      'text-background-opacity': 0
    }
  },
  {
    selector: 'node.hide-labels',
    style: {
      'text-opacity': 0,
      'text-outline-opacity': 0,
      'text-background-opacity': 0
    }
  },
];