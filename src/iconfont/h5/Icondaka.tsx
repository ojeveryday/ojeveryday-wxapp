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

export const Icondaka: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M166.4 102.4a51.2 51.2 0 1 1 0 102.4H153.6a51.2 51.2 0 0 0-51.2 51.2v614.4a51.2 51.2 0 0 0 51.2 51.2h716.8a51.2 51.2 0 0 0 51.2-51.2V256a51.2 51.2 0 0 0-51.2-51.2h-12.8a51.2 51.2 0 1 1 0-102.4h12.8a153.6 153.6 0 0 1 153.6 153.6v614.4a153.6 153.6 0 0 1-153.6 153.6H153.6a153.6 153.6 0 0 1-153.6-153.6V256a153.6 153.6 0 0 1 153.6-153.6z m279.552 652.7488l-2.7392-0.1792a51.5328 51.5328 0 0 1-24.3712-8.8576l-0.6912-0.512a47.0272 47.0272 0 0 1-6.3488-5.376l2.7392 2.56a51.072 51.072 0 0 1-1.8944-1.7408l-0.8448-0.8448-179.2-179.2a51.2 51.2 0 0 1 72.3968-72.3968l146.7904 146.7648 284.2368-227.328a51.2 51.2 0 1 1 63.9488 79.9488l-320 256-1.4848 1.152a51.072 51.072 0 0 1-1.2288 0.896l2.7136-2.048a51.712 51.712 0 0 1-21.248 10.0864l-0.512 0.1024a46.08 46.08 0 0 1-8.0128 0.9728h-4.2752zM307.2 0a51.2 51.2 0 0 1 51.2 51.2v179.2a51.2 51.2 0 1 1-102.4 0V51.2a51.2 51.2 0 0 1 51.2-51.2z m409.6 0a51.2 51.2 0 0 1 51.2 51.2v179.2a51.2 51.2 0 1 1-102.4 0V51.2a51.2 51.2 0 0 1 51.2-51.2z m-153.6 102.4a51.2 51.2 0 1 1 0 102.4h-102.4a51.2 51.2 0 1 1 0-102.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Icondaka.defaultProps = {
  size: 18,
};

export default Icondaka;
