/* tslint:disable */
/* eslint-disable */

import { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends DOMAttributes<SVGElement> {
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

export const IconiconLcShare: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M730.805844 237.242748l-0.146278 0.146278a50.904811 50.904811 0 0 1-72.115148 2.559868l-52.294454-49.003194a25.598683 25.598683 0 0 0-43.078927 18.650469v318.081928a51.197367 51.197367 0 1 1-102.394734 0V210.400699a25.598683 25.598683 0 0 0-43.225206-18.504191l-49.880863 47.540412a50.758532 50.758532 0 1 1-69.994114-73.797347L443.442337 27.991795a102.394734 102.394734 0 0 1 141.012177 0.365695l144.084018 137.5015a50.831672 50.831672 0 0 1 2.194173 71.383758zM1023.94734 859.80273C1023.94734 909.903011 989.13313 950.860904 915.847756 950.860904H91.058174A91.058174 91.058174 0 0 1 0 859.80273V529.872269C0 482.258718 36.203852 438.887234 96.689885 438.887234h57.267911c28.085413 0 50.831672 22.67312 50.831672 50.831672v0.731391a50.904811 50.904811 0 0 1-50.831672 50.831671h-0.731391a50.831672 50.831672 0 0 0-50.831671 50.831672v205.520859c0 28.085413 22.819398 50.831672 50.831671 50.831671h717.494529a50.904811 50.904811 0 0 0 50.831672-50.90481V592.11364a50.831672 50.831672 0 0 0-50.831672-50.831672h-0.731391a50.904811 50.904811 0 0 1-50.831671-50.90481v-0.658252c0-28.085413 22.819398-50.831672 50.831671-50.831672h62.899623C983.208864 438.887234 1023.94734 479.625711 1023.94734 529.872269v329.930461z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconiconLcShare.defaultProps = {
  size: 18,
};

export default IconiconLcShare;
