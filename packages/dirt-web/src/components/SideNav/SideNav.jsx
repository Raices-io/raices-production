import styled from 'styled-components';
import Link from 'next/link';
import TableOfContent from './TableOfContent';
import formatHref from '../../utilities/formatHref';

const SideNav = ({ directory }) => {
	return (
		<Nav>
			{directory.map(dir => {
				return (
					<SideNavGroup key={dir.name}>
						<GroupTitle>{dir.name}</GroupTitle>
						{dir.links && (
							<SideNavItem>
								{dir.links.map(link => {
									return (
										<SideNavItemContainer key={link.name}>
											<Link href={`/components/${formatHref(link.name)}`}>
												<a>{link.name}</a>
											</Link>
											<TableOfContent link={link} key={link.name} />
										</SideNavItemContainer>
									);
								})}
							</SideNavItem>
						)}
					</SideNavGroup>
				);
			})}
		</Nav>
	);
};

const Nav = styled.nav``;

const GroupTitle = styled.h4`
	/* font-size: 1.5rem; */
	color: #444444;
	margin: 1rem 0;
	padding-left: 1.25rem;
`;

const SideNavGroup = styled.div``;

const SideNavItem = styled.div`
	padding-left: 1.25rem;
	list-style: none;
`;

const SideNavItemContainer = styled.div`
	a {
		line-height: 2.15rem;
		margin-bottom: 0;
	}
`;

const SubDirItem = styled.li``;

export default SideNav;
