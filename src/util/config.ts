export default class Config {
    /**
     * ACCESS_TOKEN 访问令牌
     */
    public static readonly ACCESS_TOKEN = 'access_token';
    /**
     * REFRESH_TOKEN 访问权限刷新
     */
    public static readonly REFRESH_TOKEN = 'refresh_token';
    /**
     * 管理员信息
     */
    public static readonly ADMININFO = 'admin_info';
    /**
     * 字典
     */
    public static readonly DICT = 'dict';
    /**
     * 菜单
     */
    public static readonly SET_MENU_LIST = 'SET_MENU_LIST';
    /**
     * 病人模版
     */
    public static readonly MEDICALRECORD_TMP = 'MEDICALRECORD_TMP';

    public static readonly LOADING_OPTIONS = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      };
      /**
     * 病人模版
     */
    public static readonly DEPT = 'deptList';
    /**
     * 用户列表
     */
    public static readonly USER_LIST = 'userList';
    /**
     * 诊断
     */
    public static readonly DIAGNOSIS_LIST = 'diagnosisList';
}
