// src/global.d.ts
declare interface Window {
  // 扩展 Window 接口，添加 $ 和 jQuery 属性，类型匹配 jQuery
  $: typeof import('jquery');
  jQuery: typeof import('jquery');
}

// 可选：如果想在全局作用域直接用 $（不用写 window.$），再补充全局变量声明
declare const $: typeof import('jquery');
declare const jQuery: typeof import('jquery');

export { };

// cytoscape
import type cytoscape from 'cytoscape';
// cytoscape-context-menus
import type contextMenus from 'cytoscape-context-menus';
// cytoscape-panzoom
import type panzoom from 'cytoscape-panzoom';
// cytoscape-cose-bilkent
// declare module 'cytoscape-cose-bilkent';
declare module 'cytoscape-cose-bilkent' {
  // 声明插件为 Cytoscape 扩展类型
  const coseBilkent: cytoscape.Ext;
  export default coseBilkent;
}

declare module 'cytoscape-fcose';

declare module 'cytoscape' {
  interface BaseLayoutOptions {
    // 为 cose-bilkent 布局添加特有属性
    nodeRepulsion?: number;
    idealEdgeLength?: number;
    padding?: number;
    fit?: boolean; // 补充 fit 属性的类型定义
    // fcose
  }
  interface Core {
    contextMenus: (options: contextMenus.ContextMenuOptions) => void;
    panzoom: (options: panzoom.PanZoomOptions) => void;
  }
}
// 收到声明sucrase
declare module 'sucrase';
declare module '@rollup/plugin-sucrase';
