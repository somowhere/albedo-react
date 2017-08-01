import React from "react";
import PropTypes from "prop-types";
import {Checkbox, Form, Input, Modal, Radio, TreeSelect} from "antd";
import {arrayToTree, queryArray} from "utils";

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
                 item = {},
                 sysStatus,
                 sysYesNo,
                 sysRoleScope,
                 treeOrgData,
                 moduleData,
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  // 生成树状
  const orgTree = arrayToTree(treeOrgData, 'id', 'pid')
  const moduleTree = arrayToTree(moduleData, 'id', 'pid')
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="所属组织" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orgId', {
            initialValue: item.orgId,
            rules: [
              {
                required: true,
                message: '所属组织不能为空',
              },
            ],
          })(<TreeSelect
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={orgTree}
            treeDefaultExpandAll
          />)}
        </FormItem>
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '名称不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="数据权限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dataScope', {
            initialValue: item.dataScope,
            rules: [
              {
                required: true,
                message: '请选择数据权限',
              },
            ],
          })(<RadioGroup options={sysRoleScope}/>)}
        </FormItem>

        <FormItem label="是否系统数据" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sysData', {
            initialValue: item.sysData,
            rules: [
              {
                required: true,
                message: '请选择系统数据',
              },
            ],
          })(<RadioGroup options={sysYesNo} value={item.sysData}/>)}
        </FormItem>
        <FormItem label="拥有权限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('moduleIdList', {
            initialValue: item.moduleIdList,
            rules: [
              {
                required: true,
                message: '拥有权限不能为空',
              },
            ],
          })(<TreeSelect
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={moduleTree}
            treeCheckable
            treeDefaultExpandAll
          />)}
        </FormItem>


        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
                message: '请选择状态',
              },
            ],
          })(<RadioGroup options={sysStatus}/>)}
        </FormItem>


        <FormItem label="描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {},
            ],
          })(<TextArea
            size="large"
            style={{width: '100%'}}/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
