import apiClient from './apiClient';

// 定义nacos_config响应接口
export interface NacosConfigResp{
    id: number;
    name: string;
    url: string;
}

// 定义nacos_config请求接口
export interface NacosConfigReq{
    name: string;
    url: string;
}

// 定义如下增删改查函数
export const getNacosConfig = async (): Promise<NacosConfigResp[]> => {
    const { data } = await apiClient.get<NacosConfigResp[]>('/nacos_config/list')
    return data;
}

export const createNacosConfig = async (req: NacosConfigReq): Promise<NacosConfigResp> => {
    const { data } = await apiClient.post<NacosConfigResp>('/nacos_config/list', req)
    return data;
}

export const updateNacosConfig = async (id: number, req: NacosConfigReq): Promise<NacosConfigResp> => {
    const { data } = await apiClient.put<NacosConfigResp>(`/nacos_config/${id}`, req)
    return data;
}

export const deleteNacosConfig = async (id: number): Promise<any> => {
    const { data } = await apiClient.delete(`/nacos_config/${id}`)
    return data;
}