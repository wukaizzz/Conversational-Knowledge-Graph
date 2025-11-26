// src/types/fcose-layout.d.ts
import type cytoscape from 'cytoscape';

/**
 * fcose 布局参数类型定义
 * 基于官方文档 + 优化后的常用配置，补充完整类型约束
 */
export interface FcoseLayoutOptions extends cytoscape.BaseLayoutOptions {
  /** 布局名称（固定为 'fcose'） */
  name: 'fcose';

  /** 是否开启增量布局（拖拽节点后联动调整，核心参数） */
  incremental?: boolean;

  /** 节点排斥力（数值越小，节点越不容易弹开，建议 1500-2500） */
  nodeRepulsion?: number;

  /** 理想边长度（数值越大，节点间距越宽松，建议 100-150） */
  idealEdgeLength?: number;

  /** 全局引力（数值越大，节点越容易聚拢，建议 0.2-0.5） */
  gravity?: number;

  /** 布局迭代次数（数值越小，拖拽后稳定越快，建议 30-80） */
  numIter?: number;

  /** 是否启用动画（禁用后拖拽无惯性，建议 false） */
  animate?: boolean;

  /** 动画时长（单位：ms，设为 0 无延迟，建议 0） */
  animationDuration?: number;

  /** 是否自动适配画布大小（建议 true） */
  fit?: boolean;

  /** 画布内边距（单位：px，避免节点贴边，建议 20-50） */
  padding?: number;

  /** 节点间最小距离（单位：px，防止节点重叠，默认 10） */
  nodeDistance?: number;

  /** 边弹性系数（数值越大，边越“紧绷”，默认 0.4） */
  edgeElasticity?: number;

  /** 是否随机初始位置（建议 false，避免布局混乱） */
  randomize?: boolean;

  /** 是否允许节点重叠（建议 false） */
  allowOverlap?: boolean;

  /** 布局完成后是否保持节点位置（建议 true） */
  preserveLayout?: boolean;
}

// 扩展 Cytoscape 核心类型，让 TS 识别 fcose 布局参数
declare module 'cytoscape' {
  interface Core {
    /** 重载 layout 方法，支持 fcose 布局参数 */
    layout(options: FcoseLayoutOptions): Layout;
  }

  /** 扩展布局选项，合并 fcose 特有参数 */
  interface BaseLayoutOptions extends Partial<FcoseLayoutOptions> { }
}