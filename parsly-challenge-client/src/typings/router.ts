import { NavigateOptions } from '@reach/router';

export type AuthLocationStateType = {
  fromSignup: boolean;
};

export type LocationStateType = {
  auth?: AuthLocationStateType;
};

export interface NavigateType {
  (to: string, options?: NavigateOptions<LocationStateType>): Promise<void>;
}
