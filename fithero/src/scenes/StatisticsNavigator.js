/* @flow */

import { createStackNavigator } from 'react-navigation';

import i18n from '../utils/i18n';
import StatisticsScreen from './Statistics';

export default createStackNavigator({
  Statistics: {
    screen: StatisticsScreen,
    navigationOptions: {
      title: i18n.t('menu__statistics'),
    },
  },
});
