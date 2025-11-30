<template>
  <div class="relative flex flex-1 h-full w-full transition-colors">
      <div class="relative flex h-full w-full flex-row">
        <!-- <div class="box hover:bg-token-surface-hover">111</div>
        <div class="box">111</div> -->
        <ChatSideBar></ChatSideBar>
        <div class="relative flex h-full min-w-0 flex-1 flex-col">
          <main class="relative h-full w-full flex-1 overflow-auto" id="main" z-index="-1">
            <div id="thread" class="group h-full w-full">
              <div class="composer-parent flex flex-col focus-visible:outline-0 overflow-hidden h-full">
                <!-- toubu -->
                  <HeaderBar></HeaderBar>
                <div class="relative flex flex-col grow overflow-hidden basis-auto">
                  <div class="relative h-full">
                <!-- full -->
                    <ChatFull></ChatFull>
                  </div>
                </div>
                <!-- weibu -->
                <div class="w-full flex-shrink-0">
                  <ChatInput></ChatInput>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts" name="ChatView">
  import HeaderBar from '@/components/HeaderBar.vue';
import ChatSideBar from '../components/ChatSideBar.vue';
import ChatFull from '@/components/ChatFull.vue';
import ChatInput from '@/components/ChatInput.vue';
  
</script>

<style scoped>
  .composer-parent {
    --composer-footer_height: var(--composer-bar_footer-current-height,32px);
    --composer-bar_height: var(--composer-bar_current-height,52px);
    --composer-bar_width: var(--composer-bar_current-width,768px);
    --mask-fill: linear-gradient(180deg,#fff 0%,#fff);
    --mask-erase: linear-gradient(180deg,#000 0%,#000);
}

</style>