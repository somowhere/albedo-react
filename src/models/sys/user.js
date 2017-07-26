import modelExtend from 'dva-model-extend'
import { page, info, save, doLock, doRemove } from '../../services/sys/user'
import * as dictService from '../../services/sys/dict'
import * as roleService from '../../services/sys/role'
import * as orgService from '../../services/sys/org'
import { pageModel } from '../common'
import { config } from 'utils'
const { prefix } = config

const { dictSelect } = dictService
const { roleSelect } = roleService
const { orgTree } = orgService


export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys/user/') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(page, payload)
      if (data.status=1 && data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.recordsTotal,
            },
          },
        })
        const dictData = yield call(dictSelect, {dictQueries:JSON.stringify([{code: 'sys_status'}])})
        yield put({ type: 'queryData', payload: dictData.data })
        const treeOrgData = yield call(orgTree, {all: true})
        yield put({ type: 'queryData', payload: {
          treeOrgData: treeOrgData.data,
        } })
        const roleSelectData = yield call(roleSelect)
        yield put({ type: 'queryData', payload: {
          roleSelectData: roleSelectData.data,
        } })
      }
    },
    *'info' ({ payload = {} }, { call, put }) {
      const dataItem = yield call(info, { id: payload.id })
        if (dataItem && dataItem.status==1) {
          yield put({
            type: 'showModal',
            payload: {
              modalType: payload.modalType,
              currentItem: dataItem.data,
            },
          })
        }
    },

    *'lock' ({ payload }, { call, put, select }) {
      const data = yield call(doLock, { ids: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.status==1) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(doRemove, { ids: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.status==1) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(doRemove, payload)
      if (data.status==1) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(save, payload)
      if (data.status==1) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(save, newUser)
      if (data.status==1) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.message
      }
    },

  },

  reducers: {
    queryData (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
