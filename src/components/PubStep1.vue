<template>
  <div class="container">
    <!-- 选择类型-->
    <a-radio-group v-model:value="executionType">
      <a-radio :value="1">Immediate Execution After Approval</a-radio>
      <a-radio :value="2">Scheduled Execution</a-radio>
    </a-radio-group>

    <!-- 如果定时执行，选择时间-->
    <a-space direction="vertical" v-if="executionType === 2">
      <a-date-picker
        v-model:value="selectedDate"
        placeholder="Select Date"
        :disabledDate="disabledDate"
      />
      <TimePicker
        v-model:value="selectedTime"
        format="HH:mm:ss"
        placeholder="Select Time"
        :disabledHours="disabledHours"
        :disabledMinutes="disabledMinutes"
        :disabledSeconds="disabledSeconds"
      />
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { pubFormData } from "../store/pubFormData";
import {TimePicker} from "ant-design-vue"
import moment from 'moment';

const currentDate = moment().startOf('day'); // 当前日期
const currentTime = moment(); // 当前时间

// 表单
const executionType = ref(pubFormData.executionType);
const selectedDate = ref(pubFormData.selectedDate);
const selectedTime = ref(pubFormData.selectedTime);

// 禁用过去的日期
const disabledDate = (date: moment.Moment) => {
  return date.isBefore(currentDate);
};

// 禁用过去的小时
const disabledHours = () => {
  if (selectedDate.value && selectedDate.value.isSame(currentDate, 'day')) {
    return Array.from({ length: 24 }, (_, i) => i).slice(0, currentTime.hour());
  }
  return [];
};

// 禁用过去的分钟
const disabledMinutes = (hour: number) => {
  if (selectedDate.value && selectedDate.value.isSame(currentDate, 'day') && hour === currentTime.hour()) {
    return Array.from({ length: 60 }, (_, i) => i).slice(0, currentTime.minute());
  }
  return [];
};

// 禁用过去的秒
const disabledSeconds = (hour: number, minute: number) => {
  if (selectedDate.value && selectedDate.value.isSame(currentDate, 'day') && hour === currentTime.hour() && minute === currentTime.minute()) {
    return Array.from({ length: 60 }, (_, i) => i).slice(0, currentTime.second());
  }
  return [];
};

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
