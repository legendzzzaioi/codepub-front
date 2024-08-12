<template>
  <div class="container">
    <a-radio-group v-model:value="executionType">
      <a-radio :value="1">Immediate Execution After Approval</a-radio>
      <a-radio :value="2">Scheduled Execution</a-radio>
    </a-radio-group>

    <a-space direction="vertical" v-if="executionType === 2">
      <a-date-picker v-model="selectedDate" placeholder="Select Date" />
      <!-- <a-time-picker v-model="selectedTime" format="HH:mm:ss" placeholder="Select Time" /> -->
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { pubFormData } from "../store/pubFormData";

// 表单
const executionType = ref(pubFormData.executionType);
const selectedDate = ref(pubFormData.selectedDate);
const selectedTime = ref(pubFormData.selectedTime);

// 观察
watch(executionType, (newVal) => {
  pubFormData.executionType = newVal;
});

watch(selectedDate, (newVal) => {
  pubFormData.selectedDate = newVal;
});

watch(selectedTime, (newVal) => {
  pubFormData.selectedTime = newVal;
});

</script>

<style scoped></style>
