import React from 'react'
import LoadingCSS from '../../styles/Loading.module.css'
import Loader from '../../images/loader.gif'

const Loading = () => {
    return (
        <div className={LoadingCSS.body}>
            <div className={LoadingCSS.container}>
                <h1 className={LoadingCSS.h2}>Loading...</h1>
                <img src={Loader} alt="loader-dog" className={LoadingCSS.gif} />
            </div>
        </div>
    )
}

export default Loading