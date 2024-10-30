export interface EventRecord {
  results?: Event[];
  total_count?: number;
}

export interface FiltersProps {
  onSearch: (query: string) => void;
  search?: string;
}

export interface Event {
  id: string;
  title: string;
  lat_lon?: [number, number];
  address_street?: string;
  price_type?: string;
  date_end?: string; // DATe ISO 8601
  address_name?: string;
  cover_url?: string;
  audience?: string;
  locale?: string;
  lead_text?: string;
  contact_facebook?: string;
  date_description?: string;
  address_city?: string;
  updated_at?: string; // Date au forma ISO 8601
  title_event?: string;
  access_link?: string;
  date_start?: string; // ISO 8601
  tags?: string;
  cover_alt?: string;
  group?: string;
  title: string;
  occurrences?: string;
  url?: string;
  contact_phone?: string;
  access_link_text?: string;
  price_detail?: string;
  contact_url?: string;
  description?: string;
  access_type?: string;
  cover_credit?: string;
  address_zipcode?: string;
  contact_mail?: string;
}

interface Geometry {
  type?: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

export interface FilterType {
  sort: string;
  price: string;
  audience: string;
  startDate: Date | null;
  endDate: Date | null;
  locale: string;
}

export type FilterAction =
  | { type: "SET_SORT"; payload: string }
  | { type: "SET_PRICE"; payload: string }
  | { type: "SET_AUDIENCE"; payload: string }
  | { type: "SET_START_DATE"; payload: Date | null }
  | { type: "SET_END_DATE"; payload: Date | null }
  | { type: "CLEAR_END_DATE" }
  | { type: "SET_LOCALE"; payload: string }
  | { type: "CLEAR_FILTER"; payload: keyof FilterType }
  | { type: "RESET_FILTERS" };
