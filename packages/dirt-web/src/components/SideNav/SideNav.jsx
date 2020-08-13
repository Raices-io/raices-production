import styled from 'styled-components';
import Link from 'next/link';
import TableOfContent from './TableOfContent';
import formatHref from '../../util/formatHref';
import colors from '../../util/colors';
import { useRouter } from 'next/router';

const SideNav = ({ directory }) => {
	const router = useRouter();

	const mainPath = router.route.split('/')[1];

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
											<Link href={`/${mainPath}/${formatHref(link.name)}`}>
												<ItemLink>{link.name}</ItemLink>
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
	color: ${colors('primary')};
	margin: 1rem 0 0.5rem;
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

const ItemLink = styled.a`
	color: #f9f9f9;
	cursor: pointer;
`;

export default SideNav;
