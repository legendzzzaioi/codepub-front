import {ref} from 'vue';
import {
    GetEtcdValueResp,
    SaveEtcdReq,
    getEtcdKeys,
    getEtcdValue,
    saveEtcd,
    deleteEtcd,
} from '../api/etcd'
import {message} from "ant-design-vue";
import {EtcdConfigReq} from "../api/etcdConfig";

// 定义如下增删改查hooks
export function useEtcd(){
    const etcdkeys = ref<[]>([]);
    const etcdreq = ref<SaveEtcdReq>({key: '', value: ''});
    const etcdvalue = ref<GetEtcdValueResp>({value: ''});


    const fetchEtcdKeyList = async (name: string) =>{
        try {
            etcdkeys.value = await getEtcdKeys(name);
        } catch (error) {
            etcdkeys.value = []
            message.error('Failed to get EtcdKeys: ' + error.response.data.error);
        }
    };

    const fetchEtcdValue = async (name: string, key: string) =>{
        try {
            etcdvalue.value = await getEtcdValue(name, key);
        } catch (error) {
            etcdvalue.value = {value: ''}
            message.error('Failed to get EtcdValue: ' + error.response.data.error);
        }
    };

    return {
        etcdkeys,
        etcdreq,
        etcdvalue,
        fetchEtcdKeyList,
        fetchEtcdValue,
    };
}