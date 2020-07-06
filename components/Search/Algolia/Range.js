import React, { Component } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Nouislider from 'nouislider-react';
import colors from '../../../util/colors';

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

	onValuesUpdated = sliderState => {
		this.setState({
			currentValues: {
				min: parseInt(sliderState[0]),
				max: parseInt(sliderState[1]),
			},
		});
	};

	onChange = sliderState => {
		if (
			this.props.currentRefinement.min !== sliderState[0] ||
			this.props.currentRefinement.max !== sliderState[1]
		) {
			this.props.refine({
				min: parseInt(sliderState[0]) <= this.props.min ? this.props.min : parseInt(sliderState[0]),
				max: parseInt(sliderState[1]) >= this.props.max ? this.props.max : parseInt(sliderState[1]),
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
					start={[this.props.currentRefinement.min, this.props.currentRefinement.max]}
					connect
					step={1000}
				/>
				<div className="price-range-display">
					<div>
						<NumberFormat
							thousandSeparator={true}
							thousandsGroupStyle="thousand"
							displayType="text"
							prefix={'$'}
							value={currentRefinement.min}
						/>{' '}
						COP
					</div>
					<div>
						<NumberFormat
							thousandSeparator={true}
							thousandsGroupStyle="thousand"
							displayType="text"
							prefix={'$'}
							value={currentRefinement.max}
						/>{' '}
						COP
					</div>
				</div>
			</StyledSlider>
		) : (
			<span>Por favor ajuste su búsqueda</span>
		);
	}
}

const StyledSlider = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	width: 100%;
	align-self: center;
	margin: 0 auto;
	.noUi-target {
		padding: 0 17px;
	}

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
	/* Slider size and handle placement */
	.noUi-horizontal {
		height: 7px;
	}
	.noUi-horizontal .noUi-handle {
		width: 24px;
		height: 18px;
		right: -17px;
		top: -6px;
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

	.noUi-connect {
		background: ${colors('primary')};
	}
	/* Handles and cursors */
	.noUi-draggable {
		cursor: grabbing;
	}

	.noUi-vertical .noUi-draggable {
		cursor: grabbing;
	}

	.noUi-handle {
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		background: #fff;
		cursor: pointer;
		box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ebebeb, 0 3px 6px -3px #bbb;
	}

	.noUi-active {
		box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ddd, 0 3px 6px -3px #bbb;
	}
	/* Handle stripes;
 */
	.noUi-handle:before,
	.noUi-handle:after {
		content: '';
		display: block;
		position: absolute;
		height: 7px;
		width: 1px;
		background: #e8e7e6;
		left: 9px;
		top: 4px;
	}

	.noUi-handle:after {
		left: 12px;
	}

	.price-range-display {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
	}
`;

export default Range;
