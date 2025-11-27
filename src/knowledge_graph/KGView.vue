<template>
  <div class="card w-full flex-1 flex flex-row">
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
              <label for="nodeRepulsion">nodeRepulsion</label>
              <input type="range" id="nodeRepulsion" min="2000" max="5000" value="3000" class="form-range">
              <span class="value-display">3000</span>
            </div>
            <div class="setting-group">
              <label for="idealEdgeLength">idealEdgeLength</label>
              <input type="range" id="idealEdgeLength" min="80" max="150" value="120" class="form-range">
              <span class="value-display">120</span>
            </div>
            <div class="setting-group">
              <label for="edgeElasticity">edgeElasticity</label>
              <input type="range" id="edgeElasticity" min="100" max="300" value="200" class="form-range">
              <span class="value-display">200</span>
            </div>
            <div class="setting-group">
              <label for="gravity">gravity</label>
              <input type="range" id="gravity" min="1" max="5" value="3" class="form-range">
              <span class="value-display">3</span>
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
        <GenerateGraph></GenerateGraph>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="KGView">
  import { ref } from 'vue';
  import './assets/main.css';
  import GenerateGraph from './GenerateGraph.vue';
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
    document.querySelector('body').classList.toggle('dark-mode');
  }
</script>

<style scoped>
  
</style>