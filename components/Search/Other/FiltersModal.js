import React from "react";
import ResultsNumberMobile from "../Algolia/ResultsNumberMobile";
import FiltersButton from "../Styles/FiltersButton";
import Range from "../Algolia/Range";

import {
  ClearRefinements,
  RefinementList,
  NumericMenu,
  Stats,
  Panel,
  connectRange,
} from "react-instantsearch-dom";

const ConnectedRange = connectRange(Range);
const Price = () => {
  return <ConnectedRange attribute="price" />;
};

const FiltersModal = ({ toggleModal }) => {
  return (
    <>
      <div className="filters-div">
        {/* Filters */}
        <div className="results">
          <span className="title">Filtros</span>
          <ResultsNumberMobile />
        </div>
        <Panel header="Tipo">
          <RefinementList
            attribute="sale_type"
            transformItems={(items) =>
              items.map((item) => {
                if (item.label !== "sale") {
                  item.label = "Alquilar";
                } else {
                  item.label = "Vender";
                }
                return item;
              })
            }
          />
        </Panel>

        <Panel header="Ciudades">
          <RefinementList
            className="grid"
            attribute="city"
            searchable={true}
            translations={{
              placeholder: "Busca por ciudades…",
            }}
          />
        </Panel>
        <Panel header="Price">
          <Price />
        </Panel>
        <Panel header="Beds">
          <NumericMenu
            attribute="bedrooms"
            items={[
              { label: "1+", start: 0 },
              { label: "2+", start: 2 },
              { label: "3+", start: 3 },
              { label: "4+", start: 4 },
            ]}
            translations={{
              all: "Ver todos",
            }}
            transformItems={function (items) {
              return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
            }}
          />
        </Panel>
        <Panel header="Baños">
          <NumericMenu
            attribute="bathrooms"
            items={[
              { label: "1+", start: 0 },
              { label: "2+", start: 2 },
              { label: "3+", start: 3 },
              { label: "4+", start: 4 },
            ]}
            translations={{
              all: "Ver todos",
            }}
            transformItems={function (items) {
              return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
            }}
          />
        </Panel>
      </div>
      {/* Bottom attached clear all and button to go to search */}
      <div className="bottom-buttons">
        <ClearRefinements
          translations={{
            reset: "Borrar filtros",
          }}
        />
        <FiltersButton onClick={toggleModal}>
          <Stats
            translations={{
              stats(nbHits, timeSpentMS) {
                return `ver ${nbHits} resultados`;
              },
            }}
          />
        </FiltersButton>
      </div>
    </>
  );
};
export default FiltersModal;
