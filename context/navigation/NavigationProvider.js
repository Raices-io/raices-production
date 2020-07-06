import { createContext, useReducer, useContext } from 'react';
import { types, navigationReducer, initialState } from './state';

export const NavigationStateContext = createContext();
export const NavigationSetContext = createContext();

export const useStateNavigation = () => useContext(NavigationStateContext);
export const useSetNavigation = () => useContext(NavigationSetContext);

const NavigationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(navigationReducer, initialState);

	const showBotNav = () => !state.bottomNav && dispatch({ type: types.SHOW_BOT_NAV });
	const hideBotNav = () => state.bottomNav && dispatch({ type: types.HIDE_BOT_NAV });

	const togglePropertyTypeFilter = () => dispatch({ type: types.TOGGLE_PROPERTY_TYPE_FILTER });
	const toggleCityFilter = () => dispatch({ type: types.TOGGLE_CITY_FILTER });
	const toggleBedBathFilter = () => dispatch({ type: types.TOGGLE_BED_BATH_FILTER });
	const togglePriceFilter = () => {
		console.log('PRICE FILTER FIRED');
		return dispatch({ type: types.TOGGLE_PRICE_FILTER });
	};

	const closeFilters = () => dispatch({ type: types.CLOSE_FILTERS });
	const toggleMobileFilters = () => dispatch({ type: types.TOGGLE_MOBILE_FILTERS });

	return (
		<NavigationStateContext.Provider value={{ ...state }}>
			<NavigationSetContext.Provider
				value={{
					showBotNav,
					hideBotNav,
					togglePropertyTypeFilter,
					toggleCityFilter,
					toggleBedBathFilter,
					togglePriceFilter,
					toggleMobileFilters,
					closeFilters,
				}}>
				{children}
			</NavigationSetContext.Provider>
		</NavigationStateContext.Provider>
	);
};

export default NavigationProvider;
