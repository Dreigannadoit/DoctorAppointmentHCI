import React from 'react'
import { bell } from '../../assets'

const TopBar = ({currentPage = ""}) => {
  return (
    <div className="TopBar">
        <div className="tag">
          <p>{currentPage}</p>
        </div>

        <div className="notification">
          <button>
            <img src={bell} alt="" />
          </button>
        </div>
    </div>
  )
}

export default TopBar