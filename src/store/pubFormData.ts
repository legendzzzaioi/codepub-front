import {reactive} from 'vue';

export const pubFormData = reactive({
    executionType: 1,
    selectedDate: null,
    selectedTime: null,

    selectedConfigType: 3,
    nacos: {
        name: '',
        tenant: '',
        dataId: '',
        content: '',
        group: '',
        type: '',
    },
    etcd: {
        name: '',
        key: '',
        value: '',
    },

    selectedDatabaseType: 3,
    database: {
        name: '',
        sql: '',
    },

    selectedJenkinsType: 2,
    jenkins: {
        name: '',
        job: '',
        param: {
            // 动态参数
        },
    }
});
