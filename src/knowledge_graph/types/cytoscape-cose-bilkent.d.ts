declare module 'cytoscape-cose-bilkent' {
  import type { Core, LayoutOptions, Extension } from 'cytoscape';

  // cose-bilkent 布局的配置类型（基于官方 API 整理）
  interface CoseBilkentLayoutOptions extends LayoutOptions {
    name: 'cose-bilkent';
    animate?: boolean; // 是否动画
    animationDuration?: number; // 动画时长（ms）
    animationEasing?: string; // 动画缓动函数
    fit?: boolean; // 布局后适配容器
    padding?: number | { top: number; right: number; bottom: number; left: number }; // 内边距
    boundingBox?: { x1: number; y1: number; x2: number; y2: number }; // 布局边界
    nodeDimensionsIncludeLabels?: boolean; // 节点尺寸是否包含标签
    randomize?: boolean; // 是否随机初始位置
    componentSpacing?: number; // 组件（孤立节点组）间距
    nodeRepulsion?: number | ((node: any) => number); // 节点排斥力
    nodeOverlap?: number; // 节点重叠阈值
    idealEdgeLength?: number | ((edge: any) => number); // 理想边长度
    edgeElasticity?: number | ((edge: any) => number); // 边弹性系数
    nestingFactor?: number; // 嵌套系数（用于层级结构）
    gravity?: number; // 重力系数（拉向中心）
    numIter?: number; // 迭代次数
    initialTemp?: number; // 初始温度（影响布局扩散程度）
    coolingFactor?: number; // 冷却系数（每次迭代温度衰减）
    minTemp?: number; // 最低温度（停止冷却的阈值）
  }

  // 扩展 cytoscape 的布局选项类型，支持 cose-bilkent
  declare module 'cytoscape' {
    interface Layouts {
      'cose-bilkent': CoseBilkentLayoutOptions;
    }
  }

  // 插件导出类型（用于 cytoscape.use()）
  const coseBilkent: Extension;
  export default coseBilkent;
}