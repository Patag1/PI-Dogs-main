import React from 'react'
import { Link } from 'react-router-dom'
import Icons from './Icons'
import ErrorCSS from '../../styles/Error.module.css'

const Error = (props) => {
  return (
    <div className={ErrorCSS.body}>
      <div className={ErrorCSS.container}>
        <Link to='/dogs'>
          <Icons.ArrowBigLeft className={ErrorCSS.back} size={25} color='gray' />
        </Link>
        <div className={ErrorCSS.header}>
          <h1 className={ErrorCSS.h1}>Error</h1>
          <Icons.AlertTriangle size={20} color='white' />
        </div>
        <p className={ErrorCSS.p}>{props.msg}</p>
      </div>
    </div>
  )
}

export default Error
