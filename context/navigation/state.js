export const types = {
	SHOW_BOT_NAV: 'SHOW_BOT_NAV',
	HIDE_BOT_NAV: 'HIDE_BOT_NAV',

	TOGGLE_PROPERTY_TYPE_FILTER: 'TOGGLE_PROPERTY_TYPE_FILTER',
	TOGGLE_CITY_FILTER: 'TOGGLE_CITY_FILTER',
	TOGGLE_BED_BATH_FILTER: 'TOGGLE_BED_BATH_FILTER',
	TOGGLE_PRICE_FILTER: 'TOGGLE_PRICE_FILTER',

	CLOSE_FILTERS: 'CLOSE_FILTERS',
	TOGGLE_MOBILE_FILTERS: 'TOGGLE_MOBILE_FILTERS',
};

export const initialState = {
	bottomNav: true,
	propertyTypeFilter: false,
	cityFilter: false,
	bedBathFilter: false,
	priceFilter: false,
	showMobileFilters: false,
};

export const navigationReducer = (state, action) => {
	console.log('state: ', state);
	console.log('action: ', action);

	return action.type === types.SHOW_BOT_NAV
		? { ...state, bottomNav: true }
		: action.type === types.HIDE_BOT_NAV
		? { ...state, bottomNav: false }
		: action.type === types.TOGGLE_PRICE_FILTER
		? {
				...state,
				propertyTypeFilter: false,
				cityFilter: false,
				bedBathFilter: false,
				priceFilter: !state.priceFilter,
		  }
		: action.type === types.TOGGLE_BED_BATH_FILTER
		? {
				...state,
				propertyTypeFilter: false,
				cityFilter: false,
				priceFilter: false,
				bedBathFilter: !state.bedBathFilter,
		  }
		: action.type === types.TOGGLE_CITY_FILTER
		? {
				...state,
				propertyTypeFilter: false,
				bedBathFilter: false,
				priceFilter: false,
				cityFilter: !state.cityFilter,
		  }
		: action.type === types.TOGGLE_PROPERTY_TYPE_FILTER
		? {
				...state,
				propertyTypeFilter: !state.propertyTypeFilter,
				bedBathFilter: false,
				priceFilter: false,
				cityFilter: false,
		  }
		: action.type === types.CLOSE_FILTERS
		? { ...state, propertyTypeFilter: false, cityFilter: false, bedBathFilter: false, priceFilter: false }
		: action.type === types.TOGGLE_MOBILE_FILTERS
		? { ...state, showMobileFilters: !state.showMobileFilters }
		: state;
};
