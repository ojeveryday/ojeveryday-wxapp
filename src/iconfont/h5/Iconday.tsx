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

export const Iconday: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M341.333333 256h85.333334v85.333333H341.333333V256z m256 0h85.333334v85.333333h-85.333334V256z m128 0h85.333334v85.333333h-85.333334V256zM213.333333 384h85.333334v85.333333H213.333333V384z m128 0h85.333334v85.333333H341.333333V384z m256 0h85.333334v85.333333h-85.333334V384z m128 0h85.333334v85.333333h-85.333334V384z m-256-128h85.333334v85.333333h-85.333334V256z m0 128h85.333334v85.333333h-85.333334V384z m-256 128h85.333334v85.333333H213.333333v-85.333333z m128 0h85.333334v85.333333H341.333333v-85.333333z m256 0h85.333334v85.333333h-85.333334v-85.333333z m128 0h85.333334v85.333333h-85.333334v-85.333333z m-256 0h85.333334v85.333333h-85.333334v-85.333333z m-256 128h85.333334v85.333333H213.333333v-85.333333z m128 0h85.333334v85.333333H341.333333v-85.333333z m128 0h85.333334v85.333333h-85.333334v-85.333333z"
        fill={getIconColor(color, 0, '#525A65')}
      />
    </svg>
  );
};

Iconday.defaultProps = {
  size: 18,
};

export default Iconday;
