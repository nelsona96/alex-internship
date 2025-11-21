import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function NextArrow(props) {
  return (
    <button
      className="custom-arrow next"
      onClick={props.onClick}
      style={props.centerButton && { transform: "translateY(-50%)" }}
    >
      <IoIosArrowForward />
    </button>
  );
}
