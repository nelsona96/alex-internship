import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import EthImage from "../../images/ethereum.svg";

export default function ItemDetailsCard({ data, loading }) {
  return loading ? (
    <>
      <div className="col-md-6 text-center">
        <Skeleton
          width="100%"
          height="510px"
          aspectRatio="4/3"
          borderRadius="8px"
        />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <Skeleton
            width="260px"
            height="40px"
            borderRadius="4px"
            marginBottom="13px"
          />
          <div className="item_info_counts">
            <Skeleton width="80px" height="30px" borderRadius="4px" />
            <Skeleton width="80px" height="30px" borderRadius="4px" />
          </div>
          <Skeleton width="90%" height="16px" borderRadius="4px" />
          <Skeleton width="80%" height="16px" borderRadius="4px" />
          <Skeleton width="60%" height="16px" borderRadius="4px" />
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="author_list_info">
                  <Skeleton width="120px" height="18px" borderRadius="4px" />
                </div>
              </div>
            </div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="author_list_info">
                  <Skeleton width="120px" height="18px" borderRadius="4px" />
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <Skeleton width="120px" height="28px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="col-md-6 text-center">
        <img
          src={data?.nftImage}
          className="img-fluid img-rounded mb-sm-30 nft-image"
          alt=""
        />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2>
            {data?.title} #{data?.tag}
          </h2>

          <div className="item_info_counts">
            <div className="item_info_views">
              <i className="fa fa-eye"></i>
              {data?.views}
            </div>
            <div className="item_info_like">
              <i className="fa fa-heart"></i>
              {data?.likes}
            </div>
          </div>
          <p>{data?.description}</p>
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Link to={`/author/${data?.ownerId}`}>
                    <img className="lazy" src={data?.ownerImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={`/author/${data?.ownerId}`}>{data?.ownerName}</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Link to={`/author/${data?.creatorId}`}>
                    <img className="lazy" src={data?.creatorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={`/author/${data?.creatorId}`}>
                    {data?.creatorName}
                  </Link>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <img src={EthImage} alt="" />
              <span>{data?.price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
