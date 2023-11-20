import React from "react";
import logo from "../../include/images/logo-bw.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="footer-container d-flex flex-wrap">
              <div class="fc-left">
                <div class="footer-logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <p>
                  440 Louisiana Street Suite 550,
                  <br /> Houston, TX 77002{" "}
                </p>
                {/* <ul class="social-media-list d-flex flex-wrap">
                  <li class="social-media-item">
                    <a href="#" class="social-media-box">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li class="social-media-item">
                    <a href="#" class="social-media-box">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li class="social-media-item">
                    <a href="#" class="social-media-box">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
              <div class="fc-right d-flex flex-wrap">
                <div class="footer-menu-content fc-right1">
                  <h6>Contact Us</h6>
                  <ul class="footer-menu-list">
                    <li class="footer-menu-item">
                      <a href="tel:7132299000" class="footer-menu-box">
                        Phone : 713 229 9000{" "}
                      </a>
                    </li>
                    <li class="footer-menu-item">
                      <a href="#!" class="footer-menu-box">
                        Fax : 973 556 1328
                      </a>
                    </li>
                    <li class="footer-menu-item">
                      <a
                        href="mailto:info@environmentalInclusion.com"
                        class="footer-menu-box"
                      >
                        Email : info@environmentalInclusion.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="footer-menu-content fc-right2">
                  <h6>Support</h6>
                  <ul class="footer-menu-list">
                    <li class="footer-menu-item">
                      <Link to="/terms-and-conditions" class="footer-menu-box">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="privacy-policy" class="footer-menu-box">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="footer-menu-content fc-right3">
                  <h6>Menu</h6>
                  <ul class="footer-menu-list">
                    <li class="footer-menu-item">
                      <Link to="/" class="footer-menu-box">
                        Home
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/endangered-species" class="footer-menu-box">
                        Endangered Species
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/regions" class="footer-menu-box">
                        Regions
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/organizations" class="footer-menu-box">
                        Organizations
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link
                        to="/zoos-and-wildlife-preserves"
                        class="footer-menu-box"
                      >
                        Zoos & Wildlife Reserves
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/war-on-the-environment-threats" class="footer-menu-box">
                      War on the Environment- Threats
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/science-education" class="footer-menu-box">
                        Science & Educations
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/environmentalists" class="footer-menu-box">
                      Environmentalists
                      </Link>
                    </li>
                    {/* <li class="footer-menu-item">
                      <Link to="/news" class="footer-menu-box">
                        News
                      </Link>
                    </li>
                    <li class="footer-menu-item">
                      <Link to="/blog" class="footer-menu-box">
                        Blogs
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div class="footer-lower d-flex flex-wrap footer-align" style={{borderTop:"0", marginTop:"0px"}}></div>
            <div class="footer-credit d-flex justify-content-end align-items-center">
              <p> &copy; Environmental Inclusion. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
