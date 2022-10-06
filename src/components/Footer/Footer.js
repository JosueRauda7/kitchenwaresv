import "./Footer.css";
import LogoFooter from "../../assets/logo_positivo.png";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

import InstagramLogo from "../../assets/instagram.png";
import FacebookLogo from "../../assets/facebook.png";
import TikTokLogo from "../../assets/tik-tok.png";
import WhatsappLogo from "../../assets/whatsapp.png";

const Footer = (props) => {
  return (
    <div className='Footer'>
      <div className='LogoEsloganFooter'>
        <img className='LogoFooter' src={LogoFooter} />
        <p className='EsloganFooter'>Distinción y calidad en tu mesa</p>
      </div>
      <div className='RedesSociales'>
        <h2>Redes Sociales</h2>
        <div className='SocialMedia'>
          <img src={InstagramLogo} />
          <h3>@kitchenwaresv</h3>
        </div>
        <div className='SocialMedia'>
          <img src={FacebookLogo} />
          <h3>kitchenwaresv</h3>
        </div>
        <div className='SocialMedia'>
          <img src={WhatsappLogo} />
          <h3>7989-6771</h3>
        </div>
        <div className='SocialMedia'>
          <img src={TikTokLogo} />
          <h3>@kitchenwaresv</h3>
        </div>
      </div>
      <div className='Contactanos'>
        <h3>¡Entérate de nuevos productos!</h3>
        <form className='Form'>
          <InputText type='email' />
          <div className='ButtonSubscribe'>
            <Button type='primary'>Suscribirme</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Footer;
