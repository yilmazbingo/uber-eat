type Coordinate = {
  lat: number;
  lng: number;
};

export interface IRestaurant {
  business_status: string;
  geometry: {
    location: Coordinate;
    viewport: { northeast: Coordinate; southwest: Coordinate };
  };
  icon: string;
  name: string;
  opening_hours: { open_now: boolean };
  photos: string[];
  placeId: string;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
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
