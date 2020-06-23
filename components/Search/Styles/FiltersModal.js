import styled from "styled-components";

const FiltersModal = styled.div`
  position: absolute;
  z-index: 10;
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
      :focus {
        border: 1px solid ${(props) => props.theme.color700};
      }
      width: 100%;
      min-height: 48px;
      font-size: 1rem;
      padding-top: 2px;
      border-radius: 5px;
      color: rgba(33, 36, 61, 0.8);
      padding: 0 38px;
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
    background: white;
    padding: 1rem 2rem;
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
  /* Numeric Menu */
  .ais-NumericMenu-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;

    .ais-NumericMenu-label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .ais-NumericMenu-labelText {
      padding-left: 0.3rem;
    }

    .ais-NumericMenu-item:last-child {
      grid-column: 5 / span 2;
    }
    input {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
  /* Price Filter */
  /* No ui slider */
  /*! nouislider - 14.5.0 - 5/11/2020 */
  /* Functional styling;
 * These styles are required for noUiSlider to function.
 * You don't need to change these rules to apply your design.
 */
  .noUi-target,
  .noUi-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-target {
    position: relative;
  }
  .noUi-base,
  .noUi-connects {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  /* Wrapper for all connect elements.
 */
  .noUi-connects {
    overflow: hidden;
    z-index: 0;
  }
  .noUi-connect,
  .noUi-origin {
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 0 0;
    transform-style: flat;
  }
  .noUi-connect {
    height: 100%;
    width: 100%;
  }
  .noUi-origin {
    height: 10%;
    width: 10%;
  }
  /* Offset direction
 */
  .noUi-txt-dir-rtl.noUi-horizontal .noUi-origin {
    left: 0;
    right: auto;
  }
  /* Give origins 0 height/width so they don't interfere with clicking the
 * connect elements.
 */
  .noUi-vertical .noUi-origin {
    width: 0;
  }
  .noUi-horizontal .noUi-origin {
    height: 0;
  }
  .noUi-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
  }
  .noUi-touch-area {
    height: 100%;
    width: 100%;
  }
  .noUi-state-tap .noUi-connect,
  .noUi-state-tap .noUi-origin {
    -webkit-transition: transform 0.3s;
    transition: transform 0.3s;
  }
  .noUi-state-drag * {
    cursor: inherit !important;
  }
  /* Slider size and handle placement;
 */
  .noUi-horizontal {
    height: 7px;
  }
  .noUi-horizontal .noUi-handle {
    width: 34px;
    height: 28px;
    right: -17px;
    top: -11px;
  }
  .noUi-horizontal .noUi-handle-lower {
    right: -14px;
  }
  .noUi-horizontal .noUi-handle-upper {
    right: -19px;
  }
  .noUi-vertical {
    width: 18px;
  }
  .noUi-vertical .noUi-handle {
    width: 28px;
    height: 34px;
    right: -6px;
    top: -11px;
  }

  .noUi-txt-dir-rtl.noUi-horizontal .noUi-handle {
    left: -17px;
    right: auto;
  }
  /* Styling;
 * Giving the connect element a border radius causes issues with using transform: scale
 */
  .noUi-target {
    background: #fafafa;
    border-radius: 4px;
    border: 1px solid #d3d3d3;
    box-shadow: inset 0 1px 1px #f0f0f0, 0 3px 6px -5px #bbb;
  }
  .noUi-connects {
    border-radius: 3px;
  }
  .noUi-connect {
    background: ${(props) => props.theme.color400};
  }
  /* Handles and cursors;
 */
  .noUi-draggable {
    cursor: ew-resize;
  }
  .noUi-vertical .noUi-draggable {
    cursor: ns-resize;
  }
  .noUi-handle {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background: #fff;
    cursor: default;
    box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ebebeb, 0 3px 6px -3px #bbb;
  }
  .noUi-active {
    box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ddd, 0 3px 6px -3px #bbb;
  }
  /* Handle stripes;
 */
  .noUi-handle:before,
  .noUi-handle:after {
    content: "";
    display: block;
    position: absolute;
    height: 14px;
    width: 1px;
    background: #e8e7e6;
    left: 14px;
    top: 6px;
  }
  .noUi-handle:after {
    left: 17px;
  }
  .noUi-vertical .noUi-handle:before,
  .noUi-vertical .noUi-handle:after {
    width: 14px;
    height: 1px;
    left: 6px;
    top: 14px;
  }
  .noUi-vertical .noUi-handle:after {
    top: 17px;
  }
  /* Disabled state;
 */
  [disabled] .noUi-connect {
    background: #b8b8b8;
  }
  [disabled].noUi-target,
  [disabled].noUi-handle,
  [disabled] .noUi-handle {
    cursor: not-allowed;
  }
  /* Base;
 *
 */
  .noUi-pips,
  .noUi-pips * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-pips {
    position: absolute;
    color: #999;
  }
  /* Values;
 *
 */
  .noUi-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }
  .noUi-value-sub {
    color: #ccc;
    font-size: 10px;
  }
  /* Markings;
 *
 */
  .noUi-marker {
    position: absolute;
    background: #ccc;
  }
  .noUi-marker-sub {
    background: #aaa;
  }
  .noUi-marker-large {
    background: #aaa;
  }
  /* Horizontal layout;
 *
 */
  .noUi-pips-horizontal {
    padding: 10px 0;
    height: 80px;
    top: 100%;
    left: 0;
    width: 100%;
  }
  .noUi-value-horizontal {
    -webkit-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);
  }
  .noUi-rtl .noUi-value-horizontal {
    -webkit-transform: translate(50%, 50%);
    transform: translate(50%, 50%);
  }
  .noUi-marker-horizontal.noUi-marker {
    margin-left: -1px;
    width: 2px;
    height: 5px;
  }
  .noUi-marker-horizontal.noUi-marker-sub {
    height: 10px;
  }
  .noUi-marker-horizontal.noUi-marker-large {
    height: 15px;
  }
  /* Vertical layout;
 *
 */
  .noUi-pips-vertical {
    padding: 0 10px;
    height: 100%;
    top: 0;
    left: 100%;
  }
  .noUi-value-vertical {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    padding-left: 25px;
  }
  .noUi-rtl .noUi-value-vertical {
    -webkit-transform: translate(0, 50%);
    transform: translate(0, 50%);
  }
  .noUi-marker-vertical.noUi-marker {
    width: 5px;
    height: 2px;
    margin-top: -1px;
  }
  .noUi-marker-vertical.noUi-marker-sub {
    width: 10px;
  }
  .noUi-marker-vertical.noUi-marker-large {
    width: 15px;
  }
  .noUi-tooltip {
    display: block;
    position: absolute;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background: #fff;
    color: #000;
    padding: 5px;
    text-align: center;
    white-space: nowrap;
  }
  .noUi-horizontal .noUi-tooltip {
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 120%;
  }
  .noUi-vertical .noUi-tooltip {
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    top: 50%;
    right: 120%;
  }
  .noUi-horizontal .noUi-origin > .noUi-tooltip {
    -webkit-transform: translate(50%, 0);
    transform: translate(50%, 0);
    left: auto;
    bottom: 10px;
  }
  .noUi-vertical .noUi-origin > .noUi-tooltip {
    -webkit-transform: translate(0, -7px);
    transform: translate(0, -7px);
    top: auto;
    right: 28px;
  }
`;

export default FiltersModal;
