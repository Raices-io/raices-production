import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import styled from "styled-components";

const TabButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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
  margin-top: 1rem;
  border-radius: 5px;
  justify-content: space-between;
  max-width: 200px;
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

export default RoomType;
