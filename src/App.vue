<template>
  <app-header></app-header>
  <div class="page">
    <app-sidebar></app-sidebar>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

export default {
  components: { AppSidebar, AppHeader },
}
</script>

<style>
.page {
  display: flex;
  gap: calc(var(--unit) * 2);
  padding-left: var(--unit);
  padding-right: 6px;
  height: calc(100vh - 56px - var(--unit));
  width: 100vw;
}
.main {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-main-scroll);
  width: 100%;
}
.main::-webkit-scrollbar {
  width: 12px;
}
.main::-webkit-scrollbar-track {
  background: transparent;
}
.main::-webkit-scrollbar-thumb {
  background-color: var(--color-main-scroll);
  border-radius: 20px;
}
@media (max-width: 768px) {
  .main {
    padding: 0;
  }
}
</style>
