import formatHref from "../../utilities/formatHref";
import styled from "styled-components";
import ListItem from "./ListItem";

const TableOfContent = ({ link }) => {
	return link ? (
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
    border-left: 1px solid lightgray;
`;

export default TableOfContent;
