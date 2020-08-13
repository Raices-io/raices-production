import React from 'react';
import { SearchBox, Highlight, InstantSearch, Configure } from 'react-instantsearch-dom';

import Container from './styles/Container';
import InfiniteHits from './styles/InfiniteHits';

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
					<Configure hitsPerPage={2} />
					<div className="search">
						{' '}
						<SearchBox
							translations={{
								placeholder: 'Nombre, correo',
							}}
						/>
					</div>
					<div className="results">
						<InfiniteHits
							minHitsPerPage={3}
							maxHitsPerPage={3}
							updateAgent={this.props.updateAgent}
						/>
					</div>
					{/* bottom nav */}
				</InstantSearch>
			</Container>
		);
	}
}
