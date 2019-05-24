import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const LotteryStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});

// 定义转盘转动的最少次数
const CYCLE_TIMES = 30;
// 定义转盘旋转的顺序， value 值为奖品在列表中的index
const LOTTERY_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];

interface Props<T> {
  data: T[],
  defaultLucky: number;
  renderItem(item: T, index: number, highLightIndex: number): JSX.Element;
}

interface State {
  highLightIndex: number;
}

class Lottery extends Component<Props<object>, State> {

  // 是否正在抽奖中
  private isLottering = false;
  // 表示当前旋转的总次数
  private currentIndex = 0;
  // 表示中间奖品在中间列表中的index，
  private luckyOrder = -1;
  // 转盘的旋转速度，实际是转盘旋转间隔时间setTimeout的值
  private speed = 200;
  
  private lotteryTimer: number|undefined;

  readonly state = {
    highLightIndex: -1
  };

  constructor(props: Props<object>) {
    super(props);
  }

  // luckyIndex: 中奖键盘在列表中的index
  private stopCallback(luckyIndex: number) {
  }

  // 根据 currentIndex 获取当前应该高亮列表中的第几个奖品
  private getHighLightItemIndex(currentIndex: number): number {
    return LOTTERY_ORDER[currentIndex % LOTTERY_ORDER.length];
  }

  // 根据奖品在数据中的index，获取奖品在转盘中的位置
  private getLuckyItemOrder(index: number): number {
    return LOTTERY_ORDER.findIndex((value) => {
      return value === index;
    });
  }

  /**
   * 转盘抽奖动画：
   * 1. 前 CYCLE_TIMES = 30 次， 每次速度递加 10ms，
   * 2. 之后 10 次 每次速递递减 20ms
   * 3. 中奖前一次速度减 80ms
   */
  private startLottery = () => {
    this.setState({
      highLightIndex: this.getHighLightItemIndex(this.currentIndex)
    }, () => {
        const currentOrder = this.currentIndex % 8;
        this.currentIndex += 1;
        if (this.currentIndex > CYCLE_TIMES + 8 && this.luckyOrder === currentOrder) {
        clearTimeout(this.lotteryTimer);
        setTimeout(() => {
            this.stopCallback(LOTTERY_ORDER[this.luckyOrder]);
            setTimeout(() => {
                this.reset();
                this.setState({
                    highLightIndex: -1
                });
            }, 1000);
        }, 500)
        } else {
        if (this.currentIndex < CYCLE_TIMES) {
            this.speed -= 10;
        } else if (this.currentIndex > CYCLE_TIMES + 8 && this.luckyOrder === currentOrder + 1) {
            this.speed += 80;
        } else {
            this.speed += 20;
        }
        // 确保速度不能低于 50 ms
        if (this.speed < 50) {
            this.speed = 50;
        }
        this.lotteryTimer = setTimeout(this.startLottery, this.speed);
        }
    });
  }

  start = () => {
    if (!this.isLottering) {
      this.isLottering = true;
      this.startLottery();
    }
  }

  stop = (index: number, stopCallback: (index: number) => void) => {
    this.luckyOrder = this.getLuckyItemOrder(index);
    this.stopCallback = stopCallback;
  }

  private reset = () => {
    this.isLottering = false;
    this.currentIndex = 0;
    this.speed = 100;
    this.luckyOrder = -1;
  }

  render() {
    const { highLightIndex } = this.state;
    const { data, renderItem } = this.props;
    return (
      <View style={LotteryStyle.container}>
        {
          data.map((item, index) => {
            return renderItem(item, index, highLightIndex);
          })
        }
      </View>  
    );
  }
}

export default Lottery;
