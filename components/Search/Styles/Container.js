import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .search {
    display: flex;
    justify-content: space-between;
    height: 60px;
    min-height: 60px;
    align-items: center;
    width: 95%;
    align-self: center;
    .ais-SearchBox {
      width: 75%;
    }
    .ais-SearchBox-reset,
    .ais-SearchBox-submit {
      display: none;
    }
    form {
      input {
        border: 1px solid gray;
        border-radius: 5px;
        width: calc(100% - 10px);
        outline: none;
        padding: 0.5rem;
      }
    }
  }

  .header {
    height: 10vh;
    min-height: 10vh;
    @media (max-width: 600px) {
      display: none;
    }
  }
  .filters {
    display: flex;
    flex: 1;
    .sale_or_rent {
      border: 1px solid red;
      width: 200px;
      height: 200px;
    }
    .city {
      border: 1px solid blue;
      width: 200px;
      height: 200px;
    }
    .price {
      border: 1px solid purple;
      width: 400px;
      height: 200px;
    }
    .beds {
      border: 1px solid yellow;
      width: 100px;
      height: 200px;
    }
    .baths {
      border: 1px solid cyan;
      width: 100px;
      height: 200px;
    }
    .clear {
      border: 1px solid cyan;
      width: 100px;
      height: 200px;
    }
  }
  .results {
    flex-grow: 1;
    overflow: auto;
  }
  .footer {
    max-width: 800px;
    height: 50px;
    min-height: 50px;
    overflow-y: hidden;
    bottom: 0;
    min-width: 100%;
    background-color: red;
    -webkit-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    -moz-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    -o-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    transition: all 0.3s ease-out, bottom 0.3s ease-out;
    ${(props) => props.hideNav && `min-height: 0; height: 0`}
  }
  /* Pagination */
  .ais-Pagination {
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .ais-Pagination .ais-Pagination-item {
    display: inline-block;
    border: 1px solid;
    border-radius: 4px;
    padding: 3px;
    margin: 1px;
    border-color: #ddd;
    background: transparent;
  }

  .ais-Pagination-item .ais-Pagination-link {
    display: block;
    color: #ff585b;
    line-height: 30px;
    width: 30px;
    height: 30px;
  }

  .ais-Pagination-item.ais-Pagination-item--selected.ais-Pagination-item--page {
    background: #ff585b;
  }

  .ais-Pagination-item.ais-Pagination-item--selected.ais-Pagination-item--page
    .ais-Pagination-link {
    color: #ffffff;
    border-color: #ff585b;
  }

  .ais-Pagination-item--disabled {
    visibility: hidden;
  }
  /* Rheostat */
  .rheostat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .rheostat {
    height: 24px;
    position: relative;
    overflow: visible;
  }

  .rheostat-background {
    background: #dce0e0;
    height: 2px;
    position: relative;
    top: 14px;
    width: 100%;
  }

  .rheostat-values {
    display: flex;
    width: 300px;
    font-size: 12px;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.6);
  }

  .rheostat--disabled .rheostat-progress {
    background-color: #edefed;
  }

  .rheostat--disabled .rheostat-handle {
    cursor: default;
  }

  .rheostat-progress {
    background-color: #ff585b;
    height: 4px;
    position: absolute;
    top: 13px;
  }

  .rheostat-handle {
    border: 1px solid #ff585b;
    background: #fff;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    height: 24px;
    margin-left: -12px;
    position: absolute;
    z-index: 2;
    width: 24px;
    font-size: 0;
  }
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
    height: 18px;
  }
  .noUi-horizontal .noUi-handle {
    width: 34px;
    height: 28px;
    right: -17px;
    top: -6px;
  }
  .noUi-vertical {
    width: 18px;
  }
  .noUi-vertical .noUi-handle {
    width: 28px;
    height: 34px;
    right: -6px;
    top: -17px;
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
    background: #3fb8af;
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
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
    top: auto;
    right: 28px;
  }
`;

export default Container;
