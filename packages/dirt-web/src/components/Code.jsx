import { useState } from 'react';
import styled, { css } from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from '../services/prism/prism';
import { Button } from '@raices/dirt';

const Code = ({ code, maxHeight }) => {
	const [expand, setExpand] = useState(false);
	console.log(expand);

	return (
		<EditorContainer expand={expand} maxHeight={maxHeight}>
			<Editor
				value={code}
				highlight={code => highlight(code, languages.jsx)}
				onValueChange={code => ''}
				padding={20}
				style={{
					fontSize: 16,
					backgroundColor: '#222',
				}}
				tabSize={4}
				insertSpaces={false}
			/>
			<Expand>
				<Button onClick={() => setExpand(!expand)}>{!expand ? 'Expand' : 'Collapse'}</Button>
			</Expand>
			{!expand && <div className="bg"></div>}
		</EditorContainer>
	);
};

const EditorContainer = styled.div`
	width: min(900px, 90vw);
	max-height: ${({ expand, maxHeight }) => (expand ? maxHeight : '250px')};
	border-radius: 5px;
	position: relative;
	overflow: hidden;
	transition: all 150ms ease-in-out;
	margin: 2rem 0;

	.bg {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		border-radius: 5px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40.31%, rgba(25, 25, 25, 0.95) 100%);
		${({ expand }) =>
			expand &&
			css`
				display: none;
			`}
	}
`;

const Expand = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	z-index: 1;
`;

export default Code;
