import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const options = {
    items: 4,
    margin: 24,
    loop: true,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      428: {
        items: 2,
      },
      768: {
        items: 3,
      },
      980: {
        items: 4,
      },
    },
  };

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

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
          {hotCollections?.length > 0 && (
            <OwlCarousel className="owl-carousel" {...options}>
              {hotCollections?.map((hotCollection) => (
                <div
                  // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  className="collection"
                  key={hotCollection.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={hotCollection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={hotCollection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hotCollection.title}</h4>
                      </Link>
                      <span>ERC-{hotCollection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
