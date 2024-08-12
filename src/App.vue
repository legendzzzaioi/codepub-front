<template>
  <div class="app-container">
    <!--  菜单栏  -->
    <div class="sidebar" v-if="showMenu">
      <Menu />
    </div>
    <!--  主窗口  -->
    <div class="main-content">
      <!--  头部  -->
      <PageHeader v-if="showMenu"/>
      <!--  内容  -->
      <div class="content">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import PageHeader from "./views/PageHeader.vue";
import Menu from './views/Menu.vue';

const route = useRoute();
// 根据路由中的meta.hideMenu字段，判断是否需要展示菜单栏
const showMenu = computed(() => !route.meta.hideMenu);

</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px; /* Adjust width as needed */
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
  padding: 16px;
  background-color: #f0f2f5;
}
</style>