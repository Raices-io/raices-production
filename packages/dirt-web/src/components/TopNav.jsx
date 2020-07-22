import Link from 'next/link';
import styled from 'styled-components';

export default () => {
	return (
		<header>
			<Nav>
				<Link href="/design">
					<a>Design</a>
				</Link>
				<Link href="/components">
					<a>Components</a>
				</Link>
			</Nav>
		</header>
	);
};

const Nav = styled.nav`
	display: flex;
    align-items: center;
    height: 80px;
	a {
		margin-right: 2rem;
        margin-bottom: 0;
        color: #FFF;
	}
`;
