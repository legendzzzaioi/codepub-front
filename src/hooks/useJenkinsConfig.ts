import {ref} from 'vue'
import {
    getJenkinsConfig,
    createJenkinsConfig,
    updateJenkinsConfig,
    deleteJenkinsConfig,
    JenkinsConfigResp,
    JenkinsConfigReq
} from '../api/jenkinsConfig';
import {message} from "ant-design-vue";


// 定义如下增删改查hooks
export function useJenkinsConfig() {
    const jenkinsconfigreq = ref<JenkinsConfigReq>({name: '', url: '', username: '', password: ''});
    const jenkinsconfiglist = ref<JenkinsConfigResp[]>([]);

    const fetchJenkinsConfigList = async () => {
        try {
            jenkinsconfiglist.value = await getJenkinsConfig();
        } catch (error) {
            jenkinsconfiglist.value = [];
            message.error('Failed to get JenkinsConfigList: ' + error.response.data.error);
        }
    };

    const refreshJenkinsConfigList = async () => {
        try {
            jenkinsconfiglist.value = await getJenkinsConfig();
            message.success('Jenkins Config list refreshed successfully.', 5);
        } catch (error) {
            jenkinsconfiglist.value = [];
            message.error('Failed to get JenkinsConfigList: ' + error.response.data.error);
        }
    };

    const createJenkinsConfigData = async (req: JenkinsConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await createJenkinsConfig(req);
            if (response.id == 0) {
                message.error('Failed to create JenkinsConfig');
                return {success: false};
            } else {
                message.success('JenkinsConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to create JenkinsConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const updateJenkinsConfigData = async (id: number, req: JenkinsConfigReq): Promise<{ success: boolean }> => {
        try {
            if (!req.name || !req.url) {
                message.error('name or url is required');
                return {success: false};
            }
            const response = await updateJenkinsConfig(id, req);
            if (response.id == 0) {
                message.error('Failed to create JenkinsConfig');
                return {success: false};
            } else {
                message.success('JenkinsConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create JenkinsConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    const deleteJenkinsConfigData = async (id: number): Promise<{ success: boolean }> => {
        try {
            if (!id) {
                message.error('id is required');
                return {success: false};
            }
            const response = await deleteJenkinsConfig(id);
            if (response.id == 0) {
                message.error('Failed to create JenkinsConfig');
                return {success: false};
            } else {
                message.success('JenkinsConfig created successfully.');
                return {success: true};
            }
        } catch (error) {
            message.error('Failed to create JenkinsConfig:' + error.response.data.error);
            return {success: false};
        }
    };

    return {
        jenkinsconfigreq,
        jenkinsconfiglist,
        refreshJenkinsConfigList,
        createJenkinsConfigData,
        updateJenkinsConfigData,
        deleteJenkinsConfigData,
        fetchJenkinsConfigList
    };
}