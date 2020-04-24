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

export const Iconrank: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M288 896 160 896c-17.664 0-32-14.304-32-32L128 320c0-17.664 14.336-32 32-32l128 0c17.664 0 32 14.336 32 32l0 544C320 881.696 305.664 896 288 896zM192 832l64 0L256 352 192 352 192 832z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M576 896l-128 0c-17.664 0-32-14.304-32-32L416 512c0-17.664 14.336-32 32-32l128 0c17.696 0 32 14.336 32 32l0 352C608 881.696 593.696 896 576 896zM480 832l64 0 0-288-64 0L480 832z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M864 896l-128 0c-17.696 0-32-14.304-32-32L704 160c0-17.664 14.304-32 32-32l128 0c17.696 0 32 14.336 32 32l0 704C896 881.696 881.696 896 864 896zM768 832l64 0L832 192l-64 0L768 832z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </svg>
  );
};

Iconrank.defaultProps = {
  size: 18,
};

export default Iconrank;
