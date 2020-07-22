import { useRouter } from 'next/router';
import styled from 'styled-components';
import ListItem from './ListItem';

const TableOfContent = ({ link }) => {
	const router = useRouter();

	const isCurrentPath = router.asPath.indexOf(link.name.toLowerCase()) === -1;

	return link && !isCurrentPath ? (
		<Container>
			{link.subDirectory && (
				<List>
					{link.subDirectory.map(link => {
						return (
							<li key={link.name}>
								<ListItem name={link.name} />
								{link.subDirectory && (
									<InnerList>
										{link.subDirectory.map(subDir => {
											return (
												<li key={subDir}>
													<ListItem name={subDir} />
												</li>
											);
										})}
									</InnerList>
								)}
							</li>
						);
					})}
				</List>
			)}
		</Container>
	) : null;
};

const Container = styled.div``;

const List = styled.ul``;

const InnerList = styled.ul`
	padding-left: 1.75rem;
	border-left: 1px solid #444;
`;

export default TableOfContent;
