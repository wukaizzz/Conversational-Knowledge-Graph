import { type StylesheetStyle } from 'cytoscape';
const colors = {
  core: '#e11d48',    // 核心: 玫瑰红
  person: '#3b82f6',  // 人物: 蓝色
  concept: '#10b981', // 概念: 绿色
  tool: '#f59e0b',    // 工具: 黄色
  default: '#6b7280'  // 默认: 灰色
};
export type CustomStylesheetStyle = StylesheetStyle | {
  selector: 'core';
  style: {
    'active-bg-opacity'?: number;
    'active-bg-size'?: number;
    'selection-box-opacity'?: number;
    'selection-box-border-width'?: number;
  };
};
export const graphStylesheet: StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      'shape': 'ellipse',
      'width': 60,
      'height': 60,
      'border-width': 2,
      'border-color': '#ffffff',
      'border-opacity': 0.8,
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
  // 或者根据度数/重要性设置样式（如果数据里有 type 字段）
  {
    selector: 'node[type = "root"]',
    style: {
      'background-color': '#e11d48',
      'width': 90,
      'height': 90,
      'font-size': 16
    }
  },
  // 3. 边样式 (Edge Style)
  {
    selector: 'edge',
    style: {
      // --- 线条 ---
      'width': 2,
      'line-color': '#d1d5db',       // 浅灰色 (Tailwind gray-300)
      'curve-style': 'bezier',       // 贝塞尔曲线 (更美观)
      // --- 箭头 ---
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#d1d5db',

      // --- 边上的文字 ---
      'label': 'data(label)',
      'font-size': 10,
      'color': '#6b7280',   
      'text-background-opacity': 1,  
      'text-background-color': '#ffffff',
      'text-rotation': 'autorotate', 
      'overlay-opacity': 0,
    }
  },

  // 交互样式 (Interaction)
  {
    selector: 'node:selected', // 选中状态
    style: {
      'border-width': 4,
      'border-color': '#3b82f6', // 蓝色描边
      'background-color': '#2563eb'
    }
  },
  {
    selector: 'edge:selected',
    style: {
      'width': 4,
      'line-color': '#3b82f6',
      'target-arrow-color': '#3b82f6'
    }
  },
  {
    selector: 'node.highlight',
    style: {
      'border-width': 6,            
      'font-weight': 'bold',
      'font-size': 14,
      'z-index': 9999 
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
    selector: 'node.hide-labels',
    style: {
      'text-opacity': 0, // 隐藏文字
    }
  },
  {
    selector: 'node.show-detail',
    style: {
      // 对应的标签文本
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
      'text-background-shape': 'roundrectangle', // 圆角矩形
      'text-background-padding': '8', 
      // 边框设置
      'text-border-width': 1, 
      'text-border-style': 'solid',
      'text-border-color': '#e5e7eb', 
      'text-border-opacity': 1,
      'z-index': 10000
    }
  }
];