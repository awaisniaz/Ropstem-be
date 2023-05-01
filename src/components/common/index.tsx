import './style.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../Axios/axios'
type propstype = {
  type: String
}
function LoginSignup(props: propstype) {

  const navigate = useNavigate()
  let data_fields =
    props.type == 'login'
      ? [
        {
          type: 'input',
          placeHolder: 'Enter a Email',
          name: 'email',
          title: ''
        },
        {
          type: 'input',
          placeHolder: 'Enter Your Password',
          name: 'password',
          title: ''
        },
        {
          type: 'btn',
          placeHolder: 'Login',
          name: 'login',
          title: 'Login'
        }
      ]
      : [
        {
          type: 'input',
          placeHolder: 'Enter a Email',
          name: 'email',
          title: ''
        },
        {
          type: 'btn',
          placeHolder: '',
          name: 'signup',
          title: 'Signup'
        }
      ]

  let [user_data, setUserdata] = useState({})
  let [error, setError] = useState({
    error: '',
    type: ''
  })

  const enter_userdata = (name: string, value: string) => {
    setUserdata({
      [name]: value,
      ...user_data
    })
  }

  const setMessage = (message: string, type: string) => {
    setError({
      error: message,
      type: type
    })

    setTimeout(() => {
      setError({
        error: '',
        type: ''
      })
    }, 3000)

  }
  const loginOrRegister = () => {
    if (Object.keys(user_data).length == 0) {
      setMessage('Please Enter a Data', 'Warning')
      return
    }


    let url = props.type == "login" ? "user/login" : "user/register"
    axios
      .post(
        url,
        user_data,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
          }
        }
      )
      .then(data => {
        console.log(data)
        if (props.type == "login") {
          localStorage.setItem('loginuser', JSON.stringify(data.data.data))
          navigate('/dashboard')
        }
        else {
          setMessage(data.data.message, 'Success')
        }

      })
      .catch(err => {
        setMessage(err.message, 'Error')
      })

  }
  return (
    <div className='main-container'>
      <div className='data-fields-container'>
        <h3 className='title'>{props.type}</h3>
        {
          data_fields?.map(item => {
            if (item.type == "input") {
              return <input className='user-input' placeholder={item?.placeHolder} name={item.name
              }
                onChange={(e) => {
                  enter_userdata(e.target.name, e.target.value)
                }}

              ></input>
            }
            else {
              return <button className='user-btn' onClick={loginOrRegister}>{item?.title}</button>
            }
          })
        }

        <Link to={props.type != "login" ? '/login' : "/signup"}>{props.type == "login" ? "Signup" : "Login"}</Link>

        <p className={error.type}>{error.error}</p>
      </div>
    </div>
  )
}

export default LoginSignup
