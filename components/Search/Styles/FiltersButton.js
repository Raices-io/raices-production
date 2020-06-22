import styled from "styled-components";

const FiltersButton = styled.button`
  background: white;
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  height: 75%;

  border-radius: 5px;
  @media (min-width: 640px) {
    display: none;
  }
`;

export default FiltersButton;
