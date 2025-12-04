/**
 * 格式化数据，转换数据为cytoscape需要的数据
 * @param {RawGraphData} rawData  -请求过来的数据  res.data
 * @param {boolean} isFirstInit -是否是第一次初始化
 * @param {Position} fatherPos - 可选
 */

import type { kgnode, kgedge, RawGraphData, KGNode, KGEdge, TransformedData } from '../types/kgData'
import type { Position } from 'cytoscape';
import { getSpiralPos,getNaturalPosition } from '@/utils/posComputed';
export function transformGraphData(rawData:RawGraphData,isFirstInit:boolean = true,fatherPos?:Position):TransformedData {
  // 格式化数据
  const len = rawData.nodes.length;
  const transformedNodes:KGNode[] = rawData.nodes.map((rawNode, index) => {
      const cytoscapeData: kgnode & { id: string } = {
        ...rawNode,
        id: rawNode.id,
      }
      let cytoscapePos:Position;
      if(isFirstInit){
        cytoscapePos = getSpiralPos(index);
      } else if(fatherPos){
        cytoscapePos = getNaturalPosition(fatherPos,len,index)
      }else {
        cytoscapePos = {
          x:0,
          y:0
        }
      }
      return {
        data: cytoscapeData,
        id: rawNode.id,
        group: "nodes",
        position: cytoscapePos
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