import TopNav from "../components/Navigation/TopNav";
import BottomNav from "../components/Navigation/BottomNav";
import Features from "../components/LandingPage/Features";
import styled from "styled-components";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Configure,
  connectHighlight,
} from "react-instantsearch-dom";
// allows us to not show results before a
import { connectStateResults } from "react-instantsearch/connectors";
const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ID
);

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

  @media (max-width: 640px) {
    min-height: 300px;
  }
  .ais-Hits {
    background: white;
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
  }
  .input-box {
    padding-left: 3rem;
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: flex-start;
    height: 100%;
  }
  input {
    border-radius: 0.25rem;
    height: 2.5rem;
    padding-left: 1rem;
    width: 100%;
  }
`;

const Hit = connectStateResults(({ hit, searchState }) =>
  searchState.query ? (
    <p>
      <CustomHighlight attribute="addressLineOne" hit={hit} />
    </p>
  ) : null
);

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  return (
    <div>
      <h3>{hit.username}</h3>
      <img src={hit.avatar} alt={hit.username} />
      {parsedHit.map((part) =>
        part.isHighlighted ? <mark>{part.value}</mark> : part.value
      )}
    </div>
  );
});

const Explore = () => {
  return (
    <div className=" relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased">
      <div className="z-40 hidden md:block px-12 mt-12">
        <TopNav fixed />
      </div>
      <div className="sm:py-6 pb-12 flex flex-col overflow-y-scroll h-full flex-grow mx-0 flex-grow sm:mt-8">
        {/* Features section */}
        <SearchBoxStyle image="/homePage/homePageImage.jpg">
          <div className="input-box">
            <span className="searchHeader">
              Una mejor forma de comprar una propiedad
            </span>
            {/* <input type="text" placeholder="Medellin, Antioquia" /> */}
            <InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
              <div className="left-panel">
                <RefinementList attribute="brand" />
                <Configure hitsPerPage={8} />
              </div>
              <div className="right-panel">
                <SearchBox />
                <Hits hitComponent={Hit} />
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
