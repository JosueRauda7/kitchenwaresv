import "./WhatsappButton.css";

const WhatsappButton = (props) => {
  return (
    <a
      href='https://wa.me/50379896771?text=Me%20gustaría%20saber%20el%20precio%20del%un%20producto'
      class='whatsapp'
      target='_blank'>
      {" "}
      <i class='fa fa-whatsapp whatsapp-icon'></i>
    </a>
  );
};

export default WhatsappButton;
