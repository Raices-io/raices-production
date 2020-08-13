import styled, { css } from 'styled-components';
import { useStateNavigation } from '../../../context/navigation/NavigationProvider';
import colors from '../../../util/colors';
import { Panel, NumericMenu } from 'react-instantsearch-dom';

const BedBathModal = () => {
	const filterState = useStateNavigation();

	return (
		<Container
			show={filterState?.bedBathFilter}
			onClick={e => {
				e.stopPropagation();
			}}>
			<Heading>Habitaciones</Heading>
			<NumericMenu
				attribute="bedrooms"
				items={[
					{ label: '1+', start: 0 },
					{ label: '2+', start: 2 },
					{ label: '3+', start: 3 },
					{ label: '4+', start: 4 },
				]}
				translations={{
					all: 'Todos',
				}}
				transformItems={function (items) {
					return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
				}}
			/>
			<Heading>Baños</Heading>
			<NumericMenu
				attribute="bathrooms"
				items={[
					{ label: '1+', start: 0 },
					{ label: '2+', start: 2 },
					{ label: '3+', start: 3 },
					{ label: '4+', start: 4 },
				]}
				translations={{
					all: 'Todos',
				}}
				transformItems={function (items) {
					return items.sort((i1, i2) => i1.label.localeCompare(i2.label));
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

	.ais-NumericMenu {
		margin: 0.5rem 0;

		.ais-NumericMenu-list {
			display: flex;
			width: 100%;
			border: 1px solid ${colors('border.light')};
			border-radius: 5px;

			.ais-NumericMenu-item {
				flex-grow: 1;
				border-left: 1px solid ${colors('border.light')};

				&:first-child {
					border-radius: 5px 0 0 5px;
					border-left: none;
				}
				&:last-child {
					border-radius: 0 5px 5px 0;
				}

				.ais-NumericMenu-label {
					width: 100%;
					display: flex;
					justify-content: center;
				}

				.ais-NumericMenu-labelText {
					display: block;
					color: ${colors('primary')};
					text-align: center;
					padding: 0.25rem 0;
					width: 100%;
                    font-size: 0.9rem;
					cursor: pointer;
				}
				.ais-NumericMenu-radio {
					display: none;
				}
			}

			.ais-NumericMenu-item--selected {
				.ais-NumericMenu-labelText {
					color: ${colors('text.white')};
					background-color: ${colors('primary')};
				}
			}

			.ais-NumericMenu-item--noRefinement {
				.ais-NumericMenu-labelText {
					color: ${colors('text.light')};
					cursor: default;
				}
			}
		}
	}
`;

const Heading = styled.p`
	font-size: 0.9rem;
`;

export default BedBathModal;
