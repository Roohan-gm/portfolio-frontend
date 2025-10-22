import { useState } from 'react';
import api from '../../api/client';
import type { ContactFormFields, ContactResponse } from '@/types';



export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: ContactFormFields) => {
    try {
      setSubmitting(true);
      setError(null);
      await api.post<ContactResponse>('/contact', data);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
  };

  return { submitContact, submitting, success, error, resetForm };
};