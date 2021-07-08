import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const Data = (props) => {
  const [latestBlock, setlatestBlock] = useState(null);

  const testGetFun = () => {
    //   let url = "https://blockchain.info/latestblock";
    let url =
      "https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock";
    return async () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Headers":
            "X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method,Access-Control-Request-Headers, Authorization",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let x = new Date(0);
          let z = x.setUTCSeconds(data["time"]);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          let y = `${x.getDate()}-${
            monthNames[x.getMonth()]
          }-${x.getFullYear()}`;
          const dObject = {
            height: data["height"],
            hash: data["hash"],
            time: y,
            block_index: data["block_index"],
            total_transaction: data["txIndexes"].length,
          };
          console.log(dObject);
          setlatestBlock(dObject);
        });
    };
  };

  useEffect(testGetFun(), []);

  return (
    <>
      {latestBlock !== null ? (
        <div className="container">
          <h1>Latest Block details are as follows</h1>
          <p>
            <strong>Block Height: </strong>
            {latestBlock["height"]}
          </p>
          <p>
            {" "}
            <strong>Current Block hash: </strong>
            <Tooltip title="Click on the link to view this block">
              <NavLink
                className="btn-default"
                to={{
                  pathname: "/singleblock",
                  state: { title: latestBlock["hash"] },
                }}
              >
                {latestBlock["hash"]}
              </NavLink>
            </Tooltip>
          </p>
          <p>
            <strong>Date: </strong>
            {latestBlock["time"]}
          </p>
          <p>
            <strong>Block Index: </strong>
            {latestBlock["block_index"]}
          </p>
          <p>
            <strong>Total Transactions: </strong>
            {latestBlock["total_transaction"]}
          </p>
        </div>
      ) : (
        <div className="container">
          <h1>Loading please wait...</h1>
        </div>
      )}
    </>
  );
};

export default Data;
