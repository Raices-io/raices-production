import styled, { css } from 'styled-components';
import formatHref from '../../util/formatHref';
import colors from '../../util/colors';

import { useSideNav } from '../../contexts/SideNavContext/SideNavProvider';
import { useEffect, useState } from 'react';

const ListItem = ({ name }) => {
	const [isActive, setIsActive] = useState(false);
	const { activeSection } = useSideNav();

	useEffect(() => {
		if (activeSection === formatHref(name)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [activeSection]);

	return (
		<Item isActive={isActive}>
			<a href={`#${formatHref(name)}`}>{name}</a>
		</Item>
	);
};

const Item = styled.p`
	border-left: 1px solid red;
	width: 100%;
	border-left: 1px solid #444;
	padding-left: 1.75rem;
	margin-bottom: 0;
	line-height: 2.15rem;

	a {
		color: #999;
		margin-bottom: 0;

		&:hover {
			color: #FFF;
		}
	}

	${({ isActive }) => {
		return (
			isActive &&
			css`
				border-left: 1px solid ${colors('primary')};
				a {
					color: white;
				}
			`
		);
	}}
`;

export default ListItem;
