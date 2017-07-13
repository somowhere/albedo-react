const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'albedoBoot',
  prefix: 'albedoBoot',
  footerText: 'albedoBoot  © 2017 somewhere',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://albedoboot.github.io'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/authentication`,
    userLogout: `${APIV1}/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
