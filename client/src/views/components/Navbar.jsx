import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Icons from './Icons';
import Form from './Form'
import NavbarCSS from '../../styles/Navbar.module.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
  const links = [{
    name: 'Home',
    path: '/dogs',
  }, {
    name: 'Temperaments',
    path: '/temperaments',
  }, {
    name: 'About',
    path: '/about',
  }];

  const path = useLocation().pathname;

  const [show, setShow] = useState(false);

  return (
    <div className={NavbarCSS.nav}>
      <div className={NavbarCSS.main}>
        <Icons.Dog size={40} color='white' className={NavbarCSS.logo} />
        <div className={NavbarCSS.links}>
          {
            links.map((link, index) => (
              <Link to={link.path} key={index} className={NavbarCSS.link}>{link.name}</Link>
            ))
          }
        </div>
      </div>
      
      <div className={NavbarCSS.formenu}>
        {
          path === '/dogs' ? (
            <>
              {
                show ? (
                  <Icons.Minus size={25} color='white' className={NavbarCSS.minus} onClick={() => setShow(!show)} />
                ) : (
                  <Icons.Plus size={25} color='white' className={NavbarCSS.plus} onClick={() => setShow(!show)} />
                )
              }
            </>
          ) : <></>
        }
        
        <Form show={show} />
      </div>
    </div>
  )
}

export default Navbar