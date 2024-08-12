import apiClient from './apiClient';

// 定义创建User接口
export interface CreateUserReq {
    username: string;
    password: string;
}

// 定义获取User列表接口
export interface GetUserResp {
    id: number;
    username: string;
}

// 定义更新User角色接口
export interface UpdateUserReq {
    username: string;
    password: string;
}

export const getUsers = async (): Promise<GetUserResp[]> => {
    const { data } = await apiClient.get<GetUserResp[]>('/user');
    return data;
};

export const createUser = async (req: CreateUserReq): Promise<void> => {
    const { data } = await apiClient.post('/user', req);
    return data;
};

export const updateUser = async (id: string,req: UpdateUserReq): Promise<void> => {
    const { data } = await apiClient.put(`/user/${id}`, req);
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    const { data } = await apiClient.delete(`/user/${id}`);
    return data;
};

export const getUserInfo = async (): Promise<GetUserResp> => {
    const { data } = await apiClient.get<GetUserResp>('/user_info');
    return data;
};