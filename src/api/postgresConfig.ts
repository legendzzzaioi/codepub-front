import apiClient from './apiClient';

// 定义postgres_config响应接口
export interface PostgresConfigResp{
    id: number;
    name: string;
    url: string;
    username: string;
}

// 定义postgres_config请求接口
export interface PostgresConfigReq{
    name: string;
    url: string;
    username: string;
    password: string;
}

// 定义如下增删改查函数
export const getPostgresConfig = async (): Promise<PostgresConfigResp[]> => {
    const { data } = await apiClient.get<PostgresConfigResp[]>('/postgres_config/list')
    return data;
}

export const createPostgresConfig = async (req: PostgresConfigReq): Promise<PostgresConfigResp> => {
    const { data } = await apiClient.post<PostgresConfigResp>('/postgres_config/list', req)
    return data;
}

export const updatePostgresConfig = async (id: number, req: PostgresConfigReq): Promise<PostgresConfigResp> => {
    const { data } = await apiClient.put<PostgresConfigResp>(`/postgres_config/${id}`, req)
    return data;
}

export const deletePostgresConfig = async (id: number): Promise<any> => {
    const { data } = await apiClient.delete(`/postgres_config/${id}`)
    return data;
}