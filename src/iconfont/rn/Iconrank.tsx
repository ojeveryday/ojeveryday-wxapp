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

export const Iconrank: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M288 896 160 896c-17.664 0-32-14.304-32-32L128 320c0-17.664 14.336-32 32-32l128 0c17.664 0 32 14.336 32 32l0 544C320 881.696 305.664 896 288 896zM192 832l64 0L256 352 192 352 192 832z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M576 896l-128 0c-17.664 0-32-14.304-32-32L416 512c0-17.664 14.336-32 32-32l128 0c17.696 0 32 14.336 32 32l0 352C608 881.696 593.696 896 576 896zM480 832l64 0 0-288-64 0L480 832z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M864 896l-128 0c-17.696 0-32-14.304-32-32L704 160c0-17.664 14.304-32 32-32l128 0c17.696 0 32 14.336 32 32l0 704C896 881.696 881.696 896 864 896zM768 832l64 0L832 192l-64 0L768 832z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

Iconrank.defaultProps = {
  size: 18,
};

export default Iconrank;
