"use client";
import { FilterAction, FilterType } from "@/types/search.type";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

const filterReducer = (state: FilterType, action: FilterAction): FilterType => {
  switch (action.type) {
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_AUDIENCE":
      return { ...state, audience: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "CLEAR_END_DATE":
      return { ...state, endDate: null };
    case "SET_LOCALE":
      return { ...state, locale: action.payload };
    case "CLEAR_FILTER":
      return { ...state, [action.payload]: initialFilters[action.payload] };
    case "RESET_FILTERS":
      return initialFilters;
    default:
      return state;
  }
};

// initialisation
const initialFilters: FilterType = {
  sort: "",
  price: "",
  audience: "",
  locale: "",
  startDate: null,
  endDate: null,
};

const FilterContext = createContext<{
  filters: FilterType;
  dispatch: Dispatch<FilterAction>;
}>({ filters: initialFilters, dispatch: () => null });

// le provider
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  return (
    <FilterContext.Provider value={{ filters, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
