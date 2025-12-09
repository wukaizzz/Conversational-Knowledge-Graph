<template>
  <div ref="card" class="card w-full flex-1 flex-col">
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
          <button ref="physics_toggle" class="btn">Disable Physics</button>
          <!--  -->
          <button ref="physics_settings_toggle" @click="physicsSettingsToggle()" class="btn btn-info">Physcis setting</button>
          <button ref="reset_btn" @click="resetView()" class="btn">resize</button>
          <button ref="theme_toggle" @click="isLightMode = !isLightMode" class="btn btn-theme">Dark Mode</button>
          <!--  -->
          <button ref="filter_toggle" @click="filterToggle()" class="btn btn-info">Show Filters</button>
          <button ref="labels_toggle" @click="isLabelHidden = !isLabelHidden" class="btn">Hide Labels</button>
          <!--  -->
          <button ref="stats_toggle" @click="statsToggle()" class="btn btn-info">Stats</button>
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
              <!-- 节点之间相互排斥的力度大小 -->
              <NumberSlider
              id="nodeRepulsion"
              :modelValue="kgStore.layoutConfig.nodeRepulsion"
              @update:modelValue="(newValue) => kgStore.layoutConfig.nodeRepulsion = newValue"
              :min="1000"
              :max="10000"
              :step="1"
              :updateNow="false"
              ></NumberSlider>
              <!-- （理想边长度） -->
              <NumberSlider
              id="idealEdgeLength"
              v-model="kgStore.layoutConfig.idealEdgeLength"
              :min="30"
              :max="150"
              :step="1"
              :updateNow="true"
              >
              </NumberSlider>
              <!-- （边弹性系数） -->
              <NumberSlider
              id="edgeElasticity"
              v-model="kgStore.layoutConfig.edgeElasticity"
              :min="0.1"
              :max="1.0"
              :step="0.01"
              :updateNow="true"
              >
              </NumberSlider>
              <!-- （全局重力） --> 
              <NumberSlider
              id="gravity"
              v-model="kgStore.layoutConfig.gravity"
              :min="0.05"
              :max="1.0"
              :step="0.01"
              :updateNow="true"
              >              
              </NumberSlider>
              <!-- （迭代轮数） -->
              <NumberSlider
              id="numIter"
              v-model="kgStore.layoutConfig.numIter"
              :min="200"
              :max="1000"
              :step="1"
              :updateNow="true"
              >
              </NumberSlider>
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
        <div id="my-network" class="card-body flex-1 min-h-0 w-full h-full">
          <div class="absolute inset-0 w-full h-hull">
            <GenerateGraph
            v-if="kgStore.currentGraphData.nodes.length > 0 "
            :nodes="kgStore.currentGraphData.nodes"
            :edges="kgStore.currentGraphData.edges"
            :is-interactive="true"
            :is-label-hidden="isLabelHidden"
            :is-light-mode="isLightMode"
            ref="graphRef"
            ></GenerateGraph>
            <div v-else class="flex items-center justify-center h-full text-gray-400">
            请求中，请稍等。。。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts" name="KGView">
  import { computed, ref, watch } from 'vue';
  import './assets/main.css';
  import GenerateGraph from './GenerateGraph.vue';
  import NumberSlider from './NumberSlider.vue';
  // 引入kg控制存储
  import { useKgStore } from '@/stores/kgStore';
  const kgStore = useKgStore();
  // 节点
  const card = ref<HTMLElement | null>(null);
  const physics_toggle = ref<HTMLElement | null>(null);
  const physics_settings_toggle = ref<HTMLElement | null>(null);
  const reset_btn = ref<HTMLElement | null>(null);
  const theme_toggle = ref<HTMLElement | null>(null);
  const filter_toggle = ref<HTMLElement | null>(null);
  const labels_toggle = ref<HTMLElement | null>(null);
  const stats_toggle = ref<HTMLElement | null>(null);
  //状态
  const isStatsMenuHidden = ref(true);
  const isPhyscisSettginsMenuHidden = ref(true);
  const isFilterMenuHidden = ref(true);
  const isLabelHidden = ref(false);
  const isLightMode = ref(true);
  function filterToggle(){
    isFilterMenuHidden.value = !isFilterMenuHidden.value
  } 
  function physicsSettingsToggle(){
    isPhyscisSettginsMenuHidden.value = !isPhyscisSettginsMenuHidden.value;
  }
  function statsToggle(){
    isStatsMenuHidden.value = !isStatsMenuHidden.value
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
  function resetView(){
    if(!graphRef.value){
      console.log('图谱实例未加载');
      return;
    }
    graphRef.value.handleResetView();
    console.log('重置视图');
  }
  watch(
    ()=>isLightMode.value,
    (value)=>{
      if(theme_toggle.value){
        if(value){
          if(card.value){
            card.value.style.backgroundColor = '#fff';
          }
          theme_toggle.value.textContent = 'Dark Mode'
        }else{
          if(card.value){
            card.value.style.backgroundColor = '#000';
          }
          theme_toggle.value.textContent = 'Light Mode'
        }
      }
    }
  )
  watch(
    ()=>isLabelHidden.value,
    (value)=>{
      if(labels_toggle.value){
        if(value){
          labels_toggle.value.textContent = 'Show labels'
        }else{
          labels_toggle.value.textContent = 'Hide labels'
        }
      }
    }
  )
</script>

<style scoped>
  
</style>