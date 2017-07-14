const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'albedoBoot',
  prefix: 'albedoBoot',
  footerText: 'albedoBoot  © 2017 somewhere',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/authentication`,
    userLogout: `${APIV1}/logout`,
    account: `${APIV1}/account`,
    dict: `${APIV1}/account`,
    users: `${APIV1}/sys/user/page`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/sys/module/findTreeData`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
