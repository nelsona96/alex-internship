import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function TopSeller({ item, loading }) {
  return loading ? (
    <li>
      <div className="author_list_pp">
        <span to="/author">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="author_list_info d-flex flex-column">
        <Skeleton
          width="60%"
          height="16px"
          marginBottom="10px"
          borderRadius="4px"
        />
        <Skeleton width="25%" height="16px" borderRadius="4px" />
      </div>
    </li>
  ) : (
    <li>
      <div className="author_list_pp">
        <Link to={`/author/${item?.authorId}`}>
          <img
            className="lazy pp-author"
            src={item?.authorImage}
            alt={item?.authorName}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${item?.authorId}`}>{item?.authorName}</Link>
        <span>{item?.price} ETH</span>
      </div>
    </li>
  );
}
