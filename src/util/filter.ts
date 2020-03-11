import Config from '@/util/config';
import store from '@/store';
const mpx = {
    install(Vue: any, options: any) {
        Vue.filter('dictFilter', (value: any) => {
            if (!value) {
                return '';
            }
            const dict: any[] = JSON.parse(sessionStorage.getItem(Config.DICT) as any).data.data;
            const dictList = dict.filter((item) => {
                return item.type === value;
            });
            return dictList;
        });
        Vue.filter('dict', (value: any, p: any) => {
            if (!value) {
                return '';
            }
            const df = Vue.filter('dictFilter')(p);
            for (const item of df) {
                if (item.value === value) {
                    return item.label;
                }
            }
        });
        Vue.filter('notNull', (value: any) => {
            return value&&value!=='null' ? value : '';
        });
        Vue.filter('dateFormat',(value: any, p: string)=>new Date(value).format(p));
    }
};
export default mpx;
