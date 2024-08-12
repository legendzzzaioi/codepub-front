<template>
  <div class="menu-container">
    <!-- 菜单栏 -->
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="items"
        @click="handleMenuClick"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import {reactive, watch, h} from 'vue';
import {useRouter} from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

const router = useRouter();

// 初始化状态
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1', 'sub2'],
  preOpenKeys: ['sub1', 'sub2'],
});

// 菜单具体项
const items = reactive([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Code Publish',
    title: 'Code Publish',
    name: 'Pub',
  },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Control',
    title: 'Control',
    children: [
      {
        key: '2',
        label: 'User',
        title: 'User',
        name: 'User',
      },
      {
        key: '3',
        label: 'Log',
        title: 'Log',
        name: 'Log',
      },
    ],
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Config',
    title: 'Config',
    children: [
      {
        key: '4',
        label: 'Nacos',
        title: 'Nacos',
        name: 'ConfigNacos',
      },
      {
        key: '5',
        label: 'Etcd',
        title: 'Etcd',
        name: 'ConfigEtcd',
      },
      {
        key: '6',
        label: 'Mysql',
        title: 'Mysql',
        name: 'ConfigMysql',
      },
      {
        key: '7',
        label: 'Postgres',
        title: 'Postgres',
        name: 'ConfigPostgres',
      },
      {
        key: '8',
        label: 'Jenkins',
        title: 'Jenkins',
        name: 'ConfigJenkins',
      },
    ],
  },
]);

// 菜单多层级切换
watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
);

// 展开、隐藏
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};

// 点击事件
const handleMenuClick = (item: any) => {
  if (item.keyPath) {
    const selectedItem = findMenuItem(items, item.key);
    if (selectedItem?.name) {
      router.push({name: selectedItem.name});
    }
  }
};

// 菜单多层级
const findMenuItem = (menuItems: any[], key: string) => {
  for (const item of menuItems) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found = findMenuItem(item.children, key);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

</script>

<style scoped>
.menu-container {
  height: 100%;
  overflow: auto;
  background-color: #001529; /* Dark theme background color */
}
</style>
