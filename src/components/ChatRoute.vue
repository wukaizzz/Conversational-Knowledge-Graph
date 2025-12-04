<template>
  <div id="chat-route" class="menu-item mx-[6px] py-[6px] px-[10px]">
    <a v-if="isExternalLink" v-bind="$attrs" :href="externalHref" target="_blank">
    <slot />
    </a>
   <RouterLink
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
    >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[isActive ? activeClass : inactiveClass]"  
      tabindex="0" class="group menu-item" draggable="true" data-discover="true"
    >
      <div class="flex min-w-0 grow items-center gap-2.5">
        <div class="truncate">
          <span dir="auto">
            <slot></slot>
          </span>
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
      <slot />
    </a>
   </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink,type RouterLinkProps } from 'vue-router'
import ChatRouteMore from './icons/ChatRouteMore.vue';

defineOptions({
  inheritAttrs: false,
  name: 'Applink'
})

const props = defineProps<RouterLinkProps & {
  inactiveClass?: string
  linkClass?: string
}>()

const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

const isExternalLink = computed(() => {
  return isString(props.to) && (props.to.startsWith('http://') || props.to.startsWith('https://'))
})
// 是外链的情况下
const externalHref = computed(() => {
  if (isExternalLink.value) {
    // 类型断言：明确告诉 TS 此时 props.to 是字符串
    return props.to as string
  }
  return '' // 非外部链接时返回空字符串（避免 undefined 警告）
})

</script>

<style scoped lang="css">
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm-line-height));
    min-height: var(--menu-item-height);
    padding-block: calc(var(--spacing) * 1.5);
    padding-inline: calc(var(--spacing) * 2.5);
    cursor: pointer;
    background: var(--menu-item-highlighted);
  }
  .menu-item:active {
    background: var(--menu-item-active);
  }
  .menu-item:hover {
    cursor: pointer;
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
  .dark .menu-item {
    --menu-item-highlighted: var(--interactive-bg-secondary-hover);
    --menu-item-active: var(--interactive-bg-secondary-press);
    --menu-item-open: var(--interactive-bg-secondary-press);
    color: #fff;
  }
  /* .menu-item:not(:disabled):not([data-disabled]):not([data-no-hover-bg]):active:not(:has([data-trailing-button]:hover)), .menu-item:not(:disabled):not([data-disabled]):not([data-no-hover-bg])[data-active] {
    background-color: var(--menu-item-active);
  } 
  */
  #chat-route {
    font-size: var(--text-sm);
  }
</style>