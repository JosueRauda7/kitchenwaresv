import "./Footer.css";
import LogoFooter from "../../assets/logo_positivo.png";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

import InstagramLogo from "../../assets/instagram.png";
import FacebookLogo from "../../assets/facebook.png";
import TikTokLogo from "../../assets/tik-tok.png";
import WhatsappLogo from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className='Footer'>
      <div className='LogoEsloganFooter'>
        <img className='LogoFooter' src={LogoFooter} />
        <p className='EsloganFooter'>Distinción y calidad en tu mesa</p>
      </div>
      <div className='RedesSociales'>
        <h2>Redes Sociales</h2>
        <a
          href='https://www.instagram.com/kitchenwaresv/'
          className='LinkButton SocialMedia'>
          <img src={InstagramLogo} />
          <h3>@kitchenwaresv</h3>
        </a>
        <a
          href='https://www.facebook.com/profile.php?id=100086324293798'
          className='LinkButton SocialMedia'>
          <img src={FacebookLogo} />
          <h3>kitchenwaresv</h3>
        </a>
        <a href='https://wa.me/50379896771' className='LinkButton SocialMedia'>
          <img src={WhatsappLogo} />
          <h3>7989-6771</h3>
        </a>
        <a
          href='https://www.tiktok.com/@kitchenwaresv'
          className='LinkButton SocialMedia'>
          <img src={TikTokLogo} />
          <h3>@kitchenwaresv</h3>
        </a>
      </div>
      <div className='Contactanos'>
        <h2>¡Entérate de nuevos productos!</h2>
        <form className='Form'>
          <InputText type='email' placeholder='Email' />
          <div className='ButtonSubscribe'>
            <Button type='primary'>Suscribirme</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Footer;
