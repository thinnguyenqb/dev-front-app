import React from 'react'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
        style={{background: "#0008", color: "white", top: 0, left: 0, zIndex: 50}}>
          <div className="svg-loader">
              <svg className="svg-container" height="100" width="100" viewBox="0 0 100 100">
                  <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
                  <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
              </svg>
          </div>
                      
        </div>
    )
}

export default Loading