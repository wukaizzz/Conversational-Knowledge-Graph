<template>
  <div class="flex flex-col h-full overflow-y-auto  bg-token-main-surface-primary thread-xl:pt-(--header-height) [scrollbar-gutter:stable_both-edges]">
    <div class="relative">
      <div aria-hidden="true" data-edge="true" class="pointer-events-none h-px w-px absolute start-0 top-0">
      </div>
    </div>
    <div class="flex flex-col text-sm thread-xl:pt-(--header-height) pb-25">
      <!-- message -->
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatFull">

</script>

<style scoped lang="css">
  .thread-xl {
    display: block;
    height: 100%;
    overflow-y: auto;
  }
  .pb-25 {
    padding-bottom: calc(var(--spacing)*25);
}
</style>