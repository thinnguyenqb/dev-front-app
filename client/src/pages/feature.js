import React from "react";
import Features from "../components/content/Features"

const Feature = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "50px"
    }}>
      <div className="col-md-10" >
        <Features />
      </div>
    </div>
  )
}

export default Feature
