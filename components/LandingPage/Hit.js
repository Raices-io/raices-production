import Link from 'next/link';
import NumberFormat from 'react-number-format';
import { Highlight, connectStateResults } from 'react-instantsearch-dom';
import styled from 'styled-components';

const Hit = connectStateResults(({ hit, searchState }) =>
	searchState.query ? (
		<Link href={`/propiedades/${hit.objectID}`}>
			<StyledHit homeImage={hit.defaultPic}>
				<div className="pictures-wrapper">
					<div className="picture"></div>
				</div>
				<div className="infos">
					<h4 className="media-heading">{hit.title}</h4>
					<span>
						{
							<NumberFormat
								thousandSeparator={true}
								displayType="text"
								prefix={'$ '}
								value={hit.price}
								className="price"
							/>
						}
					</span>
					<p>
						{hit.bedrooms} hab.- {hit.bathrooms} baños <Highlight attribute="country" hit={hit} />
					</p>
				</div>
			</StyledHit>
		</Link>
	) : null,
);

const StyledHit = styled.div`
	display: flex;
	width: 100%;
	padding: 0.5rem 1rem;
	cursor: pointer;

	&:last-child {
		padding-bottom: 1rem;
	}

	&:first-child {
		padding-top: 1rem;
	}

	&:hover {
		background-color: #F2F5F9;
	}

	.media-heading {
		display: block;
		text-overflow: ellipsis;
		min-width: 0;
		/* Required for text-overflow to do anything */
		white-space: nowrap;
		overflow: hidden;
		font-weight: 600;
	}
	.infos {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		justify-content: space-between;

		p {
			font-size: 1rem;
		}
	}
	.picture {
		background-image: url(${props => props.homeImage});
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		min-width: 100%;
		min-height: 80px;
		border-radius: 5px;
	}

	.pictures-wrapper {
		min-width: 130px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export default Hit;
