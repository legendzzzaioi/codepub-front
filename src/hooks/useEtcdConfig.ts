import {ref} from 'vue'
import {
    getEtcdConfig,
    createEtcdConfig,
    updateEtcdConfig,
    deleteEtcdConfig,
    EtcdConfigResp,
    EtcdConfigReq
} from '../api/etcdConfig';
import {message} from "ant-design-vue";


// 定义如下增删改查hooks
export function useEtcdConfig() {
    const etcdconfigreq = ref<EtcdConfigReq>({name: '', url: ''});
    const etcdconfiglist = ref<EtcdConfigResp[]>([]);

    const fetchEtcdConfigList = async () => {
        try {
            etcdconfiglist.value = await getEtcdConfig();
        } catch (error) {
            etcdconfiglist.value = [];
            message.error('Failed to get EtcdConfigList: ' + error.response.data.error);
        }
    };

    const refreshEtcdConfigList = async () => {
        try {
            etcdconfiglist.value = await getEtcdConfig();
            message.success('Etcd Config list refreshed successfully.', 5);
        } catch (error) {
            etcdconfiglist.value = [];
            message.error('Failed to get EtcdConfigList: ' + error.response.data.error);
        }
    };

    const createEtcdConfigData = async (req: EtcdConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await createEtcdConfig(req);
            if (response.id == 0) {
                message.error('Failed to create EtcdConfig');
                return {success: false};
            } else {
                message.success('EtcdConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to create EtcdConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const updateEtcdConfigData = async (id: number, req: EtcdConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await updateEtcdConfig(id, req);
            if (response.id == 0) {
                message.error('Failed to create EtcdConfig');
                return {success: false};
            } else {
                message.success('EtcdConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create EtcdConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const deleteEtcdConfigData = async (id: number): Promise<{ success: boolean }> => {
        try {
            if (!id) {
                message.error('id is required');
                return {success: false};
            }
            const response = await deleteEtcdConfig(id);
            if (response.id == 0) {
                message.error('Failed to create EtcdConfig');
                return {success: false};
            } else {
                message.success('EtcdConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create EtcdConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    return {
        etcdconfigreq,
        etcdconfiglist,
        refreshEtcdConfigList,
        createEtcdConfigData,
        updateEtcdConfigData,
        deleteEtcdConfigData,
        fetchEtcdConfigList
    };
}