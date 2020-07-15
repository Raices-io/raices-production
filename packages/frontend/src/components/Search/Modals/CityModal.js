import styled, { css } from 'styled-components';
import { RefinementList } from 'react-instantsearch-dom';

import { useStateNavigation } from '../../../context/navigation/NavigationProvider';
import colors from '../../../util/colors';

const CityModal = () => {
	const filterState = useStateNavigation();

	return (
		<Container
			show={filterState?.cityFilter}
			onClick={e => {
				e.stopPropagation();
			}}>
			<RefinementList
				className="grid"
				attribute="city"
				searchable={true}
				translations={{
					placeholder: 'Busca por ciudades…',
				}}
			/>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 0.5rem;
	z-index: 30;

	width: 300px;

	background-color: ${colors('bg.white')};
	padding: 0.5rem 1rem;
	border: 1px solid ${colors('border.light')};
	border-radius: 5px;

	box-shadow: 10px 25px 15px rgba(0, 0, 0, 0.15);

	${({ show }) =>
		!show &&
		css`
			opacity: 0;
			pointer-events: none;
		`}

	.ais-RefinementList {
		margin-top: 0.5rem;

		.ais-SearchBox {
			position: relative;

			.ais-SearchBox-reset {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				margin-right: 1rem;
				fill: #a0aec0;

				svg {
					width: 10px;
					height: 10px;
				}
			}

			.ais-SearchBox-form {
				height: 100%;
				width: 100%;
				margin-bottom: 1rem;
			}
			.ais-SearchBox-input {
				padding: 0.25rem 2.5rem;
				border-radius: 5px;
				width: 100%;
				color: #4d4d4d;
                font-size: 0.9rem;
				border: 1px solid ${colors('text.light')};
				&:focus {
					outline: none;
				}
			}
			.ais-SearchBox-submit {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				margin-left: 1rem;
				fill: #a0aec0;
				border: none;
				outline: none;
			}
			.ais-SearchBox-submitIcon {
				width: 15px;
				height: 15px;
			}
		}

		.ais-RefinementList-list {
			.ais-RefinementList-item {
				margin-bottom: 0.5rem;

				.ais-RefinementList-label {
					display: flex;
					align-items: center;
                    font-size: 0.9rem;

					.ais-RefinementList-checkbox {
						margin-right: 0.5rem;
						height: 0.9rem;
						width: 0.9rem;
					}

                    .ais-RefinementList-count {
                        margin-left: 1rem;
                    }
				}
			}
		}
	}
`;

export default CityModal;
