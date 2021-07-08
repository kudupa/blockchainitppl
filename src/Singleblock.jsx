import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useEffect } from "react";
import { Tooltip } from "@material-ui/core";

const Singleblock = (props) => {
  const [blockData, setBlockData] = useState(null);
  const [input, setInput] = useState(null);
  const [urlpass, setUrl] = useState(null);

  const apiCall = async () => {
    //   let url = `https://blockchain.info/rawblock/${input}`;
    let url = `https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/${input}`;
    if (props.keyhash !== undefined) {
    //   url = `https://blockchain.info/rawblock/${props.keyhash}`;
      url = `https://cors-anywhere.herokuapp.com/https://blockchain.info/rawblock/${props.keyhash}`;
    }
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
      height: resData["height"],
      time: y,
      block_index: resData["block_index"],
      size: resData["size"],
      previous_block: resData["prev_block"],
    };
    setBlockData(objData);
    setInput("");
  };
  const getSingleData = (event) => {
    event.preventDefault();
    console.log("Clicked on Single data");
    apiCall();
  };
  useEffect(() => {
    if (input !== undefined) {
      apiCall();
    }
  }, [input]);
  return (
    <>
      <div className="container">
        <form type="submit" onSubmit={getSingleData}>
          <input
            type="text"
            value={input}
            className="inputData"
            placeholder="Enter the block hash"
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
            <h1>Requested Block details are as follows</h1>
            <p>
              <strong>Block Height: </strong>
              {blockData["height"]}
            </p>
            <p>
              {" "}
              <strong>Current Block hash: </strong>
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
              <strong>Previous block hash: </strong>
              {blockData["previous_block"]}
            </p>
            <p>
              <strong>Size: </strong>
              {blockData["size"]}
            </p>
          </div>
        ) : (
          <div className="container">
            <h1>Loading please wait...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Singleblock;
