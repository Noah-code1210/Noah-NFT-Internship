import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

const HotCollections = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchData();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

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
          <Slider {...settings}>
            {post.map((posts) => (
              <>
                {loading ? (
                  <div className="hotcollections--skeleton">
                    <div className="skeleton__bg--img"></div>
                    <div className="skeleton__pfp--img">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="skeleton__name--section"></div>
                    <div className="skeleton__code--section"></div>
                  </div>
                ) : (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={posts.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={posts.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{posts.title}</h4>
                        </Link>
                        <span>ERC-{posts.code}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
