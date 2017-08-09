import React from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import {arrayToTree} from "utils"

const TreeShow = ({ treeOrgData }) => {
  console.log(treeOrgData)
  const orgTree = arrayToTree(treeOrgData, 'id', 'pid')
  return (
    <div>
      <Tree loadData={orgTree} />
    </div>
  )
}

TreeShow.propTypes = {
  treeOrgData: PropTypes.object,
}

export default TreeShow
