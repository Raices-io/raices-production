import React from "react";
import { Highlight } from "react-instantsearch-dom";
import styled from "styled-components";
import NumberFormat from "react-number-format";

const StyledHit = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem auto;
  .home-image {
    width: 30%;
    height: 100px;
    border-radius: 5px;
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    margin: 0.5rem 0.5rem;
    overflow: hidden;
  }
  .price-and-rooms {
    display: flex;
    justify-content: space-between;
  }
  .rooms {
    display: flex;
  }
  .hit-name {
    display: block;
    text-overflow: ellipsis;
    min-width: 0;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
    font-size: 1.2rem;
  }
`;
const Hit = ({ hit }) => (
  <StyledHit>
    <img
      className="home-image"
      src={hit.defaultPic}
      align="left"
      alt={hit.title}
    />
    <div className="details">
      <div className="hit-name">
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className="price-and-rooms">
        <div className="rooms">
          {hit.bedrooms} habs &#183; {hit.bathrooms} baños
        </div>
        <div className="hit-price">
          {" "}
          <NumberFormat
            thousandSeparator={true}
            thousandsGroupStyle="wan"
            displayType="text"
            prefix={"$"}
            value={hit.price}
          />
        </div>
      </div>
    </div>
  </StyledHit>
);

export default Hit;
