<template>
  <div class="container">
    <!-- 如果数据存在，则展示表格-->
    <a-table :data-source="nacosconfiglist" v-if="nacosconfiglist.length" row-key="id">
      <!-- 表格中的列 -->
      <a-table-column title="ID" dataIndex="id" key="id"/>
      <a-table-column title="Name" dataIndex="name" key="name"/>
      <a-table-column title="Url" dataIndex="url" key="url"/>
      <a-table-column title="Actions" key="actions">
        <template #default="{ record }">
          <!-- 表格中每行的动作 -->
          <a-space>
            <a-button type="primary" @click="showUpdateModal(record)">Edit</a-button>
            <a-button type="primary" danger @click="handleDelete(record.id)">Delete</a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <!-- 数据不存在，则展示文字，提示不存在 -->
    <p v-else>No Configs available. Please create a new Config.</p>

    <!-- 更新数据的模态框 -->
    <a-modal v-model:open="isUpdateModalVisible" title="Update Nacos Config" @ok="handleUpdate()"
             @onCancel="handleCancel">
      <a-form>
        <a-form-item label="Name">
          <a-input v-model:value="nacosconfigreq.name"/>
        </a-form-item>
        <a-form-item label="Url">
          <a-input v-model:value="nacosconfigreq.url" type="url"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 新增数据的模态框 -->
    <a-modal v-model:open="isAddModalVisible" title="Add New Config" @ok="handleAdd" @onCancel="handleCancel">
      <a-form>
        <a-form-item label="Name">
          <a-input v-model:value="nacosconfigreq.name"/>
        </a-form-item>
        <a-form-item label="Url">
          <a-input v-model:value="nacosconfigreq.url" type="url"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 定义两个按钮，新增和刷新 -->
    <a-space>
      <a-button type="primary" @click="showAddModal">Create</a-button>
      <a-button @click="refreshNacosConfigList">Refresh</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
// 引入hooks
import {useNacosConfig} from "../hooks/useNacosConfig";
const {
  nacosconfigreq,
  nacosconfiglist,
  refreshNacosConfigList,
  createNacosConfigData,
  updateNacosConfigData,
  deleteNacosConfigData,
  fetchNacosConfigList
} = useNacosConfig();

const id = ref<number>(0); // 表格id初始化
const isUpdateModalVisible = ref<boolean>(false); // 更新模态框初始化
const isAddModalVisible = ref<boolean>(false); //新增模态框初始化

// 展示更新模态框
const showUpdateModal = (record: any) => {
  nacosconfigreq.value = {name: record.name, url: record.url};
  id.value = record.id;
  isUpdateModalVisible.value = true;
};

// 展示新增模态框
const showAddModal = () => {
  nacosconfigreq.value = {name: '', url: ''};
  isAddModalVisible.value = true;
};

// 关闭模态框
const handleCancel = () => {
  isUpdateModalVisible.value = false;
  isAddModalVisible.value = false;
};

// 新增数据函数
const handleAdd = async () => {
  if (nacosconfigreq.value) {
    const result = await createNacosConfigData(nacosconfigreq.value);
    if (result.success) {
      await fetchNacosConfigList();
      isAddModalVisible.value = false;
    }
  }
};

// 更新数据函数
const handleUpdate = async () => {
  if (nacosconfigreq.value) {
    console.log(id.value)
    const result = await updateNacosConfigData(id.value, nacosconfigreq.value);
    if (result.success) {
      await fetchNacosConfigList();
      isUpdateModalVisible.value = false;
    }
  }
};

// 删除数据函数
const handleDelete = async (id: number) => {
  const result = await deleteNacosConfigData(id);
  if (result.success) {
    await fetchNacosConfigList(); // Ensure fetching updated data
  }
};

// 挂载时
onMounted(() => {
  fetchNacosConfigList()
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
</style>