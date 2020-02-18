import React from "react";
const Mask = ({ reveal, children }) => <span>{reveal ? children : "..."}</span>;
export default Mask;
