import apiClient from './apiClient';

// 定义etcd_config响应接口
export interface EtcdConfigResp{
    id: number;
    name: string;
    url: string;
}

// 定义etcd_config请求接口
export interface EtcdConfigReq{
    name: string;
    url: string;
}

// 定义如下增删改查函数
export const getEtcdConfig = async (): Promise<EtcdConfigResp[]> => {
    const { data } = await apiClient.get<EtcdConfigResp[]>('/etcd_config/list')
    return data;
}

export const createEtcdConfig = async (req: EtcdConfigReq): Promise<EtcdConfigResp> => {
    const { data } = await apiClient.post<EtcdConfigResp>('/etcd_config/list', req)
    return data;
}

export const updateEtcdConfig = async (id: number, req: EtcdConfigReq): Promise<EtcdConfigResp> => {
    const { data } = await apiClient.put<EtcdConfigResp>(`/etcd_config/${id}`, req)
    return data;
}

export const deleteEtcdConfig = async (id: number): Promise<any> => {
    const { data } = await apiClient.delete(`/etcd_config/${id}`)
    return data;
}