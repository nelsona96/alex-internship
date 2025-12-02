import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItem from "../UI/ItemCard";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [visibleCount, setvisibleCount] = useState(8);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

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

  function loadMore() {
    setvisibleCount((prev) => Math.min(prev + 4, data?.length));
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? [...Array(8)].map((_, index) => (
            <NewItem key={index} loading={loading} explore />
          ))
        : data
            .slice(0, visibleCount)
            ?.map((item) => <NewItem key={item.id} item={item} explore />)}

      {loading ||
        (visibleCount < data?.length && (
          <div className="col-md-12 text-center">
            <Link
              to=""
              id="loadmore"
              className="btn-main lead"
              onClick={loadMore}
            >
              Load more
            </Link>
          </div>
        ))}
    </>
  );
};

export default ExploreItems;
