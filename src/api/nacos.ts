import apiClient from "./apiClient";

// 定义获取的tenant响应接口
export interface GetNacosTenantResp {
    namespace: string;
    namespaceShowName: string;
    configCount: number;
}

// 定义获取的dataId响应接口
export interface GetNacosDataIdResp {
    id: string;
    dataId: string;
    group: string;
    content: string;
    tenant: string;
    type: string;
}

// 定义获取的tenant响应接口
export interface GetNacosDataIdReq {
    tenant: string;
    pageSize: number;
}

// 定义nacos创建或修改的请求接口
export interface SaveNacosReq {
    tenant: string;
    dataId: string;
    group: string;
    content: string;
    type: string;
}

// 定义nacos删除的请求接口
export interface DeleteNacosReq {
    tenant: string;
    dataId: string;
    group: string;
}

// 定义如下增删改查接口
export const getNacosTenant = async (name: string): Promise<GetNacosTenantResp[]> => {
    const {data: {data}} = await apiClient.get<{ data: GetNacosTenantResp[] }>(`/nacos/namespace/${name}`)
    return data;
}

export const getNacosDataId = async (name: string, req: GetNacosDataIdReq): Promise<GetNacosDataIdResp[]> => {
    const {data: {pageItems }} = await apiClient.get<{pageItems: GetNacosDataIdResp[]}>(`/nacos/config/${name}?tenant=${req.tenant}&pageSize=${req.pageSize}`);
    return pageItems;
}

export const saveNacosContent = async (name: string, req: SaveNacosReq): Promise<void> => {
    const {data} = await apiClient.post(`/nacos/config/${name}`, req)
    return data;
}

export const deleteNacosDataId = async (name: string, req: DeleteNacosReq): Promise<void> => {
    const {data} = await apiClient.delete(`/nacos/config/${name}?tenant=${req.tenant}&dataId=${req.dataId}&group=${req.group}`);
    return data;
}