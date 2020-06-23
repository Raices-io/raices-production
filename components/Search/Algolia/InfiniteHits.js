import React, { Component } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import Hit from "./Hit";
import styled from "styled-components";

const InfiniteHitsStyles = styled.div`
  padding: 0 2rem;
`;
class InfiniteHits extends Component {
  sentinel = null;

  onSentinelIntersection = (entries) => {
    const { hasMore, refine } = this.props;

    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore) {
        refine();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);

    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { hits } = this.props;

    return (
      <InfiniteHitsStyles>
        <ul className="ais-InfiniteHits-list">
          {hits.map((hit) => (
            <li key={hit.objectID} className="ais-InfiniteHits-item">
              <Hit hit={hit} />
            </li>
          ))}
          <li
            className="ais-InfiniteHits-sentinel"
            ref={(c) => (this.sentinel = c)}
          />
        </ul>
      </InfiniteHitsStyles>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
