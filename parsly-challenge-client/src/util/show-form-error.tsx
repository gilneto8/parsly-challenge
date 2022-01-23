import { DeepMap, FieldError, FieldErrors } from 'react-hook-form';
import get from 'lodash/get';
import React from 'react';

function showFormError<T = any>(errors: FieldErrors<T>, key: string) {
  const _key = key as keyof DeepMap<unknown, FieldError>;
  if (get(errors, _key)) {
    return (
      <small className={'danger'}>
        {(get(errors, _key) as FieldError).message}
      </small>
    );
  }
  return null;
}

export default showFormError;
