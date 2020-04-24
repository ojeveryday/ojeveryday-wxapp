/* tslint:disable */
/* eslint-disable */

import { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg/lib/commonjs';
import IconiconLcRanking from './IconiconLcRanking';
import IconiconLcLike from './IconiconLcLike';
import IconiconLcShare from './IconiconLcShare';
import Iconrank from './Iconrank';
import Icongood from './Icongood';
import Iconday from './Iconday';
import Icondaka from './Icondaka';

export type IconNames = 'icon_lc_ranking' | 'icon_lc_like' | 'icon_lc_share' | 'rank' | 'good' | 'day' | 'daka';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

export const RNIcon: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon_lc_ranking':
      return <IconiconLcRanking {...rest} />;
    case 'icon_lc_like':
      return <IconiconLcLike {...rest} />;
    case 'icon_lc_share':
      return <IconiconLcShare {...rest} />;
    case 'rank':
      return <Iconrank {...rest} />;
    case 'good':
      return <Icongood {...rest} />;
    case 'day':
      return <Iconday {...rest} />;
    case 'daka':
      return <Icondaka {...rest} />;
  }

  return null;
};

export default RNIcon;
