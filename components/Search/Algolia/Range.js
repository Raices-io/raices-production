import React, { Component } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Nouislider from "nouislider-react";

const StyledSlider = styled.div`
  display: flex;
  flex-direction: column;
`;

class Range extends Component {
  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentDidUpdate(prevProps) {
    if (
      this.props.canRefine &&
      (prevProps.currentRefinement.min !== this.props.currentRefinement.min ||
        prevProps.currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      console.log("setting state");
      this.setState({
        currentValues: {
          min: this.props.currentRefinement.min,
          max: this.props.currentRefinement.max,
        },
      });
      console.log(this.state.currentValues);
    }
  }

  onValuesUpdated = (sliderState) => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    });
  };

  onChange = (sliderState) => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState[0],
        max: sliderState[1],
      });
    }
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    const { currentValues } = this.state;
    return min !== max ? (
      <StyledSlider>
        {/* Styled Components Slider here */}
        <Nouislider
          min={min}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
          range={{ min: min, max: max }}
          start={[20, 80]}
          connect
          step={1000}
        />
        <div className="rheostat-values">
          <div>
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="thousand"
              displayType="text"
              prefix={"$"}
              value={currentRefinement.min}
            />
          </div>
          <div>
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="thousand"
              displayType="text"
              prefix={"$"}
              value={currentRefinement.max}
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
