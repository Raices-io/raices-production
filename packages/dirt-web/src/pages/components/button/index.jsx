import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button, TextButtonLink } from "@dirt/design-system";

import Layout from "../../../components/Layout";
import directory from "../../directory";
import PageContainer from "../../../styles/styled-components/PageContainer";
import { useEffect, useRef } from "react";
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

	return (
		<Layout directory={directory}>
			<PageContainer ref={el => (scrollerRef = el)}>
				<div style={{ height: "50vh" }}>
					<h1 style={{ marginBottom: "2rem" }}>Button Page</h1>
					<Button>Primary</Button>
				</div>
				<div
					style={{ height: "30vh" }}
					ref={el => {
						propertiesRef = el;
					}}
				>
					<h2 id="properties">Properties</h2>
				</div>
				<div
					style={{ height: "100vh" }}
					ref={el => {
						typesOfButtonsRef = el;
					}}
				>
					<h2 id="type-of-buttons">Type of Buttons</h2>

					<h2 id="text-(link)">Text</h2>
					<TextButtonLink
						route={"/components/button"}
						anchor={"Propiedades"}
					></TextButtonLink>
				</div>
			</PageContainer>
		</Layout>
	);
};
