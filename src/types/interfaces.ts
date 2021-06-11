type Coordinate = {
  lat: number;
  lng: number;
};

export interface IRestaurant {
  address: string;
  business_status: string;
  geometry: {
    location: Coordinate;
    viewport: { northeast: Coordinate; southwest: Coordinate };
  };
  icon: string;
  name: string;
  // this got camelized
  openingHours: { open_now: boolean };
  photos: string[];
  placeId: string;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  isClosedTemporarily: boolean;
  isOpenNow: boolean;
}

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export interface IPlaceResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    bounds: { northeast: Coordinate; southwest: Coordinate };
    location: Coordinate;
    location_type: string;
    viewport: { northeast: Coordinate; southwest: Coordinate };
  };
  place_id: string;
  types: string[];
}
export interface IPlace {
  results: IPlaceResult[];
  status: string;
}

export interface ICard {
  card: {
    address_city: string | null;
    address_country: string | null;
    address_line1: string | null;
    address_state: string | null;
    address_zip: string | null;
    brand: string;
    country: string;
  };
  client_ip: string;
  created: Date;
  id: string;
  livemode: boolean;
  type: string;
  used: boolean;
}
