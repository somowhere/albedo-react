import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select, Radio } from 'antd'
import { parseJsonItemForm } from 'utils'

const RadioGroup = Radio.Group
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  sysStatus,sysYesNo,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  const parseSearchObj = (fields) => {
    let search = [
      { fieldName: 'name',
        value: fields.loginId,
      }, { fieldName: 'status',
        operate: 'in',
        value: (fields.status instanceof Object ? fields.status.target.value : fields.status),
      },
    ]
    return search
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(parseJsonItemForm(parseSearchObj(fields)))
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(parseJsonItemForm(parseSearchObj(fields)))
  }
  const { name, sysData, status } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <FilterItem label="名称">
          {getFieldDecorator('name', { initialValue: name })(<Search size="large" onSearch={handleSubmit} />)}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <FilterItem label="状态">
          {getFieldDecorator('status', { initialValue: status })(
            <RadioGroup options={sysStatus} onChange={handleChange.bind(null, 'status')} />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Switch style={{ marginRight: 16 }} size="large" defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'Motion'} unCheckedChildren={'Motion'} />
            <Button size="large" type="ghost" onClick={onAdd}>创建</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
