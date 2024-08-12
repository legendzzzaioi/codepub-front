<template>
  <div class="container">
    <!-- 选择类型-->
    <a-radio-group v-model:value="selectedDatabaseType" class="radio-group">
      <a-radio :value="1">Mysql</a-radio>
      <a-radio :value="2">Postgres</a-radio>
      <a-radio :value="3">No</a-radio>
    </a-radio-group>

    <!-- 如果选择Mysql，则填充如下内容-->
    <div v-if="selectedDatabaseType === 1" class="form-container">
      <a-space direction="vertical" size="middle" class="form-space">
        <div class="form-item">
          <label class="form-label">Please Select Mysql Url: </label>
          <a-select
              v-model:value="databaseName"
              class="form-select"
              placeholder="Mysql Name"
              :options="mysqlNameList"
              @click="fetchMysqlConfigList()"
          />
        </div>
        <div v-if="databaseName" class="textarea-container">
          <a-textarea
              v-model:value="databaseSql"
              placeholder="SQL"
              class="form-textarea"
          />
        </div>
      </a-space>
    </div>

    <!-- 如果选择Postgres，则填充如下内容-->
    <div v-if="selectedDatabaseType === 2" class="form-container">
      <a-space direction="vertical" size="middle" class="form-space">
        <div class="form-item">
          <label class="form-label">Please Select Postgres Url: </label>
          <a-select
              v-model:value="databaseName"
              class="form-select"
              placeholder="Postgres Name"
              :options="postgresNameList"
              @click="fetchPostgresConfigList()"
          />
        </div>
        <div v-if="databaseName" class="textarea-container">
          <a-textarea
              v-model:value="databaseSql"
              placeholder="SQL"
              class="form-textarea"
          />
        </div>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch, watchEffect} from 'vue';
import {pubFormData} from "../store/pubFormData";
import {useMysqlConfig} from "../hooks/useMysqlConfig";
import {usePostgresConfig} from "../hooks/usePostgresConfig";

// 选择类型
const selectedDatabaseType = ref(pubFormData.selectedDatabaseType);

// 数据库表单
const databaseName = ref(pubFormData.database.name);
const databaseSql = ref(pubFormData.database.sql);

// 引入 hooks
const {mysqlconfiglist, fetchMysqlConfigList} = useMysqlConfig();
const {postgresconfiglist, fetchPostgresConfigList} = usePostgresConfig();

// Mysql 地址列表
const mysqlNameList = computed(() => mysqlconfiglist.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.url
})));

// Postgres 地址列表
const postgresNameList = computed(() => postgresconfiglist.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.url
})));

// 同步 pubFormData 数据
watchEffect(() => {
  pubFormData.selectedDatabaseType = selectedDatabaseType.value;
  pubFormData.database.name = databaseName.value;
  pubFormData.database.sql = databaseSql.value;
});

// 观察selectedDatabaseType的变化，清空
watch(selectedDatabaseType, (newType) => {
  if (newType !== 1) {
    databaseName.value = '';
    databaseSql.value = '';
  }
  if (newType !== 2) {
    databaseName.value = '';
    databaseSql.value = '';
  }
});

</script>

<style scoped>
.container {
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
}

.radio-group {
  justify-content: space-around;
  margin-bottom: 20px;
}

.form-container {
  padding: 20px;
  border-radius: 8px;
}

.form-space {
  width: 100%;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.form-label {
  font-weight: 600;
  margin-right: 10px;
}

.form-select {
  flex-grow: 1;
}

.textarea-container {
  display: flex;
  justify-content: center;
}

.form-textarea {
  width: 100%;
  height: 400px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
}
</style>
