<template>
  <div class="relative flex flex-1 h-full w-full transition-colors">
      <div class="relative flex h-full w-full flex-row">
        <!-- <div class="box hover:bg-token-surface-hover">111</div>
        <div class="box">111</div> -->
        <ChatSideBar></ChatSideBar>
      </div>
    </div>
</template>

<script setup lang="ts" name="ChatView">
  import ChatSideBar from '../components/ChatSideBar.vue'
</script>

<style scoped>
  .box { 
    width: 20px;
    height: 20px;
  }
</style>