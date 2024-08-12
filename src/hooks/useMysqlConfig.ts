import {ref} from 'vue'
import {
    getMysqlConfig,
    createMysqlConfig,
    updateMysqlConfig,
    deleteMysqlConfig,
    MysqlConfigResp,
    MysqlConfigReq
} from '../api/mysqlConfig';
import {message} from "ant-design-vue";


// 定义如下增删改查hooks
export function useMysqlConfig() {
    const mysqlconfigreq = ref<MysqlConfigReq>({name: '', url: '', username: '', password: ''});
    const mysqlconfiglist = ref<MysqlConfigResp[]>([]);

    const fetchMysqlConfigList = async () => {
        try {
            mysqlconfiglist.value = await getMysqlConfig();
        } catch (error) {
            mysqlconfiglist.value = [];
            message.error('Failed to get MysqlConfigList: ' + error.response.data.error);
        }
    };

    const refreshMysqlConfigList = async () => {
        try {
            mysqlconfiglist.value = await getMysqlConfig();
            message.success('Mysql Config list refreshed successfully.', 5);
        } catch (error) {
            mysqlconfiglist.value = [];
            message.error('Failed to get MysqlConfigList: ' + error.response.data.error);
        }
    };

    const createMysqlConfigData = async (req: MysqlConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await createMysqlConfig(req);
            if (response.id == 0) {
                message.error('Failed to create MysqlConfig');
                return {success: false};
            } else {
                message.success('MysqlConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to create MysqlConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const updateMysqlConfigData = async (id: number, req: MysqlConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await updateMysqlConfig(id, req);
            if (response.id == 0) {
                message.error('Failed to create MysqlConfig');
                return {success: false};
            } else {
                message.success('MysqlConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create MysqlConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const deleteMysqlConfigData = async (id: number): Promise<{ success: boolean }> => {
        try {
            if (!id) {
                message.error('id is required');
                return {success: false};
            }
            const response = await deleteMysqlConfig(id);
            if (response.id == 0) {
                message.error('Failed to create MysqlConfig');
                return {success: false};
            } else {
                message.success('MysqlConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create MysqlConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    return {
        mysqlconfigreq,
        mysqlconfiglist,
        refreshMysqlConfigList,
        createMysqlConfigData,
        updateMysqlConfigData,
        deleteMysqlConfigData,
        fetchMysqlConfigList
    };
}