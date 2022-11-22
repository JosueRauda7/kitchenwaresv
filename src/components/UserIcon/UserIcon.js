import "./UserIcon.css";
import NoUserImg from "../../assets/usuario.png";
import { urlImagesDevelopment } from "../../apiConfig";

const UserIcon = (props) => {
  return (
    <div className='userIconImage'>
      <img
        className='ImgUserIcon'
        src={
          !props.img
            ? NoUserImg
            : `${urlImagesDevelopment}/uploads/usuarios/${props.img}`
        }
      />
    </div>
  );
};

export default UserIcon;
