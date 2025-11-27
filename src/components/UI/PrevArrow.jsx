import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function PrevArrow(props) {
  return (
    <button
      className="custom-arrow prev"
      onClick={props.onClick}
      style={props.centerButton && { transform: "translateY(-50%)" }}
    >
      <IoIosArrowBack />
    </button>
  );
}
