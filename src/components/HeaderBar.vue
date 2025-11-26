<template>
  <div>
    <header id="page-header" class="sticky top-0 p-2 flex items-center justify-between z-20 h-header-height pointer-events-none max-md:hidden bg-token-main-surface-primary">
      <div class="flex items-center">
        <button type="button" class="group flex cursor-pointer justify-center items-center gap-1 rounded-lg min-h-9 px-2.5 text-lg hover:bg-token-surface-hover focus-visible:bg-token-surface-hover font-normal whitespace-nowrap focus-visible:outline-none">
          <div>Chat KG</div>
          <DropDown></DropDown>
        </button>
      </div>
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <button class="relative text-token-text-primary mx-2 btn btn-ghost">
              <div class="flex w-full items-start justify-center gap-1.5">
                <!-- svg -->
                "切换主题"
              </div>
            </button>
            <div class="flex items-center">
              <div class="realtive" type="button">
                <button class="text-token-text-primary hover:bg-token-surface-hover keyboard-focus:bg-token-surface-hover flex h-9 w-9 items-center justify-center rounded-lg focus:outline-0">
                  <!-- svg 跳转github-->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts" name="HeaderBar">
  import DropDown from './icons/DropDown.vue';
</script>

<style scoped lang="css">
  
</style>