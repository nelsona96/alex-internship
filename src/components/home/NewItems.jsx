import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slick-styles.css";
import PrevArrow from "../UI/PrevArrow";
import NextArrow from "../UI/NextArrow";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    waitForAnimate: false,
    swipeToSlide: true,
    prevArrow: <PrevArrow centerButton />,
    nextArrow: <NextArrow centerButton />,
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
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 428,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function fetchData() {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {loading
                ? [...Array(7)].map((_, index) => (
                    <div className="nft__item" key={index}>
                      <div className="author_list_pp">
                        <div data-bs-toggle="tooltip" data-bs-placement="top">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                            lighter
                          />
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
                  ))
                : data?.map((item) => (
                    <div className="nft__item" key={item.id}>
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={item.title}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">5h 30m 32s</div>

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

                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
