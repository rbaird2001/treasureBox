import React, { useState, useRef, useEffect } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
export default () => {
  const upcInput = useRef(null);
  const [scanState, setScanState] = useState("READY");
  const [UPC, setUPC] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!upcInput.current) return;
    setTimeout(() => upcInput.current.focus());
  }, [upcInput.current]);

  useEffect(() => {
    if (UPC.substring(0, 1) !== "") {
      setScanState("SCANNING");
    }
  }, [UPC.substring(0, 1)]);

  // prevent us from losing focus
  const resetFocus = () => {
    upcInput.current.focus();
  };
  const handleUPCChange = evt => {
    setUPC(evt.target.value);
  };

  const handleEnterKey = evt => {
    if (evt.keyCode === 13) {
      api
        .get(`/upc/search/${UPC}`)
        .then(res => {
          const { names } = res.data;
          if (names.length === 1) {
            history.push(`/search/${names[0]}`);
          } else if(names.length > 1) {
              history.push(`/search/${names.join(',')}?fuzzy=true`)
            //   api.get(`/games/fuzzysearch/${names.join(',')}`).t
          } else {
            setScanState("FAIL");
          }
        })
        .catch((err) => {
            console.log(err);
          setScanState("FAIL");
        });
    }
  };

  const scanText = () => {
    switch (scanState) {
      case "FAIL":
        return "Unable to find a game with that UPC";
      case "SCANNING":
        return "Scanning";
      case "READY":
      default:
        return "Ready To Scan";
    }
  };
  return (
    <div className="jumbotron">
      {scanText()}
      <input
        ref={upcInput}
        onKeyDown={handleEnterKey}
        onBlur={resetFocus}
        onChange={handleUPCChange}
        type="text"
        value={UPC}
        style={{ opacity: 0, filter: "alpha(opacity=0)", width: 0 }}
      />
    </div>
  );
};
