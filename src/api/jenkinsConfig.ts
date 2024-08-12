import apiClient from './apiClient';

// 定义jenkins_config响应接口
export interface JenkinsConfigResp{
    id: number;
    name: string;
    url: string;
    username: string;
}

// 定义jenkins_config请求接口
export interface JenkinsConfigReq{
    name: string;
    url: string;
    username: string;
    password: string;
}

// 定义如下增删改查函数
export const getJenkinsConfig = async (): Promise<JenkinsConfigResp[]> => {
    const { data } = await apiClient.get<JenkinsConfigResp[]>('/jenkins_config/list')
    return data;
}

export const createJenkinsConfig = async (req: JenkinsConfigReq): Promise<JenkinsConfigResp> => {
    const { data } = await apiClient.post<JenkinsConfigResp>('/jenkins_config/list', req)
    return data;
}

export const updateJenkinsConfig = async (id: number, req: JenkinsConfigReq): Promise<JenkinsConfigResp> => {
    const { data } = await apiClient.put<JenkinsConfigResp>(`/jenkins_config/${id}`, req)
    return data;
}

export const deleteJenkinsConfig = async (id: number): Promise<any> => {
    const { data } = await apiClient.delete(`/jenkins_config/${id}`)
    return data;
}