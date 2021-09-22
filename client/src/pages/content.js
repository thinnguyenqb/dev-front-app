import React from "react";
import CodeOfProduct from "../components/content/CodeOfProduct"

const Content = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "50px"
    }}>
      <div className="col-md-10" >
        <CodeOfProduct />
      </div>
    </div>
  )
}

export default Content
