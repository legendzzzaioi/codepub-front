<template>
  <div class="container">
    <!--    步骤标题-->
    <a-steps :current="currentStep">
      <a-step title="Execution Time"/>
      <a-step title="Modify Configuration"/>
      <a-step title="Execution Database"/>
      <a-step title="Execution Jenkins Task"/>
    </a-steps>

    <!--    步骤组件-->
    <div v-if="currentStep === 0">
      <PubStep1/>
    </div>
    <div v-else-if="currentStep === 1">
      <PubStep2/>
    </div>
    <div v-else-if="currentStep === 2">
      <PubStep3/>
    </div>
    <div v-else-if="currentStep === 3">
      <PubStep4/>
    </div>

    <!--    动作按钮-->
    <div class="steps-action">
      <a-button type="primary" @click="previousStep" v-if="currentStep > 0">Previous</a-button>
      <a-button type="primary" @click="nextStep" v-if="currentStep < 3">Next</a-button>
      <a-button type="primary" @click="submit" v-if="currentStep === 3">Submit</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import PubStep1 from "../components/PubStep1.vue";
import PubStep2 from "../components/PubStep2.vue";
import PubStep3 from "../components/PubStep3.vue";
import PubStep4 from "../components/PubStep4.vue";
import {pubFormData} from "../store/pubFormData";
import {message} from "ant-design-vue";

// 当前第几步
const currentStep = ref(0);

// 下一步
const nextStep = () => {
  if (validateStep()) {
    currentStep.value += 1;
  }
};

// 上一步
const previousStep = () => {
  currentStep.value -= 1;
};

// 步骤检查
const validateStep = () => {
  switch (currentStep.value) {
    case 0:
      if (!pubFormData.executionType) {
        message.error('Please select an execution type.');
        return false;
      }
      if (pubFormData.executionType === 2 && (!pubFormData.selectedDate || !pubFormData.selectedTime)) {
        message.error('Please select both date and time for scheduled execution.');
        return false;
      }
      break;
    case 1:
      if (!pubFormData.selectedConfigType) {
        message.error('Please select a configuration type.');
        return false;
      }
      if (pubFormData.selectedConfigType === 1 && (!pubFormData.nacos.name || !pubFormData.nacos.dataId)) {
        message.error('Please fill in all Nacos configuration details.');
        return false;
      }
      if (pubFormData.selectedConfigType === 2 && (!pubFormData.etcd.name || !pubFormData.etcd.key)) {
        message.error('Please fill in all Etcd configuration details.');
        return false;
      }
      break;
    case 2:
      if (!pubFormData.selectedDatabaseType) {
        message.error('Please select a database type.');
        return false;
      }
      if (pubFormData.selectedDatabaseType != 3 && (!pubFormData.database.name || !pubFormData.database.sql)) {
        message.error('Please fill in all database details.');
        return false;
      }
      break;
    case 3:
      if (!pubFormData.selectedJenkinsType) {
        message.error('Please select a jenkins type.');
        return false;
      }
      if (pubFormData.selectedJenkinsType === 1 && (!pubFormData.jenkins.name || !pubFormData.jenkins.job)) {
        message.error('Please fill in all jenkins details.');
        return false;
      }
      if (pubFormData.selectedConfigType === 3 && pubFormData.selectedDatabaseType === 3 && pubFormData.selectedJenkinsType === 2) {
        message.error('Nothing to do, Please choose at least one to execute.');
        return false;
      }
      break;
  }
  return true;
};

// 提交
const submit = () => {
  if (validateStep()) {
    console.log('Final Form Data:', pubFormData);
    message.success('Form submitted successfully');
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.steps-action {
  margin-top: 20px;
}
</style>