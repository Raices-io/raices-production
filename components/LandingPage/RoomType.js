import { connectRefinementList } from 'react-instantsearch-dom';
import styled, { css } from 'styled-components';

const RoomType = connectRefinementList(({ items, refine, currentRefinement, input }) => {
	const sortedItems = items.sort((i1, i2) => i1.label.localeCompare(i2.label));

	const hitComponents = sortedItems.map((item, index) => {
		const selectedClassName = item.isRefined ? ' ais-refinement-list--item__active' : '';
		const itemClassName = `ais-refinement-list--item ${selectedClassName}`;

		return (
			<div
				className={`${itemClassName}`}
				key={item.label}
				style={{ cursor: 'pointer' }}>
				<StyledTab
					selected={currentRefinement.includes(item.label)}
					className={`ais-refinement-list--label ${index === 0 ? 'left' : 'right'} ${
						sortedItems.length === 1 ? 'single' : ''
					}`}>
					<TabButton
						className="ais-refinement-list--label"
						onClick={e => {
							e.preventDefault();
							refine(item.value);
						}}>
						<p>{item.label == 'rent' ? 'Alquilar' : 'Comprar'} </p>
					</TabButton>
				</StyledTab>
			</div>
		);
	});

	return (
		<div className="row aisdemo-filter">
			<StyledTabs id="room_types" input={input}>
				{hitComponents}
			</StyledTabs>
		</div>
	);
});

const StyledTab = styled.div`
	color: rgba(255, 255, 255, 1);
	background-color: ${props => (props.selected ? '#f1f1f1' : 'transparent')};
	color: ${props => (props.selected ? '#5A67D8' : '#f1f1f1')};
	padding: 0.25rem 1rem;

	&.left {
		border-radius: 5px 0 0 5px;
	}

	&.right {
		border-radius: 0 5px 5px 0;
	}

	&.single {
		border-radius: 5px;
	}

	&:hover {
		background: #f1f1f1;
		color: #5a67d8;
	}
`;

const StyledTabs = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	width: fit-content;
	border-radius: 5px;
	justify-content: space-between;
	margin-bottom: 3px;

	${props =>
		props.input &&
		css`
			@media (max-width: 768px) {
				position: absolute;
				margin-top: 62px;
			}
		`}
`;

const TabButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default RoomType;
