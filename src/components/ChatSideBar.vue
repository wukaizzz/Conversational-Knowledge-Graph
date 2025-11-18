<template>
  <div id="SideBar" class="relative overflow-hidden h-full" style="width:var(--sidebar-width);background-color: var(--bg-elevated-secondary);">
    <div class="relative flex h-full flex-col">
      <div id="SideBar-tiny-bar" v-show="false">
      </div>
      <div class="h-full overflow-x-clip overflow-y-auto text-clip whitespace-nowrap opacity-100 w-[var(--sidebar-width)]">
        <h2 style="position:absolute;border:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;word-wrap:normal">历史聊天记录</h2>
        <nav class="relative flex h-full w-full flex-1 flex-col overflow-y-auto transition-opacity duration-500">
          <div class="top-0 z-30 sticky">
            <div class="px-2">
              <div id="SideBarHeader" class="h-header-height flex items-center justify-between">
                <a href="/" class="flex h-9 w-9 items-center justify-center rounded-lg focus:outline-none keyboard-focused:bg-token-surface-hover hover:bg-token-surface-hover text-token-text-primary no-draggable">
                  <TheMainIcon></TheMainIcon>
                </a>
                <div class="flex">
                  <button class="flex w-9 h-9 items-center justify-center rounded-lg focus:outline-none disabled:opacity-50 cursor-w-resize rtl:cursor-e-resize keyboard-focused:bg-token-surface-hover hover:bg-token-surface-hover text-token-text-primary no-draggable">
                    <SideBarControl></SideBarControl>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside class="pt-[var(--sidebar-section-first-margin-top)] last:mb-5 tall:sticky tall:z-20 relative [--sticky-spacer:6px]">
            <a href="/" class="group menu-item" tabindex="0">
              <div class="flex min-w-0 items-center gap-1.5">
                  <div class="flex items-center justify-center icon group-disabled:opacity-50">
                    <NewChat></NewChat>
                  </div>
                  <div class="flex min-w-0 items-center gap-2.5 grow">
                    <div class="truncate">新聊天</div>
                  </div>
              </div>
            </a>
            <div tabindex="0" class="group menu-item">
              <div class="flex min-w-0 items-center gap-1.5">
                  <div class="flex items-center justify-center icon group-disabled:opacity-50">
                    <FindChat></FindChat>
                  </div>
                  <div class="flex min-w-0 items-center gap-2.5 grow">
                    <div class="truncate">搜索聊天</div>
                  </div>
              </div>
            </div>
            <a tabindex="0" class="group menu-item">
              <div class="flex min-w-0 items-center gap-1.5">
                  <div class="flex items-center justify-center icon group-disabled:opacity-50">
                    <PictureBuckets></PictureBuckets>
                  </div>
                  <div class="flex min-w-0 items-center gap-2.5 grow">
                    <div class="truncate">图库</div>
                  </div>
              </div>
            </a>
          </aside>
          <div class="pb-[calc(var(--sidebar-section-margin-top) - var(--sidebar-section-first-margin-top))]">
            <div tabindex="0" class="group menu-item gap-1.5">
              <div class="flex items-center justify-center icon group-disabled:opacity-50">
                <FilesCreate></FilesCreate>
              </div>
              <div class="flex min-w-0 items-center gap-2.5 grow">
                <div class="truncate">文件夹</div>
              </div>
            </div>
          </div>
          <div class=" group/sidebar-expando-section mb-[var(--sidebar-expanded-section-margin-bottom)]">
            <div tabindex="0" class="group menu-item" data-no-hover-bg="true" data-no-content-gap="true">
              <div class="flex w-full items-center justify-start gap-0.5"> 
                <h2>聊天</h2>
                <DropDown></DropDown>
              </div>
            </div>
            <div id="history">
              <!-- route -->
            </div>
          </div>
          <div class="grow"></div>
          <div class="sticky bottom-0 z-30 empty:hidden bg-[var(--bg-elevated-secondary)]">
            <div class="relative">
              <div class>
                <div class="group menu-item gap-2" tabindex="0" aria-expanded="false">
                  <div class="flex items-center justify-center opacity-50">
                    <div class="flex overflow-hidden h-6 w-6 shrink-0 rounded-md">
                      <!-- personal -->
                      <img alt="个人资料图片" class="h-6 w-6 shrink-0 object-cover" referrerpolicy="no-referrer" src="https://s.gravatar.com/avatar/a496cdad12db00294eea31ffd75457aa?s=480&amp;r=pg&amp;d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwz.png">
                    </div>
                  </div>
                  <div class="min-w-0 flex items-center">
                    <div class="flex min-w-0 grow items-center gap-2.5 ">
                      <div class="trunc">
                        wukai
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatSideBar">
  import TheMainIcon from './icons/TheMainIcon.vue';
  import SideBarControl from './icons/SideBarControl.vue';
  import NewChat from './icons/NewChat.vue';
  import FindChat from './icons/FindChat.vue';
  import PictureBuckets from './icons/PictureBuckets.vue';
  import FilesCreate from './icons/FilesCreate.vue';
  import DropDown from './icons/DropDown.vue';
  // ChatRoute
  import ChatRoute from './ChatRoute.vue';
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
  }
  .menu-item:hover {
    background: var(--menu-item-highlighted);
  }
  .menu-item:active {
    background: var(--menu-item-active);
  }
</style>