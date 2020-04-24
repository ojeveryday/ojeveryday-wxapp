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

export const IconiconLcRanking: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M563.2 870.4a51.2 51.2 0 0 1-102.4 0V153.6a51.2 51.2 0 0 1 102.4 0v716.8zM563.2 0H460.8a102.4 102.4 0 0 0-102.4 102.4v819.2A102.4 102.4 0 0 0 460.8 1024h102.4a102.4 102.4 0 0 0 102.4-102.4V102.4A102.4 102.4 0 0 0 563.2 0zM204.8 870.4a51.2 51.2 0 0 1-102.4 0v-512a51.2 51.2 0 0 1 102.4 0v512z m0-665.6H102.4A102.4 102.4 0 0 0 0 307.2v614.4A102.4 102.4 0 0 0 102.4 1024h102.4a102.4 102.4 0 0 0 102.4-102.4V307.2a102.4 102.4 0 0 0-102.4-102.4z m716.8 665.6a51.2 51.2 0 0 1-102.4 0V665.6a51.2 51.2 0 0 1 102.4 0v204.8z m0-358.4h-102.4a102.4 102.4 0 0 0-102.4 102.4v307.2a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V614.4A102.4 102.4 0 0 0 921.6 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconiconLcRanking.defaultProps = {
  size: 18,
};

export default IconiconLcRanking;
