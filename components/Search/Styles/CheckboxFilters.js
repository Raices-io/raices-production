import styled from "styled-components";

const CheckboxFilters = styled.div`
  margin-top: 0.5rem;

  /* SearchBox */

  .header .ais-SearchBox {
    bottom: 0;
    left: 0;
    position: absolute;
    transform: translateY(50%);
    width: 100vw;
  }

  .header .ais-SearchBox .ais-SearchBox-form {
    margin: auto;
    max-width: 90%;
  }

  .ais-SearchBox .ais-SearchBox-input,
  .ais-RefinementList .ais-SearchBox-input {
    font-size: 1rem;
  }
  /* RefinementList */
  .ais-RefinementList .ais-SearchBox-input {
    min-height: 48px;
  }
  .ais-RefinementList-list {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0 2rem;
    grid-template-rows: repeat(5, 1fr);
  }

  .ais-RefinementList-item {
    flex: 50%;
  }

  .ais-RefinementList-checkbox {
    height: 1.5rem;
    min-width: 1.5rem;
  }

  .ais-RefinementList-item--selected .ais-RefinementList-checkbox::after {
    align-items: center;
    background: none;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='12' height='9'%3E%3Cdefs%3E%3Cpath id='a' d='M0 0h24v24H0z'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(-6 -8)'%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cpath fill='%23fff' fill-rule='nonzero' d='M16.5 8.5L18 10l-6.99 7-4.51-4.5L8 11l3.01 3z' mask='url(%23b)'/%3E%3C/g%3E%3C/svg%3E");
    display: flex;
    height: 100%;
    justify-content: center;
    left: initial;
    position: relative;
    top: initial;
    transform: initial;
    width: initial;
  }
`;
export default CheckboxFilters;
