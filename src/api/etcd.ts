import apiClient from "./apiClient";

// 定义获取的指定key的value响应接口
export interface GetEtcdValueResp {
    value: string;
}

// 定义etcd创建或修改的请求接口
export interface SaveEtcdReq {
    key: string;
    value: string;
}

// 定义如下增删改查接口
export const getEtcdKeys = async (name: string): Promise<[]> => {
    const {data} = await apiClient.get<[]>(`/etcd/key/${name}`)
    return data;
}

export const getEtcdValue = async (name: string, key: string): Promise<GetEtcdValueResp> => {
    const {data} = await apiClient.get<GetEtcdValueResp>(`/etcd/value/${name}?key=${key}`);
    return data;
}

export const saveEtcd = async (name: string, req: SaveEtcdReq): Promise<void> => {
    const {data} = await apiClient.post(`/etcd/config/${name}`, req)
    return data;
}

export const deleteEtcd = async (name: string, key: string): Promise<void> => {
    const {data} = await apiClient.delete(`/etcd/key/${name}?key=${key}`);
    return data;
}