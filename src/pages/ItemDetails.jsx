import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      console.log(data)
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="item__skeleton">
                  <div className="item__bg"></div>
                  <div className="item__info--wrapper">
                    <div className="item__title"></div>
                    <div className="item__likes"></div>
                    <div className="item__views"></div>
                    <div className="item__description"></div>
                    <div className="item__owner"></div>
                    <div className="item__owner--pfp">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="item__owner--name"></div>
                    <div className="item__creator"></div>
                    <div className="item__creator--pfp">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="item__creator--name"></div>
                    <div className="item__price"></div>
                    <div className="item__price--name"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={post.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{post.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {post.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {post.likes}
                        </div>
                      </div>
                      <p>{post.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${post.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={post.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${post.ownerId}`}>
                                {post.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${post.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={post.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${post.creatorId}`}>
                                {post.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{post.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
