import React, { Component } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Nouislider from "nouislider-react";
import RangeSlider from "reactrangeslider";

const StyledSlider = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 75%;
  align-self: center;
  margin: 0 auto;
  .noUi-origin {
    .noUi-tooltip {
      border: none;
      background: transparent;
      cursor: grab;
      width: 40px;
      font-size: 0.75rem;
    }
    &:nth-child(2) {
      .noUi-tooltip {
        bottom: -120%;
      }
    }
    &:nth-child(3) {
      .noUi-tooltip {
        left: 0;
      }
    }
  }
`;

class Range extends Component {
  state = {
    currentValues: { min: this.props.min, max: this.props.max },
    min: 0,
    max: 1000000000,
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.canRefine &&
      (prevProps.currentRefinement.min !== this.props.currentRefinement.min ||
        prevProps.currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      this.setState({
        currentValues: {
          min: this.props.currentRefinement.min,
          max: this.props.currentRefinement.max,
        },
      });
    }
  }

  onValuesUpdated = (sliderState) => {
    this.setState({
      currentValues: {
        min: parseInt(sliderState.values[0]),
        max: parseInt(sliderState.values[1]),
      },
    });
  };

  onChange = (sliderState) => {
    console.log("slider state");
    console.log(sliderState);
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min:
          parseInt(sliderState[0]) <= this.props.min
            ? this.props.min
            : parseInt(sliderState[0]),
        max:
          parseInt(sliderState[1]) >= this.props.max
            ? this.props.max
            : parseInt(sliderState[1]),
      });
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;
    return this.props.min !== this.props.max ? (
      <StyledSlider>
        {/* Styled Components Slider here */}
        <Nouislider
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
          range={{ min: this.props.min, max: this.props.max }}
          start={[this.props.min, this.props.max]}
          connect
          tooltips={[
            {
              to: function (value) {
                if (value < 1000000) {
                  return "< 1 M COP";
                } else {
                  return `${parseInt(value / 1000000)} M COP`;
                }
              },
            },
            {
              to: function (value) {
                if (value < 1000000) {
                  return "< 1 M COP";
                } else {
                  return `${parseInt(value / 1000000)} M COP`;
                }
              },
            },
          ]}
          step={1000}
        />
      </StyledSlider>
    ) : (
      <span>Por favor ajuste su búsqueda</span>
    );
  }
}

export default Range;
