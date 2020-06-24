import { isEqual } from "lodash";
import React, { useState } from "react";
import { withRouter } from "next/router";
import qs from "qs";
import algoliasearch from "algoliasearch/lite";
import { findResultsState } from "react-instantsearch-dom/server";
import Search from "../components/Search/Algolia/Search";
import TopNav from "../components/Navigation/TopNav";
import BottomNav from "../components/Navigation/BottomNav";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ID
);

const updateAfter = 700;

const createURL = (state) => `?${qs.stringify(state)}`;

const pathToSearchState = (path) =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

const searchStateToURL = (searchState) => {
  return searchState
    ? `${window.location.pathname}?${qs.stringify(searchState)}`
    : "";
};

const DEFAULT_PROPS = {
  searchClient,
  indexName: "prod_HOMES",
};

const Page = (props) => {
  const [lastRouter, setLastRouter] = useState(props.router);
  const [searchState, setSearchState] = useState(props.searchState);
  const [resultsState, setResultsState] = useState(props.resultsState);
  const [hideBottomNav, setHideBottomNav] = useState(false);
  const [modal, setModal] = useState(false);
  const getDerivedStateFromProps = (props, state) => {
    if (!isEqual(lastRouter, router)) {
      return {
        searchState: pathToSearchState(router.asPath),
        lastRouter: router,
      };
    }

    return null;
  };
  const toggleModal = () => {
    setModal((p) => !p);
  };
  const onSearchStateChange = (searchState) => {
    clearTimeout(debouncedSetState);
    const debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState);
      console.log(href);
      props.router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    // Set search state
    setSearchState((p) => searchState);
  };

  return (
    <div
      className={`relative flex flex-col flex-grow items-center w-screen h-screen pb-15 flex-grow overflow-hidden antialiased`}
    >
      <div className="z-40 hidden md:block px-12">
        <TopNav fixed />
      </div>
      <Search
        {...DEFAULT_PROPS}
        searchState={searchState}
        resultsState={resultsState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
        hideBottomNav={hideBottomNav}
        setHideBottomNav={setHideBottomNav}
        modal={modal}
        toggleModal={toggleModal}
      />
      <div className="fixed bottom-0 w-full md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};
Page.getInitialProps = async ({ asPath }) => {
  const searchState = pathToSearchState(asPath);
  const resultsState = await findResultsState(Search, {
    ...DEFAULT_PROPS,
    searchState,
  });

  return {
    resultsState,
    searchState,
  };
};
export default withRouter(Page);
