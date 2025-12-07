import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import type { KGNode,KGEdge } from '../types/kgData';
import { graphStylesheet } from '../stylesheet/NodeSheet';
import { useKgStore } from '@/stores/kgStore';
cytoscape.use(fcose);

export const generateGraphSnapshot = (nodes:KGNode[],edges:KGEdge[]):Promise<string> => {
  return new Promise((resolve)=>{
    const kgStore = useKgStore();
    const container = document.createElement('div');
    container.style.width = '800px';  // 给定一个足够大的宽
    container.style.height = '600px'; // 给定一个足够大的高
    container.style.position = 'absolute';
    container.style.left = '-9999px'; // 移出屏幕外
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    const cy = cytoscape({
      container: container,
      elements: {
        nodes: nodes,
        edges: edges
      },
      style: graphStylesheet,
      layout: { name:'preset'}
    });
    const layout = cy.layout({
      name:'fcose',
      animate:false,
      randomize:true,
      fit: true,
      nodeRepulsion: kgStore.DEFAULT_CONFIG.nodeRepulsion,
      idealEdgeLength: kgStore.DEFAULT_CONFIG.idealEdgeLength,
      padding:50
    });
    layout.one('layoutstop', () => {
      cy.fit(cy.elements(), 50);
      const base64 = cy.png({
        output: 'base64uri',
        full: false,
        scale: .5,
        bg: '#ffffff'
      });
      cy.destroy();
      document.removeChild(container);
      resolve(base64);
    });
    layout.run();
  })
}