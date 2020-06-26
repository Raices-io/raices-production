import React from "react";
import PropTypes from "prop-types";
import { SearchBox, Highlight, InstantSearch } from "react-instantsearch-dom";

import Container from "../Styles/Container";
import FiltersModalStyles from "../Styles/FiltersModalStyles";
import FiltersModal from "../Other/FiltersModal";
import FiltersButton from "../Styles/FiltersButton";
import InfiniteHits from "../Algolia/InfiniteHits";

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div>
      <div className="hit-picture">
        <img src={`${hit.image}`} />
      </div>
    </div>
    <div className="hit-content">
      <div>
        <Highlight attribute="name" hit={hit} />
        <span> - ${hit.price}</span>
        <span> - {hit.rating} stars</span>
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
    </div>
  </div>
);

HitComponent.propTypes = {
  hit: PropTypes.object,
};

export default class extends React.Component {
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
    indexName: PropTypes.string,
    searchClient: PropTypes.object,
  };

  render() {
    return (
      <Container hideNav={this.props.hideBottomNav}>
        <InstantSearch
          searchClient={this.props.searchClient}
          resultsState={this.props.resultsState}
          onSearchStateChange={this.props.onSearchStateChange}
          searchState={this.props.searchState}
          createURL={this.props.createURL}
          indexName={this.props.indexName}
          onSearchParameters={this.props.onSearchParameters}
          {...this.props}
        >
          <FiltersModalStyles fadeIn={this.props.modal}>
            <FiltersModal toggleModal={this.props.toggleModal} />
          </FiltersModalStyles>
          <div className="search">
            {" "}
            <SearchBox
              translations={{
                placeholder: "Medellin, Antioquia",
              }}
              onClick={(e) => {
                e.stopPropagation();
                this.props.setHideBottomNav((p) => true);
              }}
              onBlur={() => this.props.setHideBottomNav((p) => false)}
            />
            <FiltersButton
              onClick={() => {
                this.props.toggleModal();
              }}
            >
              Filtros
            </FiltersButton>{" "}
          </div>
          <div className="results">
            <InfiniteHits minHitsPerPage={16} />
          </div>
          {/* bottom nav */}
        </InstantSearch>
      </Container>
    );
  }
}
