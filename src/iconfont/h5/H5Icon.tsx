/* tslint:disable */
/* eslint-disable */

import { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import Icongood from './Icongood';
import Iconday from './Iconday';
import Icondaka from './Icondaka';

export type IconNames = 'good' | 'day' | 'daka';

interface Props extends DOMAttributes<SVGElement> {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

export const H5Icon: FunctionComponent<Props> = ({ name, ...rest }) => {
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

export default H5Icon;
