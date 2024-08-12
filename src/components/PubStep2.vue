<template>
  <div class="container">
    <!-- 选择类型-->
    <a-radio-group v-model:value="selectedConfigType" class="config-type">
      <a-radio :value="1">Nacos</a-radio>
      <a-radio :value="2">Etcd</a-radio>
      <a-radio :value="3">No</a-radio>
    </a-radio-group>

    <!-- 如果选择Nacos，则填充如下内容-->
    <div v-if="selectedConfigType === 1" class="config-form">
      <a-space direction="vertical" size="small">
        <div class="inline">
          <p class="label">Please Select Nacos Url: </p>
          <a-select
              v-model:value="nacosConfigName"
              style="width: 300px"
              placeholder="Nacos Name"
              :options="nacosNameList"
              @click="fetchNacosConfigList()"
              class="select"
          />
        </div>
        <div v-if="nacosConfigName">
          <div class="inline">
            <p class="label">Please Select Nacos Tenant: </p>
            <a-select
                v-model:value="nacosConfigTenant"
                style="width: 300px"
                placeholder="Nacos Tenant"
                :options="nacosTenantList"
                @click="fetchNacosTenantList(nacosConfigName)"
                class="select"
            />
          </div>
          <div class="inline">
            <p class="label">Please Select Nacos DataId: </p>
            <a-select
                v-model:value="nacosConfigDataId"
                style="width: 300px"
                placeholder="Nacos Data ID"
                :options="nacosDataIdList"
                @click="fetchNacosDataId(nacosConfigName, nacosdataidreq)"
                class="select"
            />
          </div>
        </div>
        <a-input
            v-model:value="nacosConfigGroup"
            placeholder="Nacos Group"
            :disabled=true
            v-if="nacosConfigDataId"
            class="input"
        />
        <a-radio-group
            v-model:value="nacosConfigType"
            v-if="nacosConfigDataId"
            class="radio-group"
        >
          <a-radio :value="'text'">TEXT</a-radio>
          <a-radio :value="'json'">JSON</a-radio>
          <a-radio :value="'xml'">XML</a-radio>
          <a-radio :value="'yaml'">YAML</a-radio>
          <a-radio :value="'html'">HTML</a-radio>
          <a-radio :value="'properties'">Properties</a-radio>
        </a-radio-group>
        <div v-if="nacosConfigDataId" class="textarea-container">
          <a-textarea
              style="width: 900px; height: 400px;"
              v-model:value="nacosConfigContent"
              placeholder="Nacos Content"
              class="textarea"
          />
        </div>
      </a-space>
    </div>

    <!-- 如果选择Etcd，则填充如下内容-->
    <div v-if="selectedConfigType === 2" class="config-form">
      <a-space direction="vertical" size="small">
        <div class="inline">
          <p class="label">Please Select Etcd Url: </p>
          <a-select
              v-model:value="etcdConfigName"
              style="width: 300px"
              placeholder="Etcd Name"
              :options="etcdNameList"
              @click="fetchEtcdConfigList()"
              class="select"
          />
        </div>
        <div v-if="etcdConfigName" class="inline">
          <p class="label">Please Select Etcd Key: </p>
          <a-select
              v-model:value="etcdConfigKey"
              style="width: 300px"
              placeholder="Etcd Key"
              :options="etcdKeysList"
              @click="fetchEtcdKeyList(etcdConfigName)"
              class="select"
          />
        </div>
        <div v-if="etcdConfigKey" class="textarea-container">
          <a-textarea
              style="width: 900px; height: 400px;"
              v-model:value="etcdConfigValue"
              placeholder="Etcd Value"
              class="textarea"
          />
        </div>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watchEffect, watch} from 'vue';
import {pubFormData} from "../store/pubFormData";
import {useNacosConfig} from "../hooks/useNacosConfig";
import {useEtcdConfig} from "../hooks/useEtcdConfig";
import {useNacos} from "../hooks/useNacos";
import {useEtcd} from "../hooks/useEtcd"

// 选择类型
const selectedConfigType = ref(pubFormData.selectedConfigType);

// Nacos 表单
const nacosConfigName = ref(pubFormData.nacos.name);
const nacosConfigTenant = ref(pubFormData.nacos.tenant);
const nacosConfigDataId = ref(pubFormData.nacos.dataId);
const nacosConfigContent = ref(pubFormData.nacos.content);
const nacosConfigGroup = ref(pubFormData.nacos.group);
const nacosConfigType = ref(pubFormData.nacos.type);

// Etcd 表单
const etcdConfigName = ref(pubFormData.etcd.name);
const etcdConfigKey = ref(pubFormData.etcd.key);
const etcdConfigValue = ref(pubFormData.etcd.value);

// 引入 hooks
const {nacosconfiglist, fetchNacosConfigList} = useNacosConfig();
const {etcdconfiglist, fetchEtcdConfigList} = useEtcdConfig();
const {nacostenant, nacosdataidreq, nacosdataidresp, fetchNacosDataId, fetchNacosTenantList} = useNacos();
const {etcdkeys, etcdvalue, fetchEtcdKeyList, fetchEtcdValue,} = useEtcd();

// Nacos 地址列表
const nacosNameList = computed(() => nacosconfiglist.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.url
})));

