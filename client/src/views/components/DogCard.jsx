import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { postFav } from '../../redux/actions';
import Icons from './Icons';
import DogCardCSS from '../../styles/DogCard.module.css'
import DogDb from '../../images/dogDb.png'

const DogCard = props => {
  const {
    id,
    image,
    name,
    temperaments,
    weight,
  } = props.data;

  const [fav, setFav] = useState(false);

  const dispatch = useDispatch();

  const handleFav = (e) => {
    dispatch(postFav(e.target.value))
    setFav(!fav);
  }

  const wgtDbApi = image === 'image/url' ? weight : `${weight?.metric} kg`;

  const favClass = `${DogCardCSS.fav} ${fav ? DogCardCSS.favactive : ''}`;

  return (
    <div className={DogCardCSS.card}>
      {
        isNaN(id) ? (
          <div className={DogCardCSS.ctnbadge}>
            <p className={DogCardCSS.badgemsg}>Created by you!</p>
            <Icons.Bone className={DogCardCSS.badge} size={20} color='black' />
          </div>
        ) : []
      }
      <div className={DogCardCSS.imgttl}>
        <Link to={`/dogs/${id}`} >
          <div className={DogCardCSS.divimg}>
            {
              image !== 'image/url' ? (
                <img className={DogCardCSS.img} src={image} alt={`${name}${id}`} />
              ) : (
                <img className={DogCardCSS.img} src={DogDb} alt="dbdog" />
              )
            }
          </div>
        </Link>
        <div className={DogCardCSS.header}>
          <h1 className={DogCardCSS.h1}>{name}</h1>
          <Icons.Heart value={id} onClick={(e) => handleFav(e)} className={favClass} size={20} color='black' />
        </div>
      </div>
      <div className={DogCardCSS.content}>
        <span className={DogCardCSS.info}>Temperaments <Icons.Info className={DogCardCSS.infoicon} size={20} color='black' />
          <div className={DogCardCSS.temps}>
            {
              !temperaments ? (
                <p>N/A</p>
              ) : temperaments?.map((t, index) => (
                <p key={index}>{t.name}</p>
              ))
            }
          </div>
        </span>
        <p className={DogCardCSS.txt}>Weight: {wgtDbApi}</p>
      </div>
    </div>
  )
}

export default DogCard