import {ref} from 'vue'
import {
    getPostgresConfig,
    createPostgresConfig,
    updatePostgresConfig,
    deletePostgresConfig,
    PostgresConfigResp,
    PostgresConfigReq
} from '../api/postgresConfig';
import {message} from "ant-design-vue";


// 定义如下增删改查hooks
export function usePostgresConfig() {
    const postgresconfigreq = ref<PostgresConfigReq>({name: '', url: '', username: '', password: ''});
    const postgresconfiglist = ref<PostgresConfigResp[]>([]);

    const fetchPostgresConfigList = async () => {
        try {
            postgresconfiglist.value = await getPostgresConfig();
        } catch (error) {
            postgresconfiglist.value = [];
            message.error('Failed to get PostgresConfigList: ' + error.response.data.error);
        }
    };

    const refreshPostgresConfigList = async () => {
        try {
            postgresconfiglist.value = await getPostgresConfig();
            message.success('Postgres Config list refreshed successfully.', 5);
        } catch (error) {
            postgresconfiglist.value = [];
            message.error('Failed to get PostgresConfigList: ' + error.response.data.error);
        }
    };

    const createPostgresConfigData = async (req: PostgresConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await createPostgresConfig(req);
            if (response.id == 0) {
                message.error('Failed to create PostgresConfig');
                return {success: false};
            } else {
                message.success('PostgresConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to create PostgresConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const updatePostgresConfigData = async (id: number, req: PostgresConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await updatePostgresConfig(id, req);
            if (response.id == 0) {
                message.error('Failed to create PostgresConfig');
                return {success: false};
            } else {
                message.success('PostgresConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create PostgresConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const deletePostgresConfigData = async (id: number): Promise<{ success: boolean }> => {
        try {
            if (!id) {
                message.error('id is required');
                return {success: false};
            }
            const response = await deletePostgresConfig(id);
            if (response.id == 0) {
                message.error('Failed to create PostgresConfig');
                return {success: false};
            } else {
                message.success('PostgresConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create PostgresConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    return {
        postgresconfigreq,
        postgresconfiglist,
        refreshPostgresConfigList,
        createPostgresConfigData,
        updatePostgresConfigData,
        deletePostgresConfigData,
        fetchPostgresConfigList
    };
}