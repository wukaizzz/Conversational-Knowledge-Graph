<script setup lang="ts">
import ChatView from './views/ChatView.vue';
import KGView from './knowledge_graph/KGView.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/chat">chat</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <div class="flex h-screen w-full">
    <!-- <ChatView></ChatView> -->
     <KGView></KGView>
  </div>
</template>

<style scoped>

</style>
