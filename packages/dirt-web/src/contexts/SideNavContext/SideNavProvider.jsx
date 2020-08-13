import { createContext, useContext, useState } from "react";

export const SideNavContext = createContext();

export const useSideNav = () => useContext(SideNavContext);

const SideNavProvider = ({ children }) => {
	const [activeSection, setActiveSection] = useState("");

	return (
		<SideNavContext.Provider value={{ activeSection, setActiveSection }}>
			{children}
		</SideNavContext.Provider>
	);
};

export default SideNavProvider;
