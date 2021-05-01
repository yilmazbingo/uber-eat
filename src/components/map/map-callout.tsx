import React, { ReactElement } from "react";
import { CompactRestaurantInfo } from "../restaurant-info/compact-restaurant-info";

type MapCalloutProps = {
  restaurant: any;
};
export const MapCallout = ({ restaurant }: MapCalloutProps): ReactElement => {
  return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};
