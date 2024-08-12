import {ref} from 'vue';
import {
    ExecPostgresReq,
    execPostgres
} from '../api/postgres'
import {message} from "ant-design-vue";

// 定义如下执行的hooks
export function useEtcd(){
    const postgressqlreq = ref<ExecPostgresReq>({sql: ''});

    const execPostgresSql = async (name: string, postgressqlreq: ExecPostgresReq) =>{
        try {
            await execPostgres(name, postgressqlreq);
        } catch (error) {
            message.error('Failed to exec SQL: ' + error.response.data.error);
        }
    };

    return {
        postgressqlreq,
        execPostgresSql
    };
}