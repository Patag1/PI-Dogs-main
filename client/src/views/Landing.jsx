import React from 'react'
import { Link } from 'react-router-dom'
import LandingCSS from '../styles/Landing.module.css';
import { Dog } from 'lucide-react'

const Landing = () => {
    return (
        <div className={LandingCSS.body}>
            <h1 className={LandingCSS.h1}>Welcome to <span className={LandingCSS.span}>Paws</span></h1>
            <div className={LandingCSS.flexrow}>
                <div className={LandingCSS.flex}>
                    <p className={LandingCSS.p}>Paws is a web application that allows users to post new dog types, add their unique features and personalities</p>
                    <Link to={'/dogs'} className={LandingCSS.btn}>ENTER</Link>
                </div>
                <Dog className={LandingCSS.logo} color='black' size={200} />
            </div>
        </div>
    )
}

export default Landing