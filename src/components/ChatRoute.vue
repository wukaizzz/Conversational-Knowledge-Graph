<template>
  <div>
    <RouterLink 
      :to="``"
      custom
      v-slot="{ navigate,href,isActive}"
    >
      <a 
        :href="href" 
        @click="navigate"
        
      tabindex="0" class="group menu-item" draggable="true" data-discover="true">
      <div class="flex min-w-0 grow items-center gap-2.5">
        <div class="truncate">
          <span class dir="auto">毛概</span>
        </div>
      </div>
      <div class="trailing-pair">
        <div class="trailing highlight text-[var(--text-tertiary)]">
          <button tabindex="0" class="menu-item-trailing-btn">
            <div>
              <ChatRouteMore></ChatRouteMore>
            </div>
          </button>
        </div>
        <div class="trailing text-[var(--text-tertiary)]" tabindex="-1"></div>
      </div>
      </a>
    </RouterLink>
  </div>
</template>

<script setup lang="ts" name="ChatRoute">
  import { RouterLink } from 'vue-router';
  import ChatRouteMore from '../.././public/assets/ChatRouteMore.vue';

  defineProps({
    id: [String, Number],
    title: String
  });
</script>

<style scoped>
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    min-height: var(--menu-item-height);
    padding-block: calc(var(--spacing) * 1.5);
    padding-inline: calc(var(--spacing) * 2.5);
    /* height: 24px;
    margin: 0 6px;
    padding: 6px 10px;   */
    cursor: pointer;
    background: var(--menu-item-highlighted);
  }
  .menu-item:active {
    background: var(--menu-item-active);
  }
  .menu-item .trailing-pair {
    display: inline-grid;
    align-self: stretch;
    grid-template-columns: max-content;
    place-items: center end;
  }
  .menu-item .trailing-pair > * {
    align-items: center;
    align-self: stretch;
    display: flex;
    grid-column-start: 1;
    grid-row-start: 1;
  }
  .menu-item .trailing {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
  }
  .menu-item[data-fill] .trailing.highlight {
    border-width: 0;
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    min-width: unset;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .menu-item-trailing-btn {
      border-end-end-radius: 10px;
      border-start-end-radius: 10px;
      isolation: isolate;
      margin-block: calc(var(--spacing)*-2);
      margin-inline-end: calc(var(--spacing)*-2.5);
      margin-inline-start: calc(var(--spacing)*-1);
      padding-inline-end: calc(var(--spacing)*1.5);
      padding-inline-start: calc(var(--spacing)*1);
  }
  .menu-item-trailing-btn, .menu-item-trailing-lnk {
    align-items: center;
    align-self: stretch;
    display: flex;
    isolation: isolate;
    min-height: calc(var(--spacing)*9);
    position: relative;
    color:var(--text-primary);
    pointer-events: auto;
}
</style>