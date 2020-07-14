import React from 'react';
import { SearchBox, Highlight, InstantSearch, RefinementList } from 'react-instantsearch-dom';

import Container from './styles/Container';
import InfiniteHits from './styles/InfiniteHits';

const HitComponent = ({ hit }) => (
	<div className="hit">
		<div>
			<div className="hit-picture">
				<img src={`${hit.image}`} />
			</div>
		</div>
		<div className="hit-content">
			<div>
				<Highlight attribute="name" hit={hit} />
				<span> - ${hit.price}</span>
				<span> - {hit.rating} stars</span>
			</div>
			<div className="hit-type">
				<Highlight attribute="type" hit={hit} />
			</div>
			<div className="hit-description">
				<Highlight attribute="description" hit={hit} />
			</div>
		</div>
	</div>
);

export default class extends React.Component {
	render() {
		return (
			<Container hideNav={this.props.hideBottomNav}>
				<InstantSearch
					searchClient={this.props.searchClient}
					resultsState={this.props.resultsState}
					onSearchStateChange={this.props.onSearchStateChange}
					searchState={this.props.searchState}
					createURL={this.props.createURL}
					indexName={this.props.indexName}
					onSearchParameters={this.props.onSearchParameters}
					{...this.props}>
					<div className="search">
						{' '}
						<SearchBox
							translations={{
								placeholder: 'Nombre, correo',
							}}
						/>
					</div>
					<div className="results">
						<InfiniteHits minHitsPerPage={16} />
					</div>
					{/* bottom nav */}
				</InstantSearch>
			</Container>
		);
	}
}
