import styled, { css } from "styled-components";
import formatHref from "../../utilities/formatHref";

import { useSideNav } from "../../contexts/SideNavContext/SideNavProvider";
import { useEffect, useState } from "react";

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
	border-left: 1px solid lightgray;
	padding-left: 1.75rem;
	margin-bottom: 0;
	line-height: 2.15rem;
	color: inherit;

	a {
		margin-bottom: 0;
	}

	${({ isActive }) => {
		return (
			isActive &&
			css`
				border-left: 1px solid red;
				a {
					color: red;
				}
			`
		);
	}}
`;

export default ListItem;
