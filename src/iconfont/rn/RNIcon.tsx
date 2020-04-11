/* tslint:disable */
/* eslint-disable */

import { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg/lib/commonjs';
import Icongood from './Icongood';
import Iconday from './Iconday';
import Icondaka from './Icondaka';

export type IconNames = 'good' | 'day' | 'daka';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

export const RNIcon: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'good':
      return <Icongood {...rest} />;
    case 'day':
      return <Iconday {...rest} />;
    case 'daka':
      return <Icondaka {...rest} />;
  }

  return null;
};

export default RNIcon;
