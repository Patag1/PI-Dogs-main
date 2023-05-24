import React from 'react'
import Icons from './Icons'
import LoadingCSS from '../../styles/Loading.module.css'

const Loading = () => {
    return (
        <div className={LoadingCSS.body}>
            <h1 className={LoadingCSS.h2}>Loading...</h1>
            <Icons.Dog className={LoadingCSS.icon} size={200} color='black' />
        </div>
    )
}

export default Loading