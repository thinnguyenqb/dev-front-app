import React from 'react'

const FilterPost = () => {
  return (
    <div className="filter_post my-3">
      <div className="filter_post_left">
        <div className="filter_post_item mr-1" style={{fontWeight: "700"}}>
          Latest
        </div>
        <div className="filter_post_item mr-1">
          Trend
        </div>
      </div>
      <div className="filter_post_right">
        <div className="filter_post_item mr-1" style={{fontWeight: "700"}}>
          Weed
        </div>
        <div className="filter_post_item mr-1">
          Month
        </div>
        <div className="filter_post_item mr-1">
          Year
        </div>
      </div>
    </div>
  )
}
export default FilterPost
