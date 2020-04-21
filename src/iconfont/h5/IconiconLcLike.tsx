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

export const IconiconLcLike: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M0.0256 513.1931v409.522483C0.0256 979.244312 45.804363 1023.999269 102.406221 1023.999269h102.380621V409.715544H102.406221C45.804363 409.715544 0.0256 456.591242 0.0256 513.1931m1020.149757 68.3025l-88.924882 334.492114A139.53016 139.53016 0 0 1 794.791734 1023.999269H307.167462V410.812479l87.974205-317.160537A110.790458 110.790458 0 0 1 546.518728 8.237252c42.414829 16.30777 67.790597 60.477695 67.790597 106.037072v245.347845c0 28.2278 22.962511 50.093375 51.19031 50.093375h218.29011A140.261451 140.261451 0 0 1 1020.175357 581.568729"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconiconLcLike.defaultProps = {
  size: 18,
};

export default IconiconLcLike;
