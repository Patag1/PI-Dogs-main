import React from 'react'
import { Link } from 'react-router-dom'
import LandingCSS from '../styles/Landing.module.css';
import Doge from '../images/doge.png';

const Landing = () => {
    return (
        <div className={LandingCSS.body}>
            <img src={Doge} alt='doge' className={LandingCSS.logo} />
            <h1 className={LandingCSS.h1}>Welcome to <span className={LandingCSS.span}>Paws</span></h1>
            <div className={LandingCSS.container}>
                <p className={LandingCSS.p}>Paws is a web application that allows users to post new dog types, add their unique features and personalities</p>
                <Link to={'/dogs'} className={LandingCSS.btn}>ENTER</Link>
            </div>
        </div>
    )
}

export default Landing