import { Fragment, Component, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";

// Styled imports
import Container from "../components/Search/Styles/Container";
import FiltersModalStyles from "../components/Search/Styles/FiltersModalStyles";
import FiltersButton from "../components/Search/Styles/FiltersButton";

// Custom Algolia components
import Range from "../components/Search/Algolia/Range";
import InfiniteHits from "../components/Search/Algolia/InfiniteHits";

// Other components
import FiltersModal from "../components/Search/Other/FiltersModal";
import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";

import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  connectRange,
  RefinementList,
  NumericMenu,
} from "react-instantsearch-dom";

import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
} from "react-instantsearch-dom-maps";
import { firestore } from "../util/firebase";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ID
);

const SearchDropdown = styled.ol`
  background: white;
  overflow-y: scroll;
`;

const Price = () => {
  return <ConnectedRange attribute="price" />;
};

const ConnectedRange = connectRange(Range);

const Search = (props) => {
  const [modal, setModal] = useState(false);
  const [hideBottomNav, setHideBottomNav] = useState(false);
  const toggleModal = () => {
    setModal((p) => !p);
  };
  return (
    <Container hideNav={hideBottomNav}>
      <div className="z-40 hidden md:block px-12">
        <TopNav fixed />
      </div>
      <InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
        <FiltersModalStyles fadeIn={modal}>
          <FiltersModal toggleModal={toggleModal} />
        </FiltersModalStyles>
        <div className="search">
          {" "}
          <SearchBox
            translations={{
              placeholder: "Medellin, Antioquia",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setHideBottomNav((p) => true);
            }}
            onBlur={() => setHideBottomNav((p) => false)}
          />
          <FiltersButton
            onClick={() => {
              toggleModal();
            }}
          >
            Filtros
          </FiltersButton>{" "}
        </div>
        <div className="results">
          <InfiniteHits minHitsPerPage={16} />
        </div>
        {/* bottom nav */}
        <div className="fixed bottom-0 w-full md:hidden">
          <BottomNav />
        </div>
      </InstantSearch>
    </Container>
  );
};

export default Search;
