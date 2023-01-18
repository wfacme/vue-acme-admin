import userSetting from '~/settting';

interface Copyright {
    //版权信息
    content: String,
}

export interface Setting {
    //程序名称
    title?: String,
    //菜单展开
    collapse?: boolean,
    //版权信息
    copyright?: Copyright,
}

const Settings: Setting = Object.assign({
    title: 'Acme Admin 框架',
    collapse: false,
}, userSetting);

export default Settings;