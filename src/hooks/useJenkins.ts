import {ref} from 'vue';
import {
    GetJenkinsJobsResp,
    GetJenkinsJobParamResp,
    JenkinsJobParamReq,
    getJenkinsViews,
    getJenkinsJobsbyView,
    getJenkinsJobParam,
    buildJenkinsJob
} from '../api/jenkins'
import {message} from "ant-design-vue";

// 定义如下增删改查hooks
export function useJenkins() {
    const jenkinsviews = ref<[]>([]);
    const jenkinsjobs = ref<GetJenkinsJobsResp[]>([]);
    const jenkinsjobparam = ref<GetJenkinsJobParamResp[]>([]);
    const jenkinsbuildparam = ref<JenkinsJobParamReq>({jobName: '', params: {}});


    const fetchJenkinsViewList = async (name: string) => {
        try {
            jenkinsviews.value = await getJenkinsViews(name);
        } catch (error) {
            jenkinsviews.value = []
            message.error('Failed to get Jenkins Views: ' + error.response.data.error);
        }
    };

    const fetchJenkinsJobList = async (name: string, viewName: string) => {
        try {
            jenkinsjobs.value = await getJenkinsJobsbyView(name, viewName);
        } catch (error) {
            jenkinsjobs.value = []
            message.error('Failed to get Jenkins Jobs: ' + error.response.data.error);
        }
    };

    const fetchJenkinsJobParam = async (name: string, jobName: string) => {
        try {
            jenkinsjobparam.value = await getJenkinsJobParam(name, jobName);
        } catch (error) {
            jenkinsjobparam.value = []
            message.error('Failed to get Jenkins Jobs Param: ' + error.response.data.error);
        }
    };

    const buildJenkinsJobParam = async (name: string, req: JenkinsJobParamReq) => {
        try {
            await buildJenkinsJob(name, req);
        } catch (error) {
            message.error('Failed to build Jenkins Jobs: ' + error.response.data.error);
        }
    };

    return {
        jenkinsviews,
        jenkinsjobs,
        jenkinsjobparam,
        jenkinsbuildparam,
        fetchJenkinsViewList,
        fetchJenkinsJobList,
        buildJenkinsJobParam,
        fetchJenkinsJobParam,
    };
}