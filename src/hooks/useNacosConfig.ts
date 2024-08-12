import {ref} from 'vue'
import {
    getNacosConfig,
    createNacosConfig,
    updateNacosConfig,
    deleteNacosConfig,
    NacosConfigResp,
    NacosConfigReq
} from '../api/nacosConfig';
import {message} from "ant-design-vue";


// 定义如下增删改查hooks
export function useNacosConfig() {
    const nacosconfigreq = ref<NacosConfigReq>({name: '', url: ''});
    const nacosconfiglist = ref<NacosConfigResp[]>([]);

    const fetchNacosConfigList = async () => {
        try {
            nacosconfiglist.value = await getNacosConfig();
        } catch (error) {
            nacosconfiglist.value = [];
            message.error('Failed to get NacosConfigList: ' + error.response.data.error);
        }
    };

    const refreshNacosConfigList = async () => {
        try {
            nacosconfiglist.value = await getNacosConfig();
            message.success('Nacos Config list refreshed successfully.', 5);
        } catch (error) {
            nacosconfiglist.value = [];
            message.error('Failed to get NacosConfigList: ' + error.response.data.error);
        }
    };

    const createNacosConfigData = async (req: NacosConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await createNacosConfig(req);
            if (response.id == 0) {
                message.error('Failed to create NacosConfig');
                return {success: false};
            } else {
                message.success('NacosConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to create NacosConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const updateNacosConfigData = async (id: number, req: NacosConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await updateNacosConfig(id, req);
            if (response.id == 0) {
                message.error('Failed to create NacosConfig');
                return {success: false};
            } else {
                message.success('NacosConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create NacosConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const deleteNacosConfigData = async (id: number): Promise<{ success: boolean }> => {
        try {
            if (!id) {
                message.error('id is required');
                return {success: false};
            }
            const response = await deleteNacosConfig(id);
            if (response.id == 0) {
                message.error('Failed to create NacosConfig');
                return {success: false};
            } else {
                message.success('NacosConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create NacosConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    return {
        nacosconfigreq,
        nacosconfiglist,
        refreshNacosConfigList,
        createNacosConfigData,
        updateNacosConfigData,
        deleteNacosConfigData,
        fetchNacosConfigList
    };
}