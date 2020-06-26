import styled from "styled-components";

const StyledHit = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin-top: 0.5rem;
  .media-heading {
    display: block;
    text-overflow: ellipsis;
    min-width: 0;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
  }
  .infos {
    margin-left: 0.3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .picture {
    background-image: url(${(props) => props.homeImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-width: 100%;
    height: 90%;
    min-height: 70px;
    border-radius: 5px;
  }
  .profile {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: absolute;
    right: 0.3rem;
    bottom: 0.3rem;
  }
  .pictures-wrapper {
    min-width: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default StyledHit;
