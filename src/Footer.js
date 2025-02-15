import React from "react";
import "./Footer.css";

export default function Footer() {
  const date = new Date();

  return (
    <div>
      <footer>
        <section className=" footer-section">
          {/* <div className="info_social">
            <div>
              <a href="">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/11/16/facebook-1834007_1280.png"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a href="">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834013_1280.png"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a href="">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834011_1280.png"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a href="">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/11/16/instagram-1834010_1280.png"
                  alt=""
                />
              </a>
            </div>
          </div> */}
          <p>
            &copy; <span id="displayYear">{date.getFullYear()} </span> All
            Rights Reserved
          </p>
        </section>
      </footer>
    </div>
  );
}
