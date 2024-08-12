import {ref} from 'vue';
import {
    getNacosDataId,
    getNacosTenant,
    saveNacosContent,
    deleteNacosDataId,
    GetNacosTenantResp,
    GetNacosDataIdResp,
    GetNacosDataIdReq,
    SaveNacosReq
} from '../api/nacos'
import {message} from "ant-design-vue";
import {NacosConfigReq} from "../api/nacosConfig";

// 定义如下增删改查hooks
export function useNacos(){
    const nacostenant = ref<GetNacosTenantResp[]>([]);
    const nacosdataidreq = ref<GetNacosDataIdReq>({tenant: '', pageSize: 0});
    const nacosdataidresp = ref<GetNacosDataIdResp[]>([]);


    const fetchNacosTenantList = async (name: string) =>{
        try {
            nacostenant.value = await getNacosTenant(name);
        } catch (error) {
            nacostenant.value = []
            message.error('Failed to get NacosTenant: ' + error.response.data.error);
        }
    };

    const fetchNacosDataId = async (name: string, req: GetNacosDataIdReq) =>{
        try {
            nacosdataidresp.value = await getNacosDataId(name, req);
        } catch (error) {
            nacosdataidresp.value = []
            message.error('Failed to get NacosDataId: ' + error.response.data.error);
        }
    };

    return {
        nacostenant,
        nacosdataidreq,
        nacosdataidresp,
        fetchNacosTenantList,
        fetchNacosDataId,
    };
}