/* tslint:disable */
/* eslint-disable */

import { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg/lib/commonjs';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

export const Icongood: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M130.004 350.099h96.725c17.6 0 32 14.4 32 32v541.595c0 17.6-14.4 32-32 32h-96.725c-17.6 0-32-14.4-32-32V382.099c0-17.6 14.4-32 32-32zM895.489 352.976H698.072c-22.814 0-39.177-21.992-32.622-43.844l22.239-74.131c0.513-1.709 0.903-3.46 1.136-5.229 18.281-138.558-94.7-184.272-120.91-158.065-20.091 20.092-37.203 42.409-40.181 60.274-9.541 57.246-41.748 132.546-77.139 202.36-5.799 11.439-17.546 18.635-30.371 18.635h-59.338c-18.732 0-34.058 15.326-34.058 34.058v534.602c0 18.732 15.326 34.058 34.058 34.058h534.603c18.732 0 34.058-15.326 34.058-34.058V387.034c0-18.732-15.326-34.058-34.058-34.058z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icongood.defaultProps = {
  size: 18,
};

export default Icongood;
