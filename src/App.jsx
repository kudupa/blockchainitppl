import React from "react";
import { Route, Redirect, Switch, Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Data from "./Data";
import Error from "./Error";
import Singleblock from "./Singleblock";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";

const App = () => {
  const [hash, setHash] = useState(null);
  const getLatestBlock = async () => {
    // let url = "https://blockchain.info/latestblock"
    let url =
      "https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock";
    let res = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Headers":
          "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization",
      },
    });
    let keyhash1 = res["data"]["hash"];
    setHash(keyhash1);
    console.log("Printing hash her");
    console.log(keyhash1);
  };
  useEffect(() => getLatestBlock(), []);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/block" component={Data} />
        <Route
          exact
          path="/singleblock"
          //   component={Singleblock}
          component={() => <Singleblock keyhash={hash} />}
        />
        <Route exact path="/transaction" component={Transaction} />
        <Route component={Error} />
      </Switch>

      {/* <Footer /> */}
    </>
  );
};

export default App;
