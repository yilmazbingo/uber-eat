import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "@services/checkout/checkout.service";

export const CreditCardInput = ({ name }) => {
  const onChange = async (formData) => {
    console.log(formData);
    const { values, status } = formData;
    // Object.values() returns an array
    const isIncomplete = Object.values(status).includes("incomplete");
    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    console.log("stripe values", values);
    const info = await cardTokenRequest(card);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
