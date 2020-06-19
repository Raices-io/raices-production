import { Fragment, Component, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import NumberFormat from "react-number-format";
import dynamic from "next/dynamic";
import Nouislider from "nouislider-react";

// plugin that creates slider
import Slider from "nouislider";

import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectNumericMenu,
  connectRefinementList,
  connectRange,
  connectStateResults,
  RefinementList,
  NumericMenu,
} from "react-instantsearch-dom";

import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
} from "react-instantsearch-dom-maps";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ID
);

const SearchDropdown = styled.ol`
  background: white;
  overflow-y: scroll;
`;

const StyledHit = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin-top: 0.5rem;
  .media-heading {
    display: block;
    text-overflow: ellipsis;
    min-width: 0;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
  }
  .infos {
    margin-left: 0.3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .picture {
    background-image: url(${(props) => props.homeImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-width: 100%;
    height: 90%;
    min-height: 70px;
    border-radius: 5px;
  }
  .profile {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
  }
  .pictures-wrapper {
    min-width: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledSlider = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: gray;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .header {
    height: 200px;
  }
  .filters {
    display: flex;
    flex: 1;
    .sale_or_rent {
      border: 1px solid red;
      width: 200px;
      height: 100px;
    }
    .city {
      border: 1px solid blue;
      width: 200px;
      height: 100px;
    }
    .price {
      border: 1px solid purple;
      width: 400px;
      height: 100px;
    }
    .beds {
      border: 1px solid yellow;
      width: 100px;
      height: 100px;
    }
    .baths {
      border: 1px solid cyan;
      width: 100px;
      height: 100px;
    }
    .clear {
      border: 1px solid cyan;
      width: 100px;
      height: 100px;
    }
  }
  .results {
    flex-grow: 1;
    background: blue;
    overflow: auto;
  }
  .footer {
    min-height: 60px;
    height: 60px;
    background: red;
  }
  /* Pagination */
  .ais-Pagination {
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .ais-Pagination .ais-Pagination-item {
    display: inline-block;
    border: 1px solid;
    border-radius: 4px;
    padding: 3px;
    margin: 1px;
    border-color: #ddd;
    background: transparent;
  }

  .ais-Pagination-item .ais-Pagination-link {
    display: block;
    color: #ff585b;
    line-height: 30px;
    width: 30px;
    height: 30px;
  }

  .ais-Pagination-item.ais-Pagination-item--selected.ais-Pagination-item--page {
    background: #ff585b;
  }

  .ais-Pagination-item.ais-Pagination-item--selected.ais-Pagination-item--page
    .ais-Pagination-link {
    color: #ffffff;
    border-color: #ff585b;
  }

  .ais-Pagination-item--disabled {
    visibility: hidden;
  }
  /* Rheostat */
  .rheostat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .rheostat {
    height: 24px;
    position: relative;
    overflow: visible;
  }

  .rheostat-background {
    background: #dce0e0;
    height: 2px;
    position: relative;
    top: 14px;
    width: 100%;
  }

  .rheostat-values {
    display: flex;
    width: 300px;
    font-size: 12px;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.6);
  }

  .rheostat--disabled .rheostat-progress {
    background-color: #edefed;
  }

  .rheostat--disabled .rheostat-handle {
    cursor: default;
  }

  .rheostat-progress {
    background-color: #ff585b;
    height: 4px;
    position: absolute;
    top: 13px;
  }

  .rheostat-handle {
    border: 1px solid #ff585b;
    background: #fff;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 24px;
    margin-left: -12px;
    position: absolute;
    z-index: 2;
    width: 24px;
    font-size: 0;
  }
`;

const Hits = connectStateResults(({ searchState, hits }) => {
  return (
    <SearchDropdown onClick={(e) => e.stopPropagation()}>
      {hits.map((hit) => (
        <Hit hit={hit} />
      ))}
    </SearchDropdown>
  );
});
const CustomHits = connectHits(Hits);

const Hit = connectStateResults(({ hit, searchState }) => (
  // <Link href={`/home/${hit.city}/${hit.objectID}`}>
  <div className="hit col-sm-3">
    <StyledHit homeImage={hit.defaultPic}>
      <div className="pictures-wrapper">
        <div className="picture"></div>
      </div>
      <div className="infos">
        <h4 className="media-heading">{hit.title}</h4>
        <p>
          {hit.bedrooms} hab.- {hit.bathrooms} baños{" "}
          <Highlight attribute="country" hit={hit} />
        </p>
        <span>
          {
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="wan"
              displayType="text"
              prefix={"$"}
              value={hit.price}
            />
          }
        </span>
      </div>
    </StyledHit>
  </div>
  // </Link>
));

function Price() {
  return (
    <div className="row aisdemo-filter rheostat-container">
      <div className="col-sm-2 aisdemo-filter-title">Price Range</div>
      <div className="col-sm-9">
        <ConnectedRange attribute="price" />
      </div>
    </div>
  );
}
class Range extends Component {
  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentDidUpdate(prevProps) {
    if (
      this.props.canRefine &&
      (prevProps.currentRefinement.min !== this.props.currentRefinement.min ||
        prevProps.currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      console.log("setting state");
      this.setState({
        currentValues: {
          min: this.props.currentRefinement.min,
          max: this.props.currentRefinement.max,
        },
      });
      console.log(this.state.currentValues);
    }
  }

  onValuesUpdated = (sliderState) => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    });
  };

  onChange = (sliderState) => {
    console.log(sliderState);
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState[0],
        max: sliderState[1],
      });
      // this.props.refine({
      //   min: 400000,
      //   max: 60000000,
      // });
      console.log(this.state.currentValues);
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;
    return min !== max ? (
      <StyledSlider>
        {/* Styled Components Slider here */}
        <Nouislider
          min={min}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
          range={{ min: min, max: max }}
          start={[20, 80]}
          connect
          step={10}
        />
        <div className="rheostat-values">
          <div>{currentRefinement.min}</div>
          <div>{currentRefinement.max}</div>
        </div>
      </StyledSlider>
    ) : null;
  }
}
const ConnectedRange = connectRange(Range);
const Search = (props) => {
  return (
    <Container>
      <InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
        <div className="header">
          <Configure hitsPerPage={16} />
          <SearchBox
            translations={{
              placeholder: "Medellin, Antioquia",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          <div className="filters">
            <div className="sale_or_rent">
              <span>Sale or rent</span>
              <RefinementList
                attribute="sale_type"
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />{" "}
            </div>
            <div className="city">
              <span>City</span>
              <RefinementList
                attribute="city"
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />{" "}
            </div>
            <div className="price">
              <Price />
            </div>
            <div className="beds">
              <RefinementList
                attribute="bedrooms"
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />{" "}
            </div>
            <div className="baths">
              <NumericMenu
                attribute="bathrooms"
                items={[
                  { label: "1+", start: 0 },
                  { label: "2+", start: 2 },
                  { label: "3+", start: 3 },
                  { label: "4+", start: 4 },
                ]}
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />
            </div>
            <div className="clear">
              <ClearRefinements />
            </div>
          </div>
        </div>
        <div className="results">
          {" "}
          <CustomHits hitComponent={Hit} />
          <Pagination />
        </div>
        <div className="footer"></div>
      </InstantSearch>
    </Container>
  );
};

export default Search;
