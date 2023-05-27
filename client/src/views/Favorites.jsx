import React from 'react'
import { useSelector } from 'react-redux'
import DogCard from './components/DogCard'
import Navbar from './components/Navbar'
import FavsCSS from '../styles/Favs.module.css'

const Favorites = () => {

    const favs = useSelector(state => state.favs);

    console.log(favs);

    return (
        <div className={FavsCSS.body}>
            <Navbar />

            <div className={FavsCSS.container}>
                {
                    favs ? favs.map(fav => (
                        <DogCard key={fav.id} data={fav} />
                    )) : (
                        <h2>You still don't have any favorite dogs!</h2>
                    )
                }
            </div>
        </div>
    )
}

export default Favorites
