import React from "react";
import { BounceLoader } from "react-spinners"; 

function Loading() {
  return (
    <div className="loading">
      <BounceLoader size={20} color={"hsla(234, 20%, 31%, 1)"}   speedMultiplier={2} loading={true} />
    </div>
  );
}

export default Loading;