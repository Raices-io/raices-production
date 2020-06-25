import React from "react";
import { Highlight } from "react-instantsearch-dom";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Link from "next/link";

const StyledHit = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem auto;
  margin-top: 1rem;
  -webkit-box-shadow: 0px 1px 2px 0 rgba(31, 45, 61, 0.15);
  -moz-box-shadow: 0px 1px 2px 0 rgba(31, 45, 61, 0.15);
  box-shadow: 0px 1px 2px 0 rgba(31, 45, 61, 0.15);
  .home-image {
    height: 254px;
    width: 100%;
    min-width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
  }
  .price1234 {
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    overflow: hidden;
  }
  .price-and-rooms {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .city {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color400};
    margin-top: 0.2rem;
  }
  .rooms {
    display: flex;
    margin-top: 0.2rem;
  }
  .hit-name {
    display: block;
    text-overflow: ellipsis;
    min-width: 0;
    /* Required for text-overflow to do anything */
    /* Set to white-space nowrap if you want to truncate */
    white-space: wrap;
    overflow: hidden;
    font-size: 1.2rem;
  }
`;
const Hit = ({ hit }) => (
  <Link href={`/home/${hit.city}/${hit.objectID}`}>
    <StyledHit>
      <img className="home-image" src={hit.defaultPic} />
      <div className="price1234">
        <NumberFormat
          thousandSeparator={true}
          thousandsGroupStyle="thousand"
          displayType="text"
          prefix={"$"}
          value={hit.price}
        />
      </div>
      <div className="details">
        <div className="hit-name">
          <Highlight attribute="title" hit={hit} />
        </div>
        <div className="price-and-rooms">
          <div className="city">{hit.city}</div>
          <div className="rooms">
            {hit.bedrooms} habs &#183; {hit.bathrooms} baños
          </div>
        </div>
      </div>
    </StyledHit>
  </Link>
);

export default Hit;
