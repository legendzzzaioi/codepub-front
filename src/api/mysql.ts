import apiClient from "./apiClient";

// 定义执行sql的请求接口
export interface ExecMysqlReq {
    sql: string;
}

// 定义如下执行接口
export const execMysql = async (name: string, req: ExecMysqlReq): Promise<void> => {
    const {data} = await apiClient.post(`/mysql/sql/${name}`, req)
    return data;
}
