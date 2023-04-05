import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input-plus";
import { cardTokenRequest } from "@services/checkout/checkout.service";
import { ICard } from "../types/interfaces";

interface IFormData {
  status: { cvc: string; expiry: string; number: string };
  valid: boolean;
  values: { cvc: string; expiry: string; number: string; type: string };
}

type CreditCardInputProps = {
  name: string;
  onSuccess: (info: ICard) => void;
  onError: () => void;
};
export const CreditCardInput = ({
  name,
  onSuccess,
  onError,
}: CreditCardInputProps) => {
  const onChange = async (formData: IFormData) => {
    console.log("formData", formData);
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
    // console.log("stripe values", values);
    const info = await cardTokenRequest(card);
    console.log("infooo", info);
    if (!isIncomplete) {
      try {
        onSuccess(info);
      } catch (error) {
        onError();
      }
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
