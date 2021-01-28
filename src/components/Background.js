import backgroundImg from "../images/background.jpg";

function Background(props) {
  const bgImg = {
    minWidth: "100%",
    width: "auto",
    height: "100%",
    position: "fixed",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "-10",
  };
  return (
    <div className="general-bg">
      <img style={bgImg} src={backgroundImg} alt="background" />
      {props.children}
    </div>
  );
}

export default Background;
