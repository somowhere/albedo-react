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
                 treeOrgData,
                 roleSelectData,
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
  const checkPassword = (rule, value, callback) => {
    const password = getFieldsValue().password;
    if (value && value !== password) {
      callback('请重复输入密码!');
    } else {
      callback();
    }
  }
  // 生成树状
  const orgTree = arrayToTree(treeOrgData, 'id', 'pid')
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
        <FormItem label="登录Id" hasFeedback {...formItemLayout}>
          {getFieldDecorator('loginId', {
            initialValue: item.loginId,
            rules: [
              {
                required: true,
                message: '登录Id不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [],
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem label="确认密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                validator: checkPassword
              },
            ],
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem label="联系电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                pattern: /^1[34578]\d{9}$/,
                message: '请输入有效的电话!',
              },
            ],
          })(<Input  />)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入有效的邮箱!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="角色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleIdList', {
            initialValue: item.roleIdList,
            rules: [
              {
                required: true,
                message: '请选择角色',
              },
            ],
          })(<CheckboxGroup options={roleSelectData}/>)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status+'',
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
