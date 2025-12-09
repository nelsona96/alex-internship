import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/slick-styles.css";
import PrevArrow from "../UI/PrevArrow";
import NextArrow from "../UI/NextArrow";
import ItemCard from "../UI/ItemCard";

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
          {error ? (
            <div className="text-center">Error: {error.message}</div>
          ) : (
            <div
              data-aos="fade-in"
              data-aos-duration="300"
              data-aos-easing="ease-in"
              className="slider-container"
            >
              <Slider {...settings}>
                {loading
                  ? [...Array(7)].map((_, index) => (
                      <ItemCard key={index} loading={loading} />
                    ))
                  : data?.map((item) => (
                      <ItemCard key={item.id} item={item} loading={loading} />
                    ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
