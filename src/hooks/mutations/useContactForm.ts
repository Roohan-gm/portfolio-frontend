import type { ContactFormFields } from "@/types";
import api from "../../api/client";

export const useContactForm = () => {
  const submitContact = async (data: ContactFormFields) => {
    await api.post("/contact", data); // No try/catch needed here
  };
  return { submitContact };
};
