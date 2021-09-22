import React from "react";
import Contacts from "../components/content/Contacts"

const Contact = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "50px"
    }}>
      <div className="col-md-10" >
        <Contacts />
      </div>
    </div>
  )
}

export default Contact
