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

export const Iconday: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M341.333333 256h85.333334v85.333333H341.333333V256z m256 0h85.333334v85.333333h-85.333334V256z m128 0h85.333334v85.333333h-85.333334V256zM213.333333 384h85.333334v85.333333H213.333333V384z m128 0h85.333334v85.333333H341.333333V384z m256 0h85.333334v85.333333h-85.333334V384z m128 0h85.333334v85.333333h-85.333334V384z m-256-128h85.333334v85.333333h-85.333334V256z m0 128h85.333334v85.333333h-85.333334V384z m-256 128h85.333334v85.333333H213.333333v-85.333333z m128 0h85.333334v85.333333H341.333333v-85.333333z m256 0h85.333334v85.333333h-85.333334v-85.333333z m128 0h85.333334v85.333333h-85.333334v-85.333333z m-256 0h85.333334v85.333333h-85.333334v-85.333333z m-256 128h85.333334v85.333333H213.333333v-85.333333z m128 0h85.333334v85.333333H341.333333v-85.333333z m128 0h85.333334v85.333333h-85.333334v-85.333333z"
        fill={getIconColor(color, 0, '#525A65')}
      />
    </Svg>
  );
};

Iconday.defaultProps = {
  size: 18,
};

export default Iconday;
