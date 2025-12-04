/**
 * 计算向日葵螺旋位置
 * @param {number} index - 当前是第几个节点
 * @param {number} [total] - 总节点数（可选，用于计算整体缩放）
 * @param {Position} [center={x: 400, y: 300}] - 中心点 {x, y}
 * @returns {Position} 螺旋布局的坐标（包含x/y的Position对象）
 */
import type { Position } from "cytoscape";
export function getSpiralPos(index:number,center:Position = {x:400,y:300}):Position{
  // 间距系数
  const scaling = 60;
  // 黄金角度
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  console.log(goldenAngle)
  // 半径
  const r = scaling * Math.sqrt(index);
  // 角度
  const theta = index * goldenAngle;
  return {
    x:center.x + r * Math.cos(theta),
    y:center.y + r * Math.sin(theta)
  }
}

/**
 * 生成带有物理噪点的自然分布坐标
 * @param {object} center - 父节点位置 {x, y}
 * @param {number} count - 新节点数量
 * @param {number} index -当前第几个节点（下标） 
 * @returns {Position} 
 */
export const getNaturalPosition = (center:Position, count:number,index:number):Position => {

  // 建议设置为 idealEdgeLength 的 1.5 倍左右，给物理引擎留出回弹空间
  const baseRadius = 80;
  // 角度步长
  const angleStep = (2 * Math.PI) / count;
  console.log(angleStep)
    // --- 关键算法：引入随机噪点 --
    // -
    // 1. 角度抖动：在标准角度基础上，左右随机偏移 ±15度 (约0.26弧度)
    // 这样节点就不会死板地排成正多边形
    const angleJitter = (Math.random() - 0.5) * 0.6;
    const currentAngle = (index * angleStep) + angleJitter;
    // 2. 半径抖动：在基础半径上，随机增减 20px
    // 有的远，有的近，模仿物理弹簧的不均匀性
    const radiusJitter = (Math.random() - 0.5) * 40;
    const r = baseRadius + radiusJitter;

    const initialX = center.x + r * Math.cos(currentAngle);
    const initialY = center.y + r * Math.sin(currentAngle);
    return {
      x: initialX,
      y: initialY
    }
};