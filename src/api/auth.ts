import apiClient from './apiClient';

// 定义Login接口
export interface LoginReq {
    username: string;
    password: string;
}

export const login = async (req: LoginReq): Promise<void> => {
    const { data } = await apiClient.post('/login', req);
    return data;
};


export const logout = async () => {
    await apiClient.post('/logout');
}