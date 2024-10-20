export interface EventRecord {
  datasetid?: string;
  recordid?: string;
  fields: Event;
  geometry?: Geometry;
  record_timestamp?: string;
}

export interface Event {
  id: string;
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
