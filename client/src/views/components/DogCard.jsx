import React from 'react'
import { Link } from 'react-router-dom';
import Icons from './Icons';
import DogCardCSS from '../../styles/DogCard.module.css'

const DogCard = props => {
  const {
    id,
    image,
    name,
    temperaments,
    weight,
  } = props.data;

  const wgtDbApi = image === 'image/url' ? weight : `${weight?.metric} kg`;

  // image === 'image/url' && console.log(props.data)

  return (
    <Link to={`/dogs/${id}`} className={DogCardCSS.card}>
      {
        image === 'image/url' ? (
          <div className={DogCardCSS.ctnbadge}>
            <p className={DogCardCSS.badgemsg}>Created by you!</p>
            <Icons.Bone className={DogCardCSS.badge} size={20} color='black' />
          </div>
        ) : []
      }
      <div className={DogCardCSS.imgttl}>
        <div className={DogCardCSS.divimg}>
          {
            image !== 'image/url' ? (
              <img className={DogCardCSS.img} src={image} alt={`${name}${id}`} />
            ) : (
              <img className={DogCardCSS.img} src={process.env.PUBLIC_URL + '/dog.png'} alt="newdog" />
            )
          }
        </div>
        <h1 className={DogCardCSS.h1}>{name}</h1>
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
    </Link>
  )
}

export default DogCard