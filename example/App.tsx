import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import { Lottery, LotteryItem } from 'react-native-super-lottery';

import LotteryData from './data/lotteryData';

interface Item {
  url: string;
  name: string;
  id: number;
}

interface State {
  loading: boolean;
  lotteryData: Item[];
}

const img_width = 100;
const img_height = 80;

export default class App extends React.Component<{}, State> {

  private isLottering = false;
  private lotteryRef = React.createRef<Lottery>();

  readonly state: State = {
    loading: true,
    lotteryData: [],
  }

  componentDidMount() {
    // request Lottery Data
    setTimeout(() => {
      this.setState({
        loading: false,
        lotteryData: LotteryData,
      });
    }, 2000);
  }

  //  开始抽奖
  startLottery = () => {
    if (!this.isLottering) {
      this.lotteryRef.current!.start();
      // 模拟请求后端中奖信息 5s中后返回中奖结果
      setTimeout(() => {
          this.stopLottery(6);
      }, 5000);
    } else {
      Alert.alert("正在抽奖中，请稍后再试");
    }
  }

  // 结束转盘， index 中奖奖品在奖品列表中的位置
  stopLottery = (index: number) => {
    const { lotteryData } = this.state;
    this.lotteryRef.current!.stop(index, (index: number) => {
      Alert.alert(`抽奖完毕，中奖奖品是 ${lotteryData[index].name}`);
    });
  }

  renderItem = (item: Item, index: number, highLightIndex: number) => {
    const { url } = item;
    if (index === 4) {
      return <LotteryItem url={url} type="lotteryBtn" index={index} width={img_width} height={img_height} lotteryPress={this.startLottery}/>;
    } else if (index === highLightIndex) {
      return <LotteryItem url={url} type="highLight" index={index} width={img_width} height={img_height}/>;
    } else {
      return <LotteryItem url={url} type="normal" index={index} width={img_width} height={img_height}/>;
    }
  }

  render() {
    const { loading, lotteryData } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          This is a piont wheel example.
        </Text>
        <ImageBackground style={styles.imageBg} source={require('./assets/lottery-bg.png')}>
          {
            loading
              ? <ActivityIndicator />
              : (
                <Lottery
                  ref={this.lotteryRef}
                  data={lotteryData}
                  renderItem={this.renderItem}
                  defaultLucky={5}
                />
              )
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageBg: {
    height: 293,
    justifyContent: 'center',
    alignItems: 'center',
    width: 345,
  },
});
