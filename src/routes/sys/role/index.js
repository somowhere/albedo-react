import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const User = ({ location, dispatch, role, loading }) => {
  const { list, sysStatus,sysYesNo,sysRoleScope, treeOrgData, moduleData, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = role
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    sysStatus,
    sysYesNo,
    sysRoleScope,
    treeOrgData,
    moduleData,
    maskClosable: false,
    confirmLoading: loading.effects['role/update'],
    title: `${modalType === 'create' ? '添加角色' : '编辑角色'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `role/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'role/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['role/query'],
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
        type: 'role/delete',
        payload: id,
      })
    },
    onLockItem (id) {
      dispatch({
        type: 'role/lock',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'role/info',
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
          type: 'role/updateState',
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
        pathname: 'sys/role',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: 'sys/role',
      }))
    },
    onAdd () {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'role/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'role/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
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
    </div>
  )
}

User.propTypes = {
  role: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ role, loading }) => ({ role, loading }))(User)
