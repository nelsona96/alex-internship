import React, { useEffect, useState } from "react";
import axios from "axios";
import TopSeller from "../UI/TopSeller";

const TopSellers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  async function fetchData() {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            data-aos="fade-in"
            data-aos-duration="300"
            data-aos-easing="ease-in"
            className="col-md-12"
          >
            {error ? (
              <div className="text-center">Error: {error.message}</div>
            ) : (
              <ol className="author_list">
                {loading
                  ? [...Array(12)].map((_, index) => (
                      <TopSeller key={index} loading={loading} />
                    ))
                  : data?.map((item) => (
                      <TopSeller key={item.id} item={item} />
                    ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
