import { useState, useEffect, useLayoutEffect } from "react";
import TopNav from "../components/Navigation/TopNav";
import BottomNav from "../components/Navigation/BottomNav";
import Features from "../components/LandingPage/Features";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import algoliasearch from "algoliasearch";
import Link from "next/link";

import {
  InstantSearch,
  SearchBox,
  ToggleRefinement,
  Configure,
  connectHighlight,
  RefinementList,
  connectRefinementList,
  Highlight,
  connectHits,
  CurrentRefinements,
} from "react-instantsearch-dom";
// allows us to not show results before a
import { connectStateResults } from "react-instantsearch/connectors";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ID
);

const SearchDropdown = styled.ol`
  background: white;
  position: absolute;
  top: 5;
  overflow-y: scroll;
  height: 400px;
  z-index: 20;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  .hit:first-child {
    padding-top: 0.2rem;
  }
  .hit {
    flex: 1 1 auto; /* formerly flex: 1 0 auto; */
    width: 97%;
    overflow: hidden; /* new */
    min-height: min-content;
  }
`;
const SearchBoxStyle = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.image});
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0 1rem 0 1rem;
  z-index: 10;
  @media (max-width: 640px) {
    min-height: 100vh;
    height: 100%;
    .searchHeader {
      display: none;
    }
  }
  .right-panel {
    position: relative;
    margin-top: 2rem;
    @media (max-width: 640px) {
      margin-top: 5rem;
    }
  }
  .ais-SearchBox-reset {
    display: none;
  }

  .ais-SearchBox-form {
    position: relative;
    display: block;
    margin-top: 1rem;
  }
  .ais-SearchBox-input {
    padding: 0.3rem 1.7rem 0.3rem 2.3rem;
    border-radius: 5px;
    width: 100%;
    position: relative;
    border: 1px solid #c4c8d8;
    height: 60px;
  }
  .ais-SearchBox-submit {
    position: absolute;
    left: 0.8rem;
    right: 0.3rem;
    width: 20px;
    height: 20px;
    top: 35%;
    font-size: 1rem;
  }
  .ais-SearchBox-submitIcon {
    width: 14px;
    height: 14px;
    margin: auto;
  }
  .searchHeader {
    color: white;
    font-size: 35px;
    font-weight: bold;
  }
  .input-box {
    padding-left: 3rem;
    padding-top: 12rem;
    display: flex;
    flex-direction: column;
    width: 75%;
    justify-content: flex-start;
    height: 100%;
    @media (max-width: 640px) {
      height: 250px;
      width: 100%;
      padding-left: 0;
      padding-top: 2rem;
    }
  }
  input[type="text"] {
    border-radius: 0.25rem;
    height: 2.5rem;
    padding-left: 1rem;
    width: 100%;
  }
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

const Hits = connectStateResults(({ searchState, hits, input, setInput }) => {
  useEffect(() => {
    if (searchState.query) {
      setInput(true);
    } else {
      setInput(false);
    }
  }, [searchState]);
  return searchState.query && input ? (
    <SearchDropdown onClick={(e) => e.stopPropagation()}>
      {hits.map((hit) => (
        <Hit hit={hit} />
      ))}
    </SearchDropdown>
  ) : null;
});
const CustomHits = connectHits(Hits);

const Hit = connectStateResults(({ hit, searchState }) =>
  searchState.query ? (
    <Link href={`/home/${hit.city}/${hit.objectID}`}>
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
                  thousandsGroupStyle="thousands"
                  displayType="text"
                  prefix={"$"}
                  value={hit.price}
                />
              }
            </span>
          </div>
        </StyledHit>
      </div>
    </Link>
  ) : null
);

const StyledTab = styled.div`
  border-radius: 5px;
  color: rgb(255, 255, 255);
  background-color: ${(props) => (props.selected ? "white" : "transparent")};
  color: ${(props) => (props.selected ? "#5A67D8" : "white")};
  @media (min-width: 640px) {
    &:hover {
      background: white;
      color: #5a67d8;
    }
  }
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledTabs = styled.div`
  background-color: rgba(59, 65, 68, 0.6);
  display: flex;
  height: 50px;
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;
  align-self: flex-start;
  justify-content: space-between;
  max-width: 200px;
`;

const TabButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RoomType = connectRefinementList(
  ({ items, refine, currentRefinement }) => {
    const sortedItems = items.sort((i1, i2) =>
      i1.label.localeCompare(i2.label)
    );
    const hitComponents = sortedItems.map((item) => {
      const selectedClassName = item.isRefined
        ? " ais-refinement-list--item__active"
        : "";
      const itemClassName = `ais-refinement-list--item col-sm-3 ${selectedClassName}`;
      return (
        <div className={itemClassName} key={item.label}>
          <StyledTab selected={currentRefinement.includes(item.label)}>
            <TabButton
              className="ais-refinement-list--label"
              onClick={(e) => {
                e.preventDefault();
                refine(item.value);
              }}
            >
              <span>{item.label == "rent" ? "Alquilar" : "Comprar"} </span>
            </TabButton>
          </StyledTab>
        </div>
      );
    });

    return (
      <div className="row aisdemo-filter">
        <StyledTabs id="room_types col-sm-3">{hitComponents}</StyledTabs>
      </div>
    );
  }
);
const Explore = () => {
  // stop scroll at page level is query is not empty

  const [input, setInput] = useState(false);
  return (
    <div
      onClick={() => {
        setInput(false);
      }}
      className={`relative flex flex-col w-screen h-full flex-grow bg-white ${
        !input ? "overflow-y-scroll" : "overflow-hidden"
      } antialiased`}
    >
      <div className="z-40 hidden md:block px-12">
        <TopNav fixed />
      </div>
      <div
        className={`sm:py-6 pb-12 flex flex-col ${
          input ? "overflow-hidden" : "overflow-y-scroll"
        } h-full flex-grow mx-0 sm:mt-8`}
      >
        {/* Features section */}
        <SearchBoxStyle image="/homePage/homePageImage.jpg">
          <div className="input-box">
            <span className="searchHeader">
              Una mejor forma de comprar una propiedad
            </span>
            {/* <input type="text" placeholder="Medellin, Antioquia" /> */}
            <InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
              <div className="left-panel">
                <Configure hitsPerPage={8} />
              </div>
              <div className="right-panel">
                <RoomType attribute="sale_type" operator="or" limit={2} />
                {/* Note, the below refinement list isn't styled, but is a more concise component we can use = the sort function in transform Items disables the former issue of order changing on filter selection. */}
                {/* Using RefinementList as opposed to RoomType would significantly reduce code */}

                {/* <RefinementList
                  attribute="sale_type"
                  transformItems={function (items) {
                    return items.sort((i1, i2) =>
                      i1.label.localeCompare(i2.label)
                    );
                  }}
                /> */}
                <SearchBox
                  translations={{
                    placeholder: "Medellin, Antioquia",
                  }}
                  onClick={(e) => {
                    setInput(true);
                    e.stopPropagation();
                  }}
                />
                {/* dropdown menu */}
                <CustomHits
                  input={input}
                  setInput={setInput}
                  hitComponent={Hit}
                />
              </div>
            </InstantSearch>
          </div>
        </SearchBoxStyle>
        <div className="flex px-5 flex flex-grow flex-shrink-0 justify-center items-center sm:px-12 pb-6 sm:pb-0">
          <Features />
        </div>
      </div>
      <div className="flex w-full md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};
export default Explore;
