import { useState, useEffect, useLayoutEffect } from "react";
import TopNav from "../components/Navigation/TopNav";
import BottomNav from "../components/Navigation/BottomNav";
import Features from "../components/LandingPage/Features";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  RefinementList,
  Configure,
  connectHighlight,
  Highlight,
  connectHits,
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
    padding-top: 0.5rem;
  }
`;
const SearchBoxStyle = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.image});
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0 1rem 0 1rem;
  min-height: 612px;
  z-index: 10;
  @media (max-width: 640px) {
    min-height: 300px;
    .searchHeader {
      font-size: 12px;
    }
  }
  .right-panel {
    position: relative;
  }
  .ais-SearchBox-reset {
    display: none;
  }

  .ais-SearchBox-form {
    position: relative;
    display: block;
  }
  .ais-SearchBox-input {
    padding: 0.3rem 1.7rem;
    width: 100%;
    position: relative;
    border: 1px solid #c4c8d8;
  }
  .ais-SearchBox-submit {
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
    width: 20px;
    height: 20px;
    top: 0.6rem;
    font-size: 1rem;
  }
  .ais-SearchBox-submitIcon {
    width: 14px;
    height: 14px;
  }
  .searchHeader {
    color: white;
    font-size: 35px;
    font-weight: bold;
    height: 250px;
  }
  .input-box {
    padding-left: 3rem;
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: flex-start;
    height: 100%;
    @media (max-width: 640px) {
      height: 250px;
      width: 100%;
      padding-left: 0;
    }
  }
  input {
    border-radius: 0.25rem;
    height: 2.5rem;
    padding-left: 1rem;
    width: 100%;
  }
`;

const StyledHit = styled.div`
  display: flex;
  margin-top: 0.5rem;
  width: 350px;
  .media-heading {
    display: block;
    width: 250.5px;
    text-overflow: ellipsis;

    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
  }
  .infos {
    margin-left: 0.3rem;
    display: flex;
    flex-direction: column;
  }
  .picture {
    background-image: url(${(props) => props.homeImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
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
    width: 100px;
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
    <div className="hit col-sm-3">
      <StyledHit homeImage={hit.defaultPic}>
        <div className="pictures-wrapper">
          <div className="picture"></div>
          <img
            className="profile"
            alt={hit.agent.displayName}
            src={hit.agent.profilePic}
          />
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
  ) : null
);

// const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
//   const parsedHit = highlight({
//     highlightProperty: "_highlightResult",
//     attribute,
//     hit,
//   });

//   return (
//     <div>
//       <h3>{hit.username}</h3>
//       <img src={hit.avatar} alt={hit.username} />
//       {parsedHit.map((part) =>
//         part.isHighlighted ? <mark>{part.value}</mark> : part.value
//       )}
//     </div>
//   );
// });

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
      <div className="z-40 hidden md:block px-12 mt-12">
        <TopNav fixed />
      </div>
      <div
        className={`sm:py-6 pb-12 flex flex-col ${
          input ? "overflow-hidden" : "overflow-y-scroll"
        } h-full flex-grow mx-0 flex-grow sm:mt-8`}
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
                <SearchBox
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
