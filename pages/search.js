import { Fragment, Component, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";

// Styled imports
import Container from "../components/Search/Styles/Container";
import FiltersModal from "../components/Search/Styles/FiltersModal";
import FiltersButton from "../components/Search/Styles/FiltersButton";
import CheckboxFilters from "../components/Search/Styles/CheckboxFilters";
import PriceFilters from "../components/Search/Styles/PriceFilters";

// Custom Algolia components
import Range from "../components/Search/Algolia/Range";
import RoomType from "../components/Search/Algolia/RoomType";
import CityType from "../components/Search/Algolia/CityType";
import InfiniteHits from "../components/Search/Algolia/InfiniteHits";

import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  connectRange,
  RefinementList,
  NumericMenu,
  Stats,
  CurrentRefinements,
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

function Price() {
  return <ConnectedRange attribute="price" />;
}

const ConnectedRange = connectRange(Range);

const Search = (props) => {
  const [modal, setModal] = useState(false);
  const [hideBottomNav, setHideBottomNav] = useState(false);
  const toggleModal = () => {
    setModal((p) => !p);
  };
  return (
    <Container hideNav={hideBottomNav}>
      <InstantSearch indexName="prod_HOMES" searchClient={searchClient}>
        <FiltersModal fadeIn={modal}>
          <div className="filters-div">
            {/* Filters */}

            <span className="title">Filtros</span>
            <div className="sale_or_rent">
              <RoomType
                className="list"
                attribute="sale_type"
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />{" "}
            </div>
            <CheckboxFilters>
              <span>Ciudad</span>
              <RefinementList
                attribute="city"
                searchable={true}
                showMore={true}
                limit={2}
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
                translations={{
                  showMore(expanded) {
                    return expanded ? "Menos" : "Mas";
                  },
                  placeholder: "Busca...",
                }}
              />{" "}
            </CheckboxFilters>
            <PriceFilters>
              <span>Precio</span>
              <Price />
            </PriceFilters>
            <CheckboxFilters beds>
              <span>Bedrooms</span>
              <RefinementList
                attribute="bedrooms"
                transformItems={function (items) {
                  return items.sort((i1, i2) =>
                    i1.label.localeCompare(i2.label)
                  );
                }}
              />{" "}
            </CheckboxFilters>
            <div className="baths">
              <span>Bathrooms</span>
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
          </div>
          {/* Bottom attached clear all and button to go to search */}
          <div className="bottom-buttons">
            <ClearRefinements />
            <FiltersButton onClick={toggleModal}>
              <Stats
                translations={{
                  stats(nbHits, timeSpentMS) {
                    return `${nbHits} propiedades`;
                  },
                }}
              />
            </FiltersButton>
          </div>
        </FiltersModal>
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
            Filters
          </FiltersButton>{" "}
        </div>
        <div className="header">
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
              <span>Bedrooms</span>
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
              <span>Bathrooms</span>
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
          <InfiniteHits minHitsPerPage={16} />
        </div>
        {/* bottom nav */}
        <div className="footer"></div>
      </InstantSearch>
    </Container>
  );
};

export default Search;
