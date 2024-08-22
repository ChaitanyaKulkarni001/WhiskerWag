import React from 'react'
import Form from './Form'

console.log("login");

const Login = () => {
  return (
    <div>
      {/* <h1>Login page</h1> */}
      <Form route='/api/token/' method='login' />
    </div>
  )
}

export default Login
