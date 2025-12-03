// 工具函数，转换数据为cytoscape需要的数据
import type { kgnode, kgedge, RawGraphData, KGNode, KGEdge, TransformedData } from '../types/kgData'
import type { Position } from 'cytoscape';
export function transformGraphData(rawData:RawGraphData,fatherPos?:Position):TransformedData {
  const transformedNodes:KGNode[] = rawData.nodes.map(rawNode=>{
    const cytoscapeData: kgnode & {id :string } = {
      ...rawNode,
      id:rawNode.id,
    } 
    return {
      data:cytoscapeData,
      id:rawNode.id,
      group: "nodes",
      // 生成节点的位置
      ...(fatherPos ? {
        position: {
          x: fatherPos.x + (Math.random() - 0.5) * 50,
          y: fatherPos.y + (Math.random() - 0.5) * 50
        }
      } : {}),
    } as KGNode;
  });
  const transformedEdges: KGEdge[] = rawData.edges.map((rawEdge, index) => {
    const cytoscapeData: kgedge & { source: string, target: string, id: string } = {
      ...rawEdge,
      source: rawEdge.source_id,
      target: rawEdge.target_id,
      //生成唯一的 ID
      id: `e${index}-${rawEdge.source_id}-${rawEdge.target_id}`,
    };
    return {
      data: cytoscapeData,
      source: rawEdge.source_id,
      target: rawEdge.target_id,
      group: 'edges',
    } as KGEdge; 
  });
  return { nodes:transformedNodes,edges:transformedEdges}
}