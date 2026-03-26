import React from 'react'
import './Footer.css'
import facebook from '../../assets/face.png'
import telegram from '../../assets/tg.png'
import Instagram from '../../assets/insta.png'
import twitter from '../../assets/twitterx.png'
function Footer(){
    return(
<footer className="footer">
    <ul className="social-icon">
      <li className="social-icon__item"><a className="social-icon__link" href="#">
          <img  src={facebook}></img>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link" href="#">
          <img  src={telegram}></img>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link" href="#">
          <img  src={Instagram}></img>
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link" href="#">
          <img  src={twitter}></img>
        </a></li>
    </ul>
    <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
      <li className="menu__item"><a className="menu__link" href="#">About</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
      <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

    </ul>
    <p>&copy;2021 Nadine Coelho | All Rights Reserved</p>
    
  </footer>
    )
}

export default Footer
