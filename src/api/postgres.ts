import apiClient from "./apiClient";

// 定义执行sql的请求接口
export interface ExecPostgresReq {
    sql: string;
}

// 定义如下执行接口
export const execPostgres = async (name: string, req: ExecPostgresReq): Promise<void> => {
    const {data} = await apiClient.post(`/postgres/sql/${name}`, req)
    return data;
}
