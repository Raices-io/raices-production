import styled from "styled-components";

const FiltersButton = styled.button`
  background: white;
  border: 2px solid ${(props) => props.theme.color500};
  color: ${(props) => props.theme.color600};
  padding: 0.5rem;
  height: 100;
  border-radius: 5px;
  font-weight: 600;
`;

export default FiltersButton;
