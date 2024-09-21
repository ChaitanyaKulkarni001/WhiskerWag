import React from 'react'
import Form from './Form'

  const Register = () => {
    return (
      <div >
          <Form  route='/api/user/register/' method='register' />
        {/* <h1>Register</h1> page */}
      </div>
    )
  }

  export default Register
