import React from "react";
import { NavLink } from "react-router-dom";
import home from "../src/Images/home.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <>
      <section id="header" className="d-flex align-items-center container-md">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 justify-content-center my-4">
                  <h1>
                    Grow your Business with
                    <strong className="brand-name">
                      {" "}BlockChain you can count on
                    </strong>
                  </h1>
                  <h4 className="my-3 mt-4 note">
                    Built by crypto pioneers for speed, reliability, and
                    liquidity.
                  </h4>
                  <div className="mt-3">
                    <NavLink className="btn-default" to="/block">
                      Latest Block
                    </NavLink>
                  </div>

                  <div className="col-lg-8 order-1 order-lg-2 header-img">
                    <img
                      src={home}
                      alt="Unable to load image"
                      className="img-fluid animated img-rounded my-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
