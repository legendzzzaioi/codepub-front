import {ref} from 'vue';
import {
    ExecMysqlReq,
    execMysql
} from '../api/mysql'
import {message} from "ant-design-vue";

// 定义如下执行的hooks
export function useEtcd(){
    const mysqlsqlreq = ref<ExecMysqlReq>({sql: ''});

    const execMysqlSql = async (name: string, mysqlsqlreq: ExecMysqlReq) =>{
        try {
            await execMysql(name, mysqlsqlreq);
        } catch (error) {
            message.error('Failed to exec SQL: ' + error.response.data.error);
        }
    };

    return {
        mysqlsqlreq,
        execMysqlSql
    };
}