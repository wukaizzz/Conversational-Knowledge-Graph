export interface kgnode {
  id: string,
  label: string,
  wiki: string
}

export interface kgedge {
  source_id: string,
  target_id: string,
  label:string
}

// const data = {
//   "code": 200,
//     "message": "知识图谱生成成功",
//       "data": {
//     "nodes": [
//       {
//         "id": "vue_js",
//         "label": "Vue.js",
//         "wiki": "https://baike.baidu.com/item/Vue.js"
//       },
//       {
//         "id": "javascript",
//         "label": "JavaScript",
//         "wiki": "https://baike.baidu.com/item/JavaScript"
//       },
//       {
//         "id": "frontend_framework",
//         "label": "前端框架",
//         "wiki": "https://baike.baidu.com/item/前端框架"
//       },
//       {
//         "id": "evan_you",
//         "label": "尤雨溪",
//         "wiki": "https://baike.baidu.com/item/尤雨溪"
//       },
//       {
//         "id": "single_page_application",
//         "label": "单页应用",
//         "wiki": "https://baike.baidu.com/item/单页应用"
//       },
//       {
//         "id": "component",
//         "label": "组件",
//         "wiki": "https://baike.baidu.com/item/组件"
//       },
//       {
//         "id": "virtual_dom",
//         "label": "虚拟DOM",
//         "wiki": "https://baike.baidu.com/item/虚拟DOM"
//       },
//       {
//         "id": "react",
//         "label": "React",
//         "wiki": "https://baike.baidu.com/item/React"
//       },
//       {
//         "id": "angular",
//         "label": "Angular",
//         "wiki": "https://baike.baidu.com/item/Angular"
//       },
//       {
//         "id": "progressive_framework",
//         "label": "渐进式框架",
//         "wiki": "https://baike.baidu.com/item/渐进式框架"
//       }
//     ],
//       "relations": [
//         {
//           "source_id": "vue_js",
//           "target_id": "javascript",
//           "label": "基于"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "frontend_framework",
//           "label": "属于"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "evan_you",
//           "label": "由...创建"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "single_page_application",
//           "label": "适用于"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "component",
//           "label": "采用"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "virtual_dom",
//           "label": "使用"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "react",
//           "label": "类似"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "angular",
//           "label": "类似"
//         },
//         {
//           "source_id": "vue_js",
//           "target_id": "progressive_framework",
//           "label": "是"
//         }
//       ]
//   }
// }