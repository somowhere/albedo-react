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
    dashboard: `${APIV1}/dashboard`,
    userModule: {
      user: `${APIV1}/sys/user/`,
      info: `${APIV1}/sys/user/:id`,
      remove: `${APIV1}/sys/user/delete/:ids`,
      lock: `${APIV1}/sys/user/lock/:ids`,
    },
    roleModule: {
      role: `${APIV1}/sys/role/`,
      select: `${APIV1}/sys/role/findSelectData`,
      info: `${APIV1}/sys/role/:id`,
      remove: `${APIV1}/sys/role/delete/:ids`,
      lock: `${APIV1}/sys/role/lock/:ids`,
    },
    orgModule: {
      org: `${APIV1}/sys/org/`,
      tree: `${APIV1}/sys/org/findTreeData`,
      info: `${APIV1}/sys/org/:id`,
      remove: `${APIV1}/sys/org/delete/:ids`,
      lock: `${APIV1}/sys/org/lock/:ids`,
    },
    moduleModule: {
      module: `${APIV1}/sys/module/`,
      tree: `${APIV1}/sys/module/findTreeData`,
      info: `${APIV1}/sys/module/:id`,
      remove: `${APIV1}/sys/module/delete/:ids`,
      lock: `${APIV1}/sys/module/lock/:ids`,
    },
    dictModule: {
      dict: `${APIV1}/sys/dict/`,
      select: `${APIV1}/sys/dict/findSelectData`,
      info: `${APIV1}/sys/dict/:id`,
      remove: `${APIV1}/sys/dict/delete/:ids`,
      lock: `${APIV1}/sys/dict/lock/:ids`,
    },
  },
}
