// 单独的配置文件中注册插件，避免重新挂载造成Cytoscape 全局污染
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import coseBilkent from 'cytoscape-cose-bilkent'; // 布局插件
import panzoom from 'cytoscape-panzoom';
import contextMenus from 'cytoscape-context-menus';

// CSS 样式也在这里引入
import 'cytoscape-panzoom/cytoscape.js-panzoom.css';
import 'cytoscape-context-menus/cytoscape-context-menus.css';

// 注册插件 (只执行一次)
cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(panzoom);
cytoscape.use(contextMenus);

console.log('Cytoscape extensions registered globally.');

export default cytoscape;