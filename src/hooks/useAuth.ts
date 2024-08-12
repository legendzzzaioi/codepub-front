import {ref} from 'vue';
import {LoginReq, login, logout} from '../api/auth';
import {message} from 'ant-design-vue';

export const useAuth = () => {
    const loginReq = ref<LoginReq>({username: '', password: ''});
    const isLogin = ref<boolean>(!!localStorage.getItem('session'));

    const loginHandler = async () => {
        try {
            if (!loginReq.value.username || !loginReq.value.password) {
                message.error('username or password cannot be empty');
                return {success: false};
            }
            try {
                await login(loginReq.value);
                isLogin.value = true;
                message.success('Login successfully!');
            } catch (error) {
                message.error(error.response);
            }
        } catch (error) {
            if (error.response) {
                message.error(error.response);
                return
            }
            message.error('Failed to login: ' + error);
        }
    };

    const logoutHandler = async () => {
        try {
            await logout();
            localStorage.removeItem('session');
            isLogin.value = false;
            message.success('Logout successfully!');
        } catch (error) {
            message.error(error.response);
        }
    }

    return {loginReq, loginHandler, logoutHandler, isLogin};
}
