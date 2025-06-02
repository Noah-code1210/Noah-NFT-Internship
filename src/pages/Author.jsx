import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Follow")
  const [followCount, setFollowCount] = useState(['506'])

  function buttonChange() {
    setButtonText('Unfollow')
    setFollowCount(post.followers + 1)
  }

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    fetchPost();
  }, []);

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
              {loading ? (
                <div className="author__skeleton">
                  <div className="author__pfp--wrapper">
                    <div className="author__pfp">
                      <i className="fa fa-check skeleton__author--check"></i>
                    </div>
                    <div className="author__name"></div>
                    <div className="author__tag"></div>
                    <div className="author__address"></div>
                  </div>
                  <div className="author__followers--wrapper">
                    <div className="follower__count"></div>
                    <div className="follow__btn"></div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={post.authorImage} alt="" />

                        <i className="fa fa-check author-check"></i>
                        <div className="profile_name">
                          <h4>
                            {post.authorName}
                            <span className="profile_username">
                              @{post.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {post.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followCount} followers
                        </div>
                        <button to="#" className="btn-main" onClick={buttonChange}>
                          {buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
