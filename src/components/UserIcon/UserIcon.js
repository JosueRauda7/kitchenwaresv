import "./UserIcon.css";
import NoUserImg from "../../assets/usuario.png";
import { urlImages } from "../../apiConfig";

const UserIcon = (props) => {
  return (
    <div className='userIconImage'>
      <img
        className='ImgUserIcon'
        src={
          !props.img ? NoUserImg : `${urlImages}/uploads/usuarios/${props.img}`
        }
      />
    </div>
  );
};

export default UserIcon;
