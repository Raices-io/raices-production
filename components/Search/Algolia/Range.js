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
      if (parseInt(sliderState[0]) == 0) {
        this.props.refine({
          min: this.props.min,
          max: parseInt(sliderState[1]),
        });
      } else {
        this.props.refine({
          min: parseInt(sliderState[0]),
          max: parseInt(sliderState[1]),
        });
      }
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;
    return this.state.min !== this.state.max ? (
      <StyledSlider>
        {/* Styled Components Slider here */}
        <Nouislider
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
          range={{ min: 0, max: 1000000000 }}
          start={[0, 1000000000]}
          connect
          tooltips={[true, true]}
          step={1000}
        />
        <div className="rheostat-values">
          <div>
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="thousand"
              displayType="text"
              prefix={"$"}
              value={0}
            />
          </div>
          <div>
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="thousand"
              displayType="text"
              prefix={"$"}
              value={10000000}
            />
          </div>
        </div>
      </StyledSlider>
    ) : (
      <span>Please select more than one property</span>
    );
  }
}

export default Range;
