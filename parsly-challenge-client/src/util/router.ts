import { LocationStateType, NavigateType } from '../typings/router';
import { navigate } from 'gatsby';
import { NavigateOptions, useLocation as useRouterLocation, WindowLocation } from '@reach/router';

export const goto: NavigateType = async (
  to: string,
  options?: NavigateOptions<LocationStateType>,
) => {
  await navigate(to, options);
};

export const useLocation = () => {
  return useRouterLocation() as WindowLocation<LocationStateType>;
}
