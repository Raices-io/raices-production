import React, { useState, useEffect } from "react";
import { connectRange } from "react-instantsearch-dom";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import styled from "styled-components";

const SliderStyle = styled.div`
  .ais-RangeSlider .slider-rail {
    background-color: rgba(65, 66, 71, 0.08);
    border-radius: 3px;
    cursor: pointer;
    height: 3px;
    position: absolute;
    width: 100%;
  }

  .ais-RangeSlider .slider-track {
    background-color: #e2a400;
    border-radius: 3px;
    cursor: pointer;
    height: 3px;
    position: absolute;
  }

  .ais-RangeSlider .slider-tick {
    cursor: grab;
    display: flex;
    font-size: 0.75rem;
    font-weight: bold;
    position: absolute;
    text-align: center;
    top: -28px;
    transform: translateX(-50%);
    user-select: none;
  }

  .ais-RangeSlider .slider-handle {
    background-image: linear-gradient(to top, #f5f5fa, #fff);
    border-radius: 50%;
    box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
      0 2px 3px 0 rgba(93, 100, 148, 0.2);
    cursor: grab;
    height: 16px;
    outline: none;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 16px;
    z-index: 1;
  }

  @media (max-width: 899px) {
    .ais-RangeSlider .slider-handle {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
`;

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      {/* Dummy element to make the tooltip draggable */}
      <div
        style={{
          position: "absolute",
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: "translate(-50%, -100%)",
          cursor: disabled ? "not-allowed" : "grab",
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        className="slider-handle"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          cursor: disabled ? "not-allowed" : "grab",
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

const PriceSlider = ({ min, max, refine, currentRefinement, canRefine }) => {
  const [ticksValues, setTicksValues] = useState([
    currentRefinement.min,
    currentRefinement.max,
  ]);

  useEffect(() => {
    setTicksValues([currentRefinement.min, currentRefinement.max]);
  }, [currentRefinement]);

  const onChange = (values) => {
    refine({ min: values[0], max: values[1] });
  };

  if (
    !canRefine ||
    ticksValues[0] === undefined ||
    ticksValues[1] === undefined
  ) {
    return null;
  }

  return (
    <SliderStyle>
      <Slider
        mode={2}
        step={1}
        domain={[min, max]}
        values={[currentRefinement.min, currentRefinement.max]}
        disabled={!canRefine}
        onChange={onChange}
        onUpdate={setTicksValues}
        rootStyle={{ position: "relative", marginTop: "1.5rem" }}
        className="ais-RangeSlider"
      >
        <Rail>
          {({ getRailProps }) => (
            <div className="slider-rail" {...getRailProps()} />
          )}
        </Rail>

        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <div
                  key={id}
                  className="slider-track"
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`,
                  }}
                  {...getTrackProps()}
                />
              ))}
            </div>
          )}
        </Tracks>

        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[min, max]}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>

        <Ticks values={ticksValues}>
          {({ ticks }) => (
            <div>
              {ticks.map(({ id, count, value, percent }) => (
                <div
                  key={id}
                  className="slider-tick"
                  style={{
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${percent}%`,
                  }}
                >
                  <span style={{ color: "#e2a400", marginRight: 4 }}>$</span>
                  {value}
                </div>
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </SliderStyle>
  );
};

export default connectRange(PriceSlider);
