import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slick-styles.css";
import Skeleton from "../UI/Skeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HotCollections = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    waitForAnimate: false,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 428,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotCollections();
  }, []);

  function PrevArrow(props) {
    return (
      <button className="custom-arrow prev" onClick={props.onClick}>
        <IoIosArrowBack />
      </button>
    );
  }

  function NextArrow(props) {
    return (
      <button className="custom-arrow next" onClick={props.onClick}>
        <IoIosArrowForward />
      </button>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {error ? (
            <div className="text-center">Error: {error.message}</div>
          ) : (
            <div className="slider-container">
              <Slider {...settings}>
                {loading
                  ? [...Array(6)].map((_, index) => (
                      <div className="collection-card" key={index}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Skeleton
                              width="100%"
                              height="auto"
                              aspectRatio="16 / 9"
                            />
                          </div>
                          <div className="nft_coll_pp">
                            <Skeleton
                              width="54px"
                              height="54px"
                              borderRadius="100%"
                              lighter
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info d-flex flex-column align-items-center">
                            <Skeleton
                              width="84px"
                              borderRadius="4px"
                              marginTop="2px"
                              marginBottom="10px"
                            />
                            <Skeleton width="64px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    ))
                  : data?.map((item) => (
                      <div className="collection-card" key={item.id}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${item?.nftId}`}>
                              <img
                                src={item.nftImage}
                                className="lazy img-fluid"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${item?.authorId}`}>
                              <img
                                className="lazy pp-coll"
                                src={item.authorImage}
                                alt=""
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{item.title}</h4>
                            </Link>
                            <span>ERC-{item.code}</span>
                          </div>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
