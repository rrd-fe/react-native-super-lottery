import * as React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LotteryScreen from './screen/LotteryScreen';
import TweenScreen from './screen/TweenScreen';

const RootStack = createStackNavigator(
    {
        Lottery: LotteryScreen,
        Tween: TweenScreen,
    },
    {
        initialRouteName: 'Lottery'
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
