import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button, TextButtonLink } from '@raices/dirt';
import { useEffect, useRef } from 'react';

import { useSideNav } from '../../../contexts/SideNavContext/SideNavProvider';
import Layout from '../../../components/Layout';
import directory from '../../directory';
import PageContainer from '../../../styles/styled-components/PageContainer';
import Code from '../../../components/Code';

export default () => {
	const { setActiveSection } = useSideNav();
	let propertiesRef = useRef(null);
	let typesOfButtonsRef = useRef(null);
	let scrollerRef = useRef(null);

	useEffect(() => {
		ScrollTrigger.create({
			trigger: propertiesRef,
			scroller: scrollerRef,
			start: 'top',
			onEnter: self => setActiveSection('properties'),
			onEnterBack: self => setActiveSection('properties'),
			onLeave: self => setActiveSection(''),
			onLeaveBack: self => setActiveSection(''),
			markers: true,
		});

		ScrollTrigger.create({
			trigger: typesOfButtonsRef,
			scroller: scrollerRef,
			start: 'top',
			onEnter: self => setActiveSection('type-of-buttons'),
			onEnterBack: self => setActiveSection('type-of-buttons'),
			onLeave: self => setActiveSection(''),
			onLeaveBack: self => setActiveSection(''),
			markers: true,
		});
	}, []);

	const code = `const Code = ({ code }) => {
	return (
		<EditorContainer>
			<Editor
				value={code}
				highlight={code => highlight(code, languages.jsx)}
				onValueChange={code => ""}
				padding={20}
				style={{
					fontSize: 16,
					backgroundColor: '#222',
					borderRadius: "5px"
				}}
				tabSize={4}
				insertSpaces={false}
			/>
		</EditorContainer>
	);
};`;

	return (
		<Layout directory={directory}>
			<PageContainer ref={el => (scrollerRef = el)}>
				<div style={{ height: '50vh' }}>
					<h1 style={{ marginBottom: '2rem' }}>Button Page</h1>
					<Button>Primary</Button>
				</div>
				<div
					ref={el => {
						propertiesRef = el;
					}}>
					<h2 id="properties">Properties</h2>
					<Code code={code} maxHeight="600px" />
				</div>
				<div
					style={{ height: '100vh' }}
					ref={el => {
						typesOfButtonsRef = el;
					}}>
					<h2 id="type-of-buttons">Type of Buttons</h2>

					<h2 id="text-(link)">Text</h2>
					<TextButtonLink route={'/components/button'} anchor={'Propiedades'}></TextButtonLink>
				</div>
			</PageContainer>
		</Layout>
	);
};
