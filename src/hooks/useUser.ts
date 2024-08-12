import {ref} from 'vue';
import {
    createUser,
    CreateUserReq,
    deleteUser,
    GetUserResp,
    getUsers,
    updateUser,
    UpdateUserReq,
    getUserInfo
} from '../api/users';
import {message} from 'ant-design-vue';


export function useUser() {
    const createuser = ref<CreateUserReq>({username: '', password: ''});
    const updateuser = ref<UpdateUserReq>({username: '', password: ''});
    const user = ref<GetUserResp[]>([]);
    const userinfo = ref<GetUserResp>({username: '', id: 0});

    const fetchUser = async () => {
        try {
            user.value = await getUsers();
        } catch (error) {
            user.value = [];
            message.error('Failed to fetch users: ' + error.response.data.error.trim());
        }
    };

    const refreshUserList = async () => {
        try {
            user.value = await getUsers();
            message.success('User list refreshed successfully', 5);
        } catch (error) {
            user.value = [];
            if (error.response?.status === 400 && error.response.data.trim() === 'no users found') {
                message.success('User list refreshed successfully', 5);
                return
            }
            message.error('Failed to refresh user list: ' + error.response.data.error.trim());
        }
    }

    const createUserData = async (user: CreateUserReq): Promise<{ success: boolean }> => {
        try {
            if (!user.password || !user.username) {
                message.error('username or password is empty');
                return {success: false};
            }
            await createUser(user);
            message.success('User created successfully', 5);
            return {success: true};
        } catch (error) {
            message.error('Failed to create user: ' + error.response.data.error.trim());
            return {success: false};
        }
    };

    const updateUserData = async (id: string, user: UpdateUserReq): Promise<{ success: boolean }> => {
        try {
            if (!user.username || !user.password) {
                message.error('password is empty');
                return {success: false};
            }
            await updateUser(id, user);
            message.success('User role updated successfully', 5);
            return {success: true};
        } catch (error) {
            message.error('Failed to update user role: ' + error);
            return {success: false};
        }
    };

    const deleteUserById = async (id: string): Promise<{ success: boolean }> => {
        try {
            await deleteUser(id);
            message.success('User deleted successfully', 5);
            return {success: true};
        } catch (error) {
            message.error('Failed to delete user: ' + error.response.data.error.trim());
            return {success: false};
        }
    };

    const getUserInfoData = async () => {
        try {
            userinfo.value = await getUserInfo();
        } catch (error) {
            userinfo.value = {username: '', id: 0};
            message.error('Failed to fetch users: ' + error.response.data.error.trim());
        }
    };

    return {
        user,
        createuser,
        updateuser,
        userinfo,
        fetchUser,
        createUserData,
        updateUserData,
        deleteUserById,
        refreshUserList,
        getUserInfoData
    };

}