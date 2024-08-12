import apiClient from './apiClient';

// 定义mysql_config响应接口
export interface MysqlConfigResp{
    id: number;
    name: string;
    url: string;
    username: string;
}

// 定义mysql_config请求接口
export interface MysqlConfigReq{
    name: string;
    url: string;
    username: string;
    password: string;
}

// 定义如下增删改查函数
export const getMysqlConfig = async (): Promise<MysqlConfigResp[]> => {
    const { data } = await apiClient.get<MysqlConfigResp[]>('/mysql_config/list')
    return data;
}

export const createMysqlConfig = async (req: MysqlConfigReq): Promise<MysqlConfigResp> => {
    const { data } = await apiClient.post<MysqlConfigResp>('/mysql_config/list', req)
    return data;
}

export const updateMysqlConfig = async (id: number, req: MysqlConfigReq): Promise<MysqlConfigResp> => {
    const { data } = await apiClient.put<MysqlConfigResp>(`/mysql_config/${id}`, req)
    return data;
}

export const deleteMysqlConfig = async (id: number): Promise<any> => {
    const { data } = await apiClient.delete(`/mysql_config/${id}`)
    return data;
}