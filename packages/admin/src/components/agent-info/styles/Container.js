import styled from 'styled-components';

const Container = styled.div`
	@media (min-width: 768px) {
		margin-bottom: 0;
	}
	.search {
		display: flex;
		justify-content: flex-start;
		height: 61px;
		min-height: 61px;
		align-items: center;
		width: 100%;
		padding: 0 1rem;
		align-self: center;
		.ais-SearchBox {
			width: 75%;
		}
		.ais-SearchBox-reset,
		.ais-SearchBox-submit {
			display: none;
		}
		form {
			input {
				border: 1px solid gray;
				border-radius: 5px;
				width: calc(100% - 10px);
				outline: none;
				padding: 0.5rem;
			}
		}
	}

	.header {
		height: 10vh;
		min-height: 10vh;
		@media (max-width: 600px) {
			display: none;
		}
	}

	.results {
		flex-grow: 1;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		min-height: 0;
	}
	.footer {
		max-width: 800px;
		height: 50px;
		min-height: 50px;
		overflow-y: hidden;
		bottom: 0;
		position: fixed;
		min-width: 100%;
		background-color: red;
		-webkit-transition: all 0.3s ease-out, bottom 0.3s ease-out;
		-moz-transition: all 0.3s ease-out, bottom 0.3s ease-out;
		-o-transition: all 0.3s ease-out, bottom 0.3s ease-out;
		transition: all 0.3s ease-out, bottom 0.3s ease-out;
		${props => props.hideNav && `min-height: 0; height: 0`}
	}
	.ais-RefinementList {
		padding-left: 1rem;
	}
`;

export default Container;
