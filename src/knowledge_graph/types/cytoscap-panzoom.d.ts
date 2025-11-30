// 声明 cytoscape-panzoom（平移缩放插件）
declare module 'cytoscape-panzoom' {
  import type { Core, Extension, Options } from 'cytoscape';

  // panzoom 插件的配置类型（基于官方 API 整理）
  interface PanzoomOptions extends Options {
    zoomFactor?: number; // 每次缩放系数（默认 0.1）
    zoomDelay?: number; // 缩放延迟（ms，默认 45）
    minZoom?: number; // 最小缩放比例（默认 0.1）
    maxZoom?: number; // 最大缩放比例（默认 10）
    fitPadding?: number; // fit 时的内边距（默认 50）
    panSpeed?: number; // 平移速度（默认 10）
    panDistance?: number; // 每次平移距离（默认 10）
    panDragAreaSize?: number; // 拖拽平移的触发区域大小（默认 50）
    panMinPercentZoom?: number; // 允许平移的最小缩放比例（默认 0.25）
    panInactiveArea?: number; // 平移无效区域（默认 8）
    panIndicatorHeight?: number; // 平移指示器高度（默认 20）
    panIndicatorWidth?: number; // 平移指示器宽度（默认 20）
    panIndicatorStyle?: { [key: string]: any }; // 平移指示器样式
    zoomIndicatorStyle?: { [key: string]: any }; // 缩放指示器样式
    zoomWheelSensitivity?: number; // 鼠标滚轮灵敏度（默认 1）
    zoomInButton?: HTMLElement | null; // 自定义放大按钮
    zoomOutButton?: HTMLElement | null; // 自定义缩小按钮
    resetButton?: HTMLElement | null; // 自定义重置按钮
    resetToDefault?: boolean; // 重置时是否恢复默认缩放和平移（默认 true）
    fitButton?: HTMLElement | null; // 自定义 fit 按钮
    updateOnFit?: boolean; // fit 后是否更新指示器（默认 true）
    disablePan?: boolean; // 是否禁用平移（默认 false）
    disableZoom?: boolean; // 是否禁用缩放（默认 false）
    disableReset?: boolean; // 是否禁用重置（默认 false）
    disableFit?: boolean; // 是否禁用 fit（默认 false）
    animateOnFit?: boolean; // fit 时是否动画（默认 true）
    fitAnimationDuration?: number; // fit 动画时长（ms，默认 500）
  }

  // 扩展 cytoscape.Core 接口，添加 panzoom 方法
  interface Core {
    panzoom: (options?: PanzoomOptions) => {
      destroy: () => void; // 销毁插件
      reset: () => void; // 重置平移缩放
      fit: () => void; // 适配容器
      zoomIn: () => void; // 放大
      zoomOut: () => void; // 缩小
    };
  }

  // 插件导出类型（用于 cytoscape.use()）
  const panzoom: Extension;
  export default panzoom;
}