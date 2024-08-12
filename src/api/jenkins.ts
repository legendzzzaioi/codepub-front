import apiClient from "./apiClient";

// 定义获取jobs响应接口
export interface GetJenkinsJobsResp {
    name: string;
}

// 定义获取job构建参数接口
export interface GetJenkinsJobParamResp {
    defaultParameterValue: {
        name: string;
        value: string;
    },
    description: string
}

// 定义参数化构建job请求接口
export interface JenkinsJobParamReq {
    jobName: string;
    params: {};
}

// 定义如下增删改查接口
export const getJenkinsViews = async (name: string): Promise<[]> => {
    const {data} = await apiClient.get<[]>(`/jenkins/view/${name}`)
    return data;
}

export const getJenkinsJobsbyView = async (name: string, viewName: string): Promise<GetJenkinsJobsResp[]> => {
    const {data} = await apiClient.get<GetJenkinsJobsResp[]>(`/jenkins/jobs/${name}?viewName=${viewName}`);
    return data;
}

export const getJenkinsJobParam = async (name: string, jobName: string): Promise<GetJenkinsJobParamResp[]> => {
    const {data} = await apiClient.get<GetJenkinsJobParamResp[]>(`/jenkins/job_param/${name}?jobName=${jobName}`);
    return data;
}

export const buildJenkinsJob = async (name: string, req: JenkinsJobParamReq): Promise<void> => {
    const {data} = await apiClient.put(`/jenkins/job/${name}`, req)
    return data;
}