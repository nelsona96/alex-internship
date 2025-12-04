import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(false);
  const { authorId } = useParams();
  const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`;

  async function fetchData() {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setFollowers(response.data.followers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick() {
    if (following) {
      setFollowing(false);
      setFollowers(data?.followers);
    } else {
      setFollowing(true);
      setFollowers((prev) => prev + 1);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={data?.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton
                              width="180px"
                              height="24px"
                              borderRadius="4px"
                            />
                          ) : (
                            data?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton
                                width="100px"
                                height="20px"
                                borderRadius="4px"
                              />
                            ) : (
                              `@${data?.tag}`
                            )}
                          </span>
                          {loading ? (
                            <Skeleton
                              width="200px"
                              height="20px"
                              borderRadius="4px"
                            />
                          ) : (
                            <>
                              <span id="wallet" className="profile_wallet">
                                {data?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="40px"
                          borderRadius="4px"
                        />
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followers.toLocaleString()} followers
                          </div>
                          <button className="btn-main" onClick={handleClick}>
                            {following ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={data} loading={loading} error={error} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
