<template>
  <div class="container user-list">
    <!--    如果存在用户，则展示表格-->
    <a-table :data-source="user" v-if="user.length" row-key="id">
      <!-- 定义表格中的列 -->
      <a-table-column title="ID" dataIndex="id" key="id"/>
      <a-table-column title="Username" dataIndex="username" key="username"/>
      <a-table-column title="Actions" key="actions">
        <template #default="{ record }">
          <!-- 每条记录放置动作按钮 -->
          <a-space>
            <a-button type="primary" @click="showUpdateModal(record)">Edit</a-button>
            <a-button type="primary" danger @click="handleDeleteUser(record.id)">Delete</a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <!-- 没有用户时展示的内容 -->
    <p v-else>No users available. Please create a new user.</p>

    <!-- 更新用户模态框 -->
    <a-modal v-model:open="isUpdateModalVisible" title="Update User Password" @ok="handleUpdateUser(userid)"
             @cancel="handleCancel">
      <a-form>
        <a-form-item label="Username">
          <a-input v-model:value="updateuser.username" :placeholder="updateuser.username" disabled/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="updateuser.password" type="password"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 新增用户模态框 -->
    <a-modal v-model:open="isAddModalVisible" title="Add New User" @ok="handleAddUser" @cancel="handleCancel">
      <a-form>
        <a-form-item label="Username">
          <a-input v-model:value="createuser.username"/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model:value="createuser.password" type="password"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 表格下放置按钮 -->
    <a-space>
      <a-button type="primary" @click="showAddModal">Create User</a-button>
      <a-button @click="refreshUserList">Refresh</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useUser} from '../hooks/useUser';

// 引入hooks
const {
  user,
  updateuser,
  createuser,
  fetchUser,
  updateUserData,
  deleteUserById,
  createUserData,
  refreshUserList
} = useUser();

// 初始化模态框
const isUpdateModalVisible = ref(false);
const isAddModalVisible = ref(false);

// 初始化用户id
let userid = ref<string>('');

// 展示更新模态框
const showUpdateModal = (record: any) => {
  updateuser.value = {username: record.username, password: ''};
  userid = record.id;
  isUpdateModalVisible.value = true;
};

// 展示新增模态框
const showAddModal = () => {
  createuser.value = {username: '', password: ''};
  isAddModalVisible.value = true;
};

// 取消模态框
const handleCancel = () => {
  isUpdateModalVisible.value = false;
  isAddModalVisible.value = false;
};

// 删除用户函数
const handleDeleteUser = async (id: string) => {
  const result = await deleteUserById(id);
  if (result.success) {
    await fetchUser();
  }
};

// 新增用户函数
const handleAddUser = async () => {
  if (createuser.value) {
    const result = await createUserData(createuser.value);
    if (result.success) {
      await fetchUser();
      isAddModalVisible.value = false;
    }
  }
};

// 更新用户函数
const handleUpdateUser = async (id: string) => {
  if (updateuser.value) {
    const result = await updateUserData(id, updateuser.value);
    if (result.success) {
      await fetchUser(); // Ensure fetching updated data
      isUpdateModalVisible.value = false;
    }
  }
};

// 页面挂载时
onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.user-list {
  padding: 10px;
}
</style>