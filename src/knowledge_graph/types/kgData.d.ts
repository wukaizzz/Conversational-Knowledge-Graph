import { type NodeDefinition, type EdgeDefinition } from 'cytoscape'
export interface kgnode {
  id: string
  label: string
  wiki: string
}
export interface kgedge {
  source: string
  target: string
  label:string
}
export interface RawGraphData {
  nodes: kgnode[]
  edges: kgedge[]
}
export type KGNode = NodeDefinition & {
  data: kgnode;
};
export type KGEdge = EdgeDefinition & {
  data: kgedge;
}
export interface TransformedData {
  nodes: KGNode[],
  edges: KGEdge[]
}
