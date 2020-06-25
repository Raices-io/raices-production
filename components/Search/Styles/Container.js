import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
  @media (min-width: 768px) {
    height: 100%;
    padding-top: 80px;
  }
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    padding-bottom: 0;
    padding-top: 80px;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    height: 61px;
    min-height: 61px;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
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

  .results {
    flex-grow: 1;
    flex-shrink: 0;
    height: calc(100% - 61px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .footer {
    max-width: 800px;
    height: 50px;
    min-height: 50px;
    overflow-y: hidden;
    bottom: 0;
    position: fixed;
    min-width: 100%;
    background-color: red;
    -webkit-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    -moz-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    -o-transition: all 0.3s ease-out, bottom 0.3s ease-out;
    transition: all 0.3s ease-out, bottom 0.3s ease-out;
    ${(props) => props.hideNav && `min-height: 0; height: 0`}
  }

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
`;

export default Container;
