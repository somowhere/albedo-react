import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Layout } from 'antd'
const { Sider, Content } = Layout;
import List from './List'
import TreeShow from './TreeShow'
import styles from './index.less'
import Filter from './Filter'
import Modal from './Modal'
import {arrayToTree, queryArray} from "utils";

const User = ({ location, dispatch, org, loading }) => {
  const { list, sysStatus,sysYesNo, treeOrgData, moduleData, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = org
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    sysStatus,
    sysYesNo,
    treeOrgData,
    moduleData,
    maskClosable: false,
    confirmLoading: loading.effects['org/update'],
    title: `${modalType === 'create' ? '添加角色' : '编辑角色'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `org/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'org/hideModal',
      })
    },
  }
  const siderProps = {
    darkTheme: 'light',
  }
  const treeProps = {
    treeOrgData,
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['org/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          size: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'org/delete',
        payload: id,
      })
    },
    onLockItem (id) {
      dispatch({
        type: 'org/lock',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'org/info',
        payload: {
          modalType: 'update',
          id: item.id,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'org/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }
  const filterProps = {
    isMotion,
    sysStatus,
    sysYesNo,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          size: pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: 'sys/org',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: 'sys/org',
      }))
    },
    onAdd () {
      dispatch({
        type: 'org/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'org/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'org/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div>
      <Layout>
        <Sider {...siderProps}>1<TreeShow {...treeProps} /></Sider>
        <Content className="content-inner">
          <Filter {...filterProps} />
          {
            selectedRowKeys.length > 0 &&
            <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
              <Col>
                {`选中 ${selectedRowKeys.length} 项 `}
                <Popconfirm title={'你确定要删除选中列吗?'} placement="left" onConfirm={handleDeleteItems}>
                  <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
                </Popconfirm>
              </Col>
            </Row>
          }
          <List {...listProps} />
          {modalVisible && <Modal {...modalProps} />}
          </Content>
      </Layout>

    </div>
  )
}

User.propTypes = {
  org: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ org, loading }) => ({ org, loading }))(User)
