import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <h2>NotFound</h2>
      <Link to="/">Back to Homepage</Link>
    </>
  );
}

export default NotFound