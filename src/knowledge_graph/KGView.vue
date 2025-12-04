<template>
  <div class="card w-full flex-1 flex-col">
    <div class="w-full flex-1 flex items-center">
      <header id="page-header" class="w-full sticky top-0 px-2 flex items-center justify-between z-20 h-header-height pointer-events-none max-md:hidden  start-0 end-0 thread-xl:absolute thread-xl:start-0 thread-xl:end-0 thread-xl:shadow-none!">
        <div class="flex items-center">
          <button type="button" class="group flex cursor-pointer justify-center items-center gap-1 rounded-lg min-h-9 px-2.5 text-lg hover:bg-token-surface-hover focus-visible:bg-token-surface-hover font-normal whitespace-nowrap focus-visible:outline-none">
            <div class="text-black">Graph KG</div>
          </button>
        </div>
        <div class="flex items-center justify-center">
          about knowledge
        </div>
        <div class="flex items-center justify-center gap-3">
          <div class="flex items-center gap-2">
            <div class="flex items-center">
              <button class="relative text-token-text-primary mx-2 btn btn-ghost">
                <div @click="gotoChat" class="flex w-full items-start justify-center gap-1.5 rounded-full">
                  保存并退出
                </div>
              </button>
              <div class="flex items-center">
                <div class="realtive" type="button">
                  <button class="text-black hover:bg-token-surface-hover keyboard-focus:bg-token-surface-hover flex h-9 w-9 items-center justify-center rounded-lg focus:outline-0">
                    <!-- 跳转svg -->
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="w-full flex-1 flex flex-row">
      <div id="graph-controls" class="flex flex-col justify-between h-[100vh] w-[148px]">
        <div class="flex flex-col">
          <button id="physics-toggle" class="btn">Disable Physics</button>
          <!--  -->
          <button id="physics-settings-toggle" @click="physicsSettingsToggle()" class="btn btn-info">Physcis setting</button>
          <button id="reset-btn" class="btn">reset</button>
          <button id="theme-toggle" @click="toggleTheme()" class="btn btn-theme">Light Mode</button>
          <!--  -->
          <button id="filter-toggle" @click="filterToggle()" class="btn btn-info">Show Filters</button>
          <button id="labels-toggle" class="btn">Hide Labels</button>
          <!--  -->
          <button id="stats-toggle" @click="statsToggle()" class="btn btn-info">Stats</button>
        </div>
      </div>
      <div class="flex flex-col min-w-0 flex-1">
        <div id="stats-container" class="flex-col justify-center ml-[10px] px-[15px] mt-[10px] pb-[10px] border-1 border-solid border-[#ddd] rounded-5" :class="{ hidden:isStatsMenuHidden }">
          <h5 class="flex justify-start">graph Statistics</h5>
          <div class="flex flex-row flex-nowrap gap-[20px]">
            <div class="state-item">
              <i>nodes</i> <span id="nodes-count">-</span>
            </div>
            <div class="state-item">
              <i>edges</i> <span id="edge-count">-</span>
            </div>
            <div class="state-item">
              <i>extracted Edges</i> <span id="stat-extracted">-</span>
            </div>
            <div class="state-item">
              <i>inferred Edges</i> <span id="stat-inferred">-</span>
            </div>
            <div class="state-item">
              <i>communities</i> <span id="communities-count">-</span>
            </div>
          </div>
        </div>
        <div id="physics-settings-container" class="ml-[10px] px-[15px] mt-[10px] pb-[10px] border-1 border-solid border-[#ddd] rounded-5" :class="{ hidden:isPhyscisSettginsMenuHidden }">
          <h5 class="flex justify-start">physcis Settings</h5>
          <div class="flex flex-row flex-wrap gap-[15px]">  
            <div class="min-w-[200px] flex">
              <label for="physics-solver">map solver : </label>
              <span> fCoSE </span>
            </div>
            <div id="fCoSE-settings" class="flex flex-wrap gap-[20px]">
              <div class="setting-group">
                <!--  （节点排斥力） -->
                <label for="nodeRepulsion">nodeRepulsion</label>
                <input type="range" id="nodeRepulsion" min="1000" max="10000" step="100" 
                v-model.number="kgStore.layoutConfig.nodeRepulsion"
                class="form-range">
                <span class="value-display">{{ kgStore.layoutConfig.nodeRepulsion }}</span>
              </div>
              <div class="setting-group">
                <!-- （理想边长度） -->
                <label for="idealEdgeLength">idealEdgeLength</label>
                <input type="range" id="idealEdgeLength" min="30" max="150" 
                v-model.numuber="kgStore.layoutConfig.idealEdgeLength"
                class="form-range">
                <span class="value-display">{{ kgStore.layoutConfig.idealEdgeLength }}</span>
              </div>
              <div class="setting-group">
                <!-- （边弹性系数） -->
                <label for="edgeElasticity">edgeElasticity</label>
                <input type="range" id="edgeElasticity" min="0.1" max="1.0" 
                v-model.numuber="kgStore.layoutConfig.edgeElasticity"
                step="0.01" class="form-range">
                <span class="value-display">{{ kgStore.layoutConfig.edgeElasticity }}</span>
              </div>
              <div class="setting-group">
                <!-- （全局重力） -->
                <label for="gravity">gravity</label>
                <input type="range" id="gravity" min="0.05" max="1.0" 
                v-model.number="kgStore.layoutConfig.gravity"
                step="0.01" class="form-range">
                <span class="value-display">{{ kgStore.layoutConfig.gravity }}</span>
              </div>
              <div class="setting-group">
                <!-- （迭代轮数） -->
                <label for="numIter">numIter</label>
                <input type="range" id="numIter" min="0.05" max="1000" 
                v-model.number="kgStore.layoutConfig.numIter"
                step="10" class="form-range">
                <span class="value-display">{{ kgStore.layoutConfig.numIter }}</span>
              </div>
            </div>
            <div class="mt-[15px]">
              <button class="btn btn-success mr-[6px] hover:bg-[#09693c]">apply Settings</button>
              <button class="btn btn-outline-secondar hover:bg-gray-300">reset</button>
            </div>
          </div>
        </div>
        <div id="filter-menu-container" class="ml-[10px] px-[15px] mt-[10px] pt-[15px]" :class="{ hidden:isFilterMenuHidden }">
          <div class="filter-row flex flex-row gap-[10px] mb-[10px]">
            <select id="select-node" class="form-select min-w-[770px] flex-1">
              <!-- options -->
              <option value="" selected>select a Node by Id</option>
              <option value="" selected>select a Node by Id</option>
              <option value="" selected>select a Node by Id</option>
              <option value="" selected>select a Node by Id</option>
              <option value="" selected>select a Node by Id</option>

            </select>
            <button class="btn btn-primary flex-grow-0 flex-shrink-0 w-[9rem]">reset Selection</button>
          </div>
          <div class="filter-row flex flex-row gap-[10px] mb-[10px]">
            <select id="item-select" class="form-select min-w-[200px] flex-1">
              <!-- options -->
              <option value="">select a NetWork item</option>
            </select>
            <select id="property-select" class="form-select min-w-[200px] flex-1">
              <!-- options -->
              <option value="">select a property</option>
            </select>
            <select id="value-select" class="form-select min-w-[200px] flex-1">
              <!-- options -->
              <option value="">select value</option>
            </select>
            <button class="btn btn-primary w-[9rem] flex-grow-0 flex-shrink-0">Filter</button>
            <button class="btn btn-primary w-[9rem] flex-grow-0 flex-shrink-0">Reset Selection</button>
          </div>
        </div>
        <div id="my-network" class="card-body">
          <GenerateGraph
            :nodes="transformedGraphData.nodes"
            :edges="transformedGraphData.edges"
            :is-interactive="true"
            ref="graphRef"
          ></GenerateGraph>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts" name="KGView">
  import { computed, ref } from 'vue';
  import './assets/main.css';
  import GenerateGraph from './GenerateGraph.vue';
  // 转换数据
  import { transformGraphData } from './utils/transform';
  // 引入kg控制存储
  import { useKgStore } from '@/stores/kgStore';
  // import { handleSaveAndExit } from './GenerateGraph.vue';
  const kgStore = useKgStore();
  const isStatsMenuHidden = ref(true);
  const isPhyscisSettginsMenuHidden = ref(true);
  const isFilterMenuHidden = ref(true);
  function filterToggle(){
    isFilterMenuHidden.value = !isFilterMenuHidden.value
  } 
  function physicsSettingsToggle(){
    isPhyscisSettginsMenuHidden.value = !isPhyscisSettginsMenuHidden.value;
  }
  function statsToggle(){
    isStatsMenuHidden.value = !isStatsMenuHidden.value
  }
  function toggleTheme(){
    // $('body').toggleClass('dark-mode');
    document.querySelector('body')?.classList.toggle('dark-mode');
  }
  const graphRef = ref<InstanceType<typeof GenerateGraph> | null>(null);
  async function gotoChat(){
    kgStore.hideKG();
    if(graphRef.value){
      graphRef.value.handleSaveAndExit();
    }else{
      console.warn('图谱实例未加载，无法保存-KGView');
    }
  }
  const myGraphData = ref({
      "nodes": [
      {
        "id": "vue_js",
        "label": "Vue.js",
        "wiki": "https://baike.baidu.com/item/Vue.js"
      },
      {
        "id": "javascript",
        "label": "JavaScript",
        "wiki": "https://baike.baidu.com/item/JavaScript"
      },
      {
        "id": "frontend_framework",
        "label": "前端框架",
        "wiki": "https://baike.baidu.com/item/前端框架"
      },
      {
        "id": "evan_you",
        "label": "尤雨溪",
        "wiki": "https://baike.baidu.com/item/尤雨溪"
      },
      {
        "id": "single_page_application",
        "label": "单页应用",
        "wiki": "https://baike.baidu.com/item/单页应用"
      },
      {
        "id": "component",
        "label": "组件",
        "wiki": "https://baike.baidu.com/item/组件"
      },
      {
        "id": "virtual_dom",
        "label": "虚拟DOM",
        "wiki": "https://baike.baidu.com/item/虚拟DOM"
      },
      {
        "id": "react",
        "label": "React",
        "wiki": "https://baike.baidu.com/item/React"
      },
      {
        "id": "angular",
        "label": "Angular",
        "wiki": "https://baike.baidu.com/item/Angular"
      },
      {
        "id": "progressive_framework",
        "label": "渐进式框架",
        "wiki": "https://baike.baidu.com/item/渐进式框架"
      }
    ],
      "edges": [
        {
          "source_id": "vue_js",
          "target_id": "javascript",
          "label": "基于"
        },
        {
          "source_id": "vue_js",
          "target_id": "frontend_framework",
          "label": "属于"
        },
        {
          "source_id": "vue_js",
          "target_id": "evan_you",
          "label": "由...创建"
        },
        {
          "source_id": "vue_js",
          "target_id": "single_page_application",
          "label": "适用于"
        },
        {
          "source_id": "vue_js",
          "target_id": "component",
          "label": "采用"
        },
        {
          "source_id": "vue_js",
          "target_id": "virtual_dom",
          "label": "使用"
        },
        {
          "source_id": "vue_js",
          "target_id": "react",
          "label": "类似"
        },
        {
          "source_id": "vue_js",
          "target_id": "angular",
          "label": "类似"
        },
        {
          "source_id": "vue_js",
          "target_id": "progressive_framework",
          "label": "是"
        }
      ]
  })
  const transformedGraphData = computed(()=>{
    return transformGraphData(myGraphData.value);
  })

</script>

<style scoped>
  
</style>