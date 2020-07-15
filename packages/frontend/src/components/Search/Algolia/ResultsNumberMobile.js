import React from "react";
import { connectStats } from "react-instantsearch-dom";

const ResultsNumberMobile = ({ nbHits }) => (
  <div className="number-hits">
    <strong>{nbHits}</strong> resultos
  </div>
);

export default connectStats(ResultsNumberMobile);
