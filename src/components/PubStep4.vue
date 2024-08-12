<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <!-- 选择类型-->
    <a-radio-group v-model:value="selectedJenkinsType" class="radio-group">
      <a-radio :value="1">Jenkins</a-radio>
      <a-radio :value="2">No</a-radio>
    </a-radio-group>
    <!-- 如果选择Jenkins，则填充如下内容-->
    <div v-if="selectedJenkinsType === 1" class="jenkins-form">
      <a-space direction="vertical" size="small" class="form-space">
        <div class="inline">
          <p class="label">Please Select Jenkins Url: </p>
          <a-select
              v-model:value="jenkinsName"
              style="width: 300px"
              placeholder="Jenkins Name"
              :options="jenkinsNameList"
              @click="fetchJenkinsConfigList()"
              class="select"
          />
        </div>
        <div class="inline" v-if="jenkinsName">
          <p class="label">Please Select Jenkins View: </p>
          <a-select
              v-model:value="jenkinsViewName"
              style="width: 300px"
              placeholder="Jenkins View"
              :options="jenkinsViewList"
              @click="fetchJenkinsViewList(jenkinsName)"
              class="select"
          />
        </div>
        <div class="inline" v-if="jenkinsViewName">
          <p class="label">Please Select Jenkins Jobs: </p>
          <a-select
              v-model:value="jenkinsJobName"
              style="width: 300px"
              placeholder="Jenkins View"
              :options="jenkinsJobList"
              @click="fetchJenkinsJobList(jenkinsName, jenkinsViewName)"
              class="select"
          />
        </div>
      </a-space>
      <div v-if="jenkinsJobName">
        <a-space direction="vertical" size="small">
          <br>
          <p>Please fill in the following parameter</p>
          <div v-for="(param, index) in jenkinsjobparam" :key="index" class="inline">
            <p>{{ param.defaultParameterValue.name }}: </p>
            <a-input
                v-model:value="jenkinsParams[param.defaultParameterValue.name]"
                :placeholder="param.description"
            />
          </div>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch, watchEffect} from 'vue';
import {pubFormData} from "../store/pubFormData";
import {useJenkinsConfig} from "../hooks/useJenkinsConfig";
import {useJenkins} from "../hooks/useJenkins";

// 选择类型
const selectedJenkinsType = ref(pubFormData.selectedJenkinsType);
const jenkinsViewName = ref('');

// jenkins 表单
const jenkinsName = ref(pubFormData.jenkins.name);
const jenkinsJobName = ref(pubFormData.jenkins.job);
const jenkinsParams = ref(pubFormData.jenkins.param);

// 引入 hooks
const {jenkinsconfiglist, fetchJenkinsConfigList} = useJenkinsConfig();
const {
  jenkinsviews,
  jenkinsjobs,
  jenkinsjobparam,
  fetchJenkinsViewList,
  fetchJenkinsJobList,
  fetchJenkinsJobParam,
} = useJenkins();

// Jenkins 地址列表
const jenkinsNameList = computed(() => jenkinsconfiglist.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.url
})));

// Jenkins Views列表
const jenkinsViewList = computed(() => jenkinsviews.value.map(item => ({
  value: item,
  label: item,
  title: item
})));

// Jenkins Jobs列表
const jenkinsJobList = computed(() => jenkinsjobs.value.map(item => ({
  value: item.name,
  label: item.name,
  title: item.name
})));

// 同步 pubFormData 数据
watchEffect(() => {
  pubFormData.selectedJenkinsType = selectedJenkinsType.value;
  pubFormData.jenkins.name = jenkinsName.value;
  pubFormData.jenkins.job = jenkinsJobName.value;
  pubFormData.jenkins.param = {...jenkinsParams.value};
});

// 观察 Jenkins Job 值的变化，获取对应的构建参数
watch(jenkinsJobName, async (NewJobName) => {
  if (NewJobName) {
    try {
      await fetchJenkinsJobParam(jenkinsName.value, NewJobName);
      jenkinsParams.value = jenkinsjobparam.value.reduce((acc, param) => {
        acc[param.defaultParameterValue.name] = param.defaultParameterValue.value || '';
        return acc;
      }, {});
    } catch (error) {
      jenkinsParams.value = {};
    }
  } else {
    jenkinsParams.value = {};
  }
});

// 观察selectedJenkinsType的变化，清空
watch(selectedJenkinsType, (newType) => {
  if (newType !== 1) {
    jenkinsName.value = '';
    jenkinsJobName.value = '';
    jenkinsParams.value = {};
  }
});

</script>

<style scoped>
.container {
  padding: 20px;
  border-radius: 8px;
}

.radio-group {
  justify-content: center;
  margin-bottom: 20px;
}

.jenkins-form {
  padding: 20px;
  border-radius: 8px;
}

.form-space .inline {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 150px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.select {
  width: 100%;
}

.inline p {
  margin: 0;
  padding-right: 10px;
  font-weight: bold;
  color: #333;
}

a-input {
  width: 300px;
  border-radius: 4px;
}

a-space {
  width: 100%;
}

a-space p {
  margin-bottom: 5px;
  color: #555;
}

</style>
