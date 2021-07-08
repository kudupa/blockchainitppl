import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Tooltip } from "@material-ui/core";

const Transaction = () => {
  const [blockData, setBlockData] = useState(null);
  const [input, setInput] = useState(null);
  const [urlpass, setUrl] = useState(null);

  const apiCall = async () => {
    // let url = `https://blockchain.info/rawblock/${input}`;
    let url = `https://cors-anywhere.herokuapp.com/https://blockchain.info/rawtx/${input}`;
    console.log("Requested url", url);
    setUrl(url);
    let res = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Headers":
          "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization",
      },
    });
    const resData = res["data"];
    let x = new Date(0);
    let z = x.setUTCSeconds(resData["time"]);
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
    let y = `${x.getDate()}-${monthNames[x.getMonth()]}-${x.getFullYear()}`;
    const objData = {
      hash: resData["hash"],
      weight: resData["weight"],
      time: y,
      block_index: resData["block_index"],
      size: resData["size"],
      block_height: resData["block_height"],
    };
    setBlockData(objData);
    setInput("");
  };
  const getSingleData = (event) => {
    event.preventDefault();
    console.log("Clicked on Single data");
    apiCall();
  };

  return (
    <>
      <div className="container">
        <form type="submit" onSubmit={getSingleData}>
          <input
            type="text"
            value={input}
            className="inputData"
            placeholder="Enter the transaction to get the details"
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            className="addBtn"
            color="primary"
            onClick={getSingleData}
          >
            Click
          </Button>
        </form>

        {blockData !== null ? (
          <div>
            <h1>Requested Transaction</h1>
            <p>
              <strong>Transaction Weight: </strong>
              {blockData["weight"]}
            </p>
            <p>
              {" "}
              <strong>Current Transaction hash: </strong>
              <Tooltip title="Click on the link to get more details">
                <a
                  target="_blank"
                  href={urlpass.replace(
                    "https://cors-anywhere.herokuapp.com/",
                    ""
                  )}
                >
                  {blockData["hash"]}
                </a>
              </Tooltip>
            </p>
            <p>
              <strong>Date: </strong>
              {blockData["time"]}
            </p>
            <p>
              <strong>Block Index: </strong>
              {blockData["block_index"]}
            </p>
            <p>
              <strong>Transaction block height: </strong>
              {blockData["block_height"]}
            </p>
            <p>
              <strong>Size: </strong>
              {blockData["size"]}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Transaction;
