<template>
  <!--  展示用户名和登出按钮-->
  <div class="header">
    <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
        </a-menu>
      </template>
      <a-button type="link">
        <span>{{ userinfo.username }}</span>
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useAuth} from "../hooks/useAuth";
import {useUser} from "../hooks/useUser";

// 引入路由
const router = useRouter();
// 引入hooks
const {logoutHandler} = useAuth();
const {getUserInfoData, userinfo} = useUser();

// 挂载时
onMounted(async () => {
  await getUserInfoData();
});

// 退出登陆函数
const logout = async () => {
  await logoutHandler();
  await router.push({name: 'Login'});
};

</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  background: #f0f2f5;
  padding: 0 20px;
}

span {
  color: black;
  margin-right: 30px;
}
</style>