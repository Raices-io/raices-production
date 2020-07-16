import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
	InstantSearchWrapper,
	SearchBoxSimple,
	AlgoliaSearchDropdownHomeList,
} from "@raices/dirt";

import Layout from "../../../components/Layout";
import directory from "../../directory";
import PageContainer from "../../../styles/styled-components/PageContainer";
import { useEffect, useRef, useState } from "react";
import { useSideNav } from "../../../contexts/SideNavContext/SideNavProvider";

export default () => {
	const { setActiveSection } = useSideNav();
	let propertiesRef = useRef(null);
	let typesOfButtonsRef = useRef(null);
	let scrollerRef = useRef(null);

	useEffect(() => {
		ScrollTrigger.create({
			trigger: propertiesRef,
			scroller: scrollerRef,
			start: "top",
			onEnter: self => setActiveSection("properties"),
			onEnterBack: self => setActiveSection("properties"),
			onLeave: self => setActiveSection(""),
			onLeaveBack: self => setActiveSection(""),
			markers: true,
		});

		ScrollTrigger.create({
			trigger: typesOfButtonsRef,
			scroller: scrollerRef,
			start: "top",
			onEnter: self => setActiveSection("type-of-buttons"),
			onEnterBack: self => setActiveSection("type-of-buttons"),
			onLeave: self => setActiveSection(""),
			onLeaveBack: self => setActiveSection(""),
			markers: true,
		});
	}, []);

	const [input, setInput] = useState(false);
	return (
		<Layout directory={directory}>
			<PageContainer ref={el => (scrollerRef = el)}>
				<div style={{ height: "50vh" }}>
					<h1 style={{ marginBottom: "2rem" }}>Search</h1>
					<h4>
						Note - including the searchbox and or the dropdown list,
						you need to have input and setInput useState set
					</h4>
					<h2 id="properties">Search Box</h2>
					<InstantSearchWrapper
						appId="K73YVZFWW4"
						searchId="6c5b646c734a1e4d189779cce03e2bf8"
						hitsCount={8}
						indexName="prod_HOMES"
					>
						<SearchBoxSimple
							setInput={setInput}
							placeholder="Test"
						/>
					</InstantSearchWrapper>
				</div>
				<div
					style={{ height: "30vh" }}
					ref={el => {
						propertiesRef = el;
					}}
				>
					<h2>Search Box with Dropdown</h2>
					<InstantSearchWrapper
						appId="K73YVZFWW4"
						searchId="6c5b646c734a1e4d189779cce03e2bf8"
						hitsCount={8}
						indexName="prod_HOMES"
					>
						<SearchBoxSimple
							setInput={setInput}
							placeholder="Test"
						/>

						<AlgoliaSearchDropdownHomeList
							input={input}
							setInput={setInput}
						/>
					</InstantSearchWrapper>
				</div>
				<div
					style={{ height: "100vh" }}
					ref={el => {
						typesOfButtonsRef = el;
					}}
				>
					{/* <h2 id="type-of-buttons">Type of Buttons</h2> */}
				</div>
			</PageContainer>
		</Layout>
	);
};
