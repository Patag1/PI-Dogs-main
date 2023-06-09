import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Error from './components/Error';
import Navbar from './components/Navbar';
import TempsCSS from '../styles/Temps.module.css'
import DogDetailCSS from '../styles/DogDetail.module.css'
import Icons from './components/Icons';
import Bone from '../images/bone.png';

const Temperaments = () => {
  const [error, setError] = useState({
    error: false,
    message: ''
  });

  const loading = useSelector(state => state.temps)
  const temps = useSelector(state => state.temps)

  return (
    <>
      {
        loading ? (<Loading />) : error.error ? (<Error msg={error.message} />) : (
          <div className={TempsCSS.body}>
            <Link to='/dogs' className={DogDetailCSS.back}>
              <Icons.ArrowBigLeft size={40} color='white' />
            </Link>

            <Navbar />

            <div className={TempsCSS.container}>
              <div className={TempsCSS.header}>
                <h1>Temperaments</h1>
                <img className={TempsCSS.bone} src={Bone} alt="bone" />
              </div>
              <div className={TempsCSS.temps}>
                {
                  temps.map((temp, index) => (
                      <div key={index} className={TempsCSS.temp}>
                        <p>{temp.name}</p>
                        <Icons.ChevronLeft className={TempsCSS.arrow} size={15} color='black' />
                      </div>
                    )
                  )
                }
              </div>
            </div>

          </div>
        )
      }
    </>
  )
}

export default Temperaments