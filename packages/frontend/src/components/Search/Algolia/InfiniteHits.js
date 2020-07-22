import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import Hit from './Hit';
import styled from 'styled-components';

class InfiniteHits extends Component {
	sentinel = null;

	onSentinelIntersection = entries => {
		const { hasMore, refine } = this.props;

		entries.forEach(entry => {
			if (entry.isIntersecting && hasMore) {
				refine();
			}
		});
	};

	componentDidMount() {
		this.observer = new IntersectionObserver(this.onSentinelIntersection);

		this.observer.observe(this.sentinel);
	}

	componentWillUnmount() {
		this.observer.disconnect();
	}

	render() {
		const { hits } = this.props;

		return (
			<InfiniteHitsStyles>
				<ul className="ais-InfiniteHits-list">
					{hits.map(hit => (
						<li key={hit.objectID} className="ais-InfiniteHits-item">
							<Hit hit={hit} />
						</li>
					))}
					<li className="ais-InfiniteHits-sentinel" ref={c => (this.sentinel = c)} />
				</ul>
			</InfiniteHitsStyles>
		);
	}
}

const InfiniteHitsStyles = styled.div`
	display: grid;
	margin: 2rem 0;
	height: 100%;

	ul {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
		grid-gap: 2.5rem 48px;
	}

	.ais-InfiniteHits-sentinel {
		margin-bottom: 2rem;
	}
`;

export default connectInfiniteHits(InfiniteHits);
