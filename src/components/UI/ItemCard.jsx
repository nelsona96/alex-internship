import { Link } from "react-router-dom";
import Skeleton from "./Skeleton.jsx";
import Countdown from "./Countdown.jsx";

export default function ItemCard({
  item,
  authorImage,
  authorId,
  loading,
  grid,
}) {
  return loading ? (
    <div
      className={
        grid ? "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" : "d-item"
      }
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <div data-bs-toggle="tooltip" data-bs-placement="top">
            <Skeleton width="50px" height="50px" borderRadius="50%" lighter />
            <i className="fa fa-check"></i>
          </div>
        </div>

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Skeleton
            width="100%"
            height="auto"
            borderRadius="8px"
            aspectRatio="3/3"
          />
        </div>
        <div className="nft__item_info">
          <div to="/item-details">
            <Skeleton width="50%" borderRadius="4px" />
          </div>
          <div className="nft__item_price">
            <Skeleton width="30%" borderRadius="4px" />
          </div>
          <div className="nft__item_like">
            <Skeleton width="24px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={
        grid ? "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" : "d-item"
      }
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${item?.authorId || authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={item?.title}
          >
            <img
              className="lazy"
              src={item?.authorImage || authorImage}
              alt=""
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {item?.expiryDate && <Countdown expiry={item?.expiryDate} />}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${item?.nftId}`}>
            <img
              src={item?.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${item?.nftId}`}>
            <h4>{item?.title}</h4>
          </Link>
          <div className="nft__item_price">{item?.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item?.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
