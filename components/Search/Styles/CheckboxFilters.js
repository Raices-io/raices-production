import styled from "styled-components";

const CheckboxFilters = styled.div`
  margin-top: 0.5rem;
  form {
    width: 50%;
  }
  input {
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    outline: none;
    padding: 0.5rem;
  }
  .ais-SearchBox-form {
    .ais-SearchBox-reset,
    .ais-SearchBox-submit {
      display: none;
    }
  }
  .ais-RefinementList {
    .ais-RefinementList-label {
      margin-top: 0.5rem;
      display: flex;
      width: ${(props) => (props.beds ? "30%" : "50%")};
      justify-content: space-between;
    }
    .ais-RefinementList-showMore {
      margin-top: 0.5rem;
    }
    .ais-RefinementList-checkbox {
      width: 20px;
      height: 20px;
      display: flex;
      flex-direction: column;
      align-self: center;
    }
    .ais-RefinementList-labelText {
      color: blue;
    }
    .ais-RefinementList-count {
      background: gray;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      width: 30px;
    }
  }
`;
export default CheckboxFilters;
