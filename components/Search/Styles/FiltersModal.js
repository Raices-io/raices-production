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
  .bottom-buttons {
    background: gray;
    height: 100px;
    ${(props) => props.fadeIn && "position: fixed;"}
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .filters-div {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    flex-grow: 1;
    width: 95%;
    margin: 0 auto;
  }
  .title {
    font-size: 1.2rem;
    padding-top: 0.5rem;
    text-align: left;
  }
`;

export default FiltersModal;
