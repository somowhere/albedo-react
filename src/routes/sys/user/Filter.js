import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import city from '../../../utils/city'
import { parseJsonItemForm } from 'utils'

const Search = Input.Search
const { RangePicker } = DatePicker

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
  const handleFields = (fields) => {
    const { lastModifiedDate } = fields
    if (lastModifiedDate.length) {
      fields.lastModifiedDate = [lastModifiedDate[0].format('YYYY-MM-DD'), lastModifiedDate[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    let search = [
      {fieldName: 'loginId',
        analytiColumnPrefix: 'a',
        value: fields['loginId'],
      },{fieldName: 'a.status_',
        operate: 'in',
        value: fields['status'],
      },{fieldName: 'lastModifiedDate',
        analytiColumnPrefix: 'a',
        operate: 'between',
        value: fields['lastModifiedDate'][0],
        endValue: fields['lastModifiedDate'][1],

      },
    ]
    onFilterChange(parseJsonItemForm(search))
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
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, status } = filter

  let initialCreateTime = []
  if (filter.lastModifiedDate && filter.lastModifiedDate[0]) {
    initialCreateTime[0] = moment(filter.lastModifiedDate[0])
  }
  if (filter.lastModifiedDate && filter.lastModifiedDate[1]) {
    initialCreateTime[1] = moment(filter.lastModifiedDate[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <FilterItem label="登录编号">
          {getFieldDecorator('loginId', { initialValue: name })(<Search size="large" onSearch={handleSubmit} />)}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        <FilterItem label="状态">
        {getFieldDecorator('status', { initialValue: status })(
          <Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            onChange={handleChange.bind(null, 'status')}
          />)}
        </FilterItem>
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <FilterItem label="修改时间">
          {getFieldDecorator('lastModifiedDate', { initialValue: initialCreateTime })(
            <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'lastModifiedDate')} />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
            <Button size="large" onClick={handleReset}>Reset</Button>
          </div>
          <div>
            <Switch style={{ marginRight: 16 }} size="large" defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'Motion'} unCheckedChildren={'Motion'} />
            <Button size="large" type="ghost" onClick={onAdd}>Create</Button>
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