// Etcd 地址列表
const etcdNameList = computed(() => etcdconfiglist.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.url
})));

// Nacos Tenant 列表
const nacosTenantList = computed(() => nacostenant.value.map(item => ({
  value: item.namespace,
  label: item.namespaceShowName,
  title: item.namespaceShowName
})));

// Etcd Keys 列表
const etcdKeysList = computed(() => etcdkeys.value.map(item => ({
  value: item,
  label: item,
  title: item
})));

// Nacos DataId 列表
const nacosDataIdList = computed(() => {
  if (nacosConfigTenant.value === '') {
    const tenant = nacostenant.value.find(item => item.namespace === '');
    if (tenant) {
      nacosdataidreq.value.pageSize = tenant.configCount;
      nacosdataidreq.value.tenant = '';
    }
  }
  return nacosdataidresp.value.map(item => ({
    value: item.dataId,
    label: item.dataId,
    title: item.dataId
  }));
});

// 同步 pubFormData 数据
watchEffect(() => {
  pubFormData.selectedConfigType = selectedConfigType.value;
  pubFormData.nacos.name = nacosConfigName.value;
  pubFormData.nacos.tenant = nacosConfigTenant.value;
  pubFormData.nacos.dataId = nacosConfigDataId.value;
  pubFormData.nacos.content = nacosConfigContent.value;
  pubFormData.nacos.group = nacosConfigGroup.value;
  pubFormData.nacos.type = nacosConfigType.value;

  pubFormData.etcd.name = etcdConfigName.value;
  pubFormData.etcd.key = etcdConfigKey.value;
  pubFormData.etcd.value = etcdConfigValue.value;
});

// 观察 Tenant 值的变化，读取对应的 dataid 总数量
watch(nacosConfigTenant, (newTenant) => {
  const tenant = nacostenant.value.find(item => item.namespace === newTenant);
  nacosConfigContent.value = '';
  nacosConfigGroup.value = '';
  nacosConfigType.value = '';
  nacosConfigDataId.value = '';
  if (tenant) {
    nacosdataidreq.value.pageSize = tenant.configCount;
    nacosdataidreq.value.tenant = tenant.namespace;
    if (tenant.configCount === 0) nacosdataidreq.value.pageSize = 1;
  } else {
    nacosdataidreq.value.pageSize = 0;
    nacosdataidreq.value.tenant = '';
  }
});

// 观察 Etcd keys 值的变化，获取对应的value
watch(etcdConfigKey, async (newConfigKey) => {
  if (newConfigKey) {
    try {
      await fetchEtcdValue(etcdConfigName.value, newConfigKey);
      etcdConfigValue.value = etcdvalue.value.value;
    } catch (error) {
      etcdConfigValue.value = '';
    }
  } else {
    etcdConfigValue.value = '';
  }
});

// 观察 DataId 值的变化，读取对应的内容、组、类型
watch(nacosConfigDataId, (newDataId) => {
  const dataid = nacosdataidresp.value.find(item => item.dataId === newDataId);
  if (dataid) {
    nacosConfigContent.value = dataid.content;
    nacosConfigGroup.value = dataid.group;
    nacosConfigType.value = dataid.type;
  } else {
    nacosConfigContent.value = '';
    nacosConfigGroup.value = '';
    nacosConfigType.value = '';
  }
});

// 观察selectedConfigType的变化，清空
watch(selectedConfigType, (newType) => {
  if (newType !== 1) {
    nacosConfigName.value = '';
    nacosConfigTenant.value = '';
    nacosConfigDataId.value = '';
    nacosConfigContent.value = '';
    nacosConfigGroup.value = '';
    nacosConfigType.value = '';
  }
  if (newType !== 2) {
    etcdConfigName.value = '';
    etcdConfigKey.value = '';
    etcdConfigValue.value = '';
  }
});

// 观察nacos地址的变化，清空后面选项的内容
watch(nacosConfigName, () => {
  nacosConfigTenant.value = '';
  nacosConfigDataId.value = '';
  nacosConfigContent.value = '';
  nacosConfigGroup.value = '';
  nacosConfigType.value = '';
});

// 观察etcd地址的变化，清空后面选项的内容
watch(etcdConfigName, () => {
  etcdConfigKey.value = '';
  etcdConfigValue.value = '';
});


</script>

<style scoped>
.container {
  padding: 30px;
  border-radius: 10px;
  max-width: 1000px;
}

.config-form {
  margin-top: 20px;
}

.inline {
  display: flex;
}

.label {
  margin-right: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.select,
.textarea-container {
  margin-top: 15px;
  width: 100%;
}

.select,
.input {
  width: 900px;
  border-radius: 5px;
}

.textarea {
  border-radius: 8px;
  padding: 10px;
  resize: none;
  font-size: 14px;
}

a-radio-group {
  margin-right: 20px;
}

a-select,
a-input,
a-textarea {
  font-size: 14px;
}

a-radio-group {
  border-radius: 20px;
  padding: 5px 15px;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .select,
  .input {
    width: 100%;
  }

  .textarea {
    width: 100%;
    height: 300px;
  }

  .radio-group {
    flex-direction: column;
  }

  .inline {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>
