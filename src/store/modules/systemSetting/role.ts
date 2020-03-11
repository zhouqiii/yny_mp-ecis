import { roleList } from '@/api/role';
const Role = {
    state: {
    },
    actions: {
        RoleList({ commit }: { commit: any }, obj: any) {
            return roleList();
        }
    },
    mutations: {
    },
    getters: {
    }
};
export default Role;
