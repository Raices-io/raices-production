import styled from "styled-components";

const FiltersModal = styled.div`
  position: absolute;
  bottom: -100%;
  min-width: 100%;
  height: calc(100vh - 60px);
  background-color: white;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  ${(props) =>
    props.fadeIn &&
    `bottom: 0;
  opacity: 1;`}
  .results {
    display: flex;
    align-items: center;
    min-height: 50px;
    .title {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .number-hits {
    display: block;
    text-align: right;
    width: 200px;
  }
  .ais-Panel {
    border-top: 1px solid #ebecf3;
    padding-bottom: 2rem;
    padding-top: 2rem;
  }
  .ais-Panel-header {
    padding-bottom: 1.5rem;
    font-size: 1.4rem;
  }
  .ais-SearchBox {
    position: relative;
    width: 100%;
  }
  .ais-SearchBox-submit {
    left: 0;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
  }
  .ais-SearchBox-form {
    .ais-SearchBox-reset {
      display: none;
    }
    margin-bottom: 1rem;
    input {
      background: rgba(65, 66, 71, 0.06);
      width: 100%;
      min-height: 48px;
      font-size: 1rem;
      padding-top: 2px;
      border-radius: 5px;
      color: rgba(33, 36, 61, 0.8);
      padding: 0 48px;
      outline: none;
    }
  }
  .ais-RefinementList-labelText {
    font-size: 1rem;
  }
  .ais-RefinementList-item--selected {
    .ais-RefinementList-labelText {
      font-weight: bold;
    }
  }
  @media (max-width: 899px) {
    .ais-RefinementList-item {
      flex: 50%;
    }
  }
  .ais-HierarchicalMenu-link,
  .ais-RatingMenu-item,
  .ais-RefinementList-item {
    padding-bottom: 1rem;
  }
  .ais-RefinementList-label {
    align-items: center;
    display: flex;
  }
  .ais-RefinementList-checkbox {
    height: 1.5rem;
    min-width: 1.5rem;
  }
  .ais-RefinementList.grid {
    .ais-RefinementList-list {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-gap: 0 2rem;
      grid-template-rows: repeat(3, 1fr);
    }
  }
  .ais-RefinementList-checkbox {
    margin-right: 1rem;
  }
  .ais-RefinementList-list {
    .ais-RefinementList-label {
      align-items: center;
      display: flex;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .ais-RefinementList-count {
      align-items: center;
      border-radius: 5px;
      color: rgba(33, 36, 61, 0.8);
      font-size: 0.64rem;
      font-weight: 600;
      letter-spacing: 1.1px;
      margin-left: 8px;
      padding: 0 4px;
    }
  }
  .bottom-buttons {
    ${(props) => props.fadeIn && "position: fixed;"}
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    button {
      padding: 12px;
      text-align: center;
      display: block;
      .ais-stats {
        width: calc(50% - 0.5rem);
      }
    }
    .ais-ClearRefinements {
      width: calc(50% - 0.5rem);
      text-align: center;
      background-color: rgba(65, 66, 71, 0.08);
      border-radius: 5px;
      button {
        margin: 0 auto;
      }
    }
  }
  .filters-div {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    flex-grow: 1;
    width: 100;
    margin: 0 auto;
    padding: 2rem 2rem 0 2rem;
  }
  .title {
    font-size: 1.2rem;
    padding-top: 0.5rem;
    text-align: left;
  }
`;

export default FiltersModal;
