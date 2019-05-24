# react-native-super-lottery

## Show Case



## Install

```bash
$ npm i react-native-super-lottery --save
```

## Usage

转盘只支持九宫格。

```jsx
// 引入相关的类库
import { Lottery, LotteryItem } from 'react-native-super-lottery';
// 调用Lottery组件
<Lottery
    ref={this.lotteryRef}
    data={lotteryData}
    renderItem={this.renderItem}
    defaultLucky={5}
/>
// 开始转盘抽奖
this.lotteryRef.current.start();
this.lotteryRef.current.stop(5, () => {});
```

## Properties

| Prop  | Default  | Type | Description |
| :------------ | :---------------:| :---------------:| :-----|
| data | [] | `array` | 转盘奖品列表，奖品按照数据顺序依次在九宫格中展示，第五个奖品应该为抽奖按钮，具体可以参考Demo数据结构 |
| defaultLucky | 无 | `number` | 默认的中奖奖品，防止出现异常或者网络请求失败，默认停留的奖品位置，比如谢谢参与 |
| renderItem | (item, index, highLightIndex) => JSX.Element | `function` | 详细参考下面 |

### renderItem 函数

根据item、index等返回转盘中的奖品展示

| Prop  | Default  | Type | Description |
| :------------ | :---------------:| :---------------:| :-----|
| item | 无 | `bool` | 当前需要渲染的奖品 |
| index | 无 | `number` | 当前奖品的Index |
| highLightIndex | 无 | `number` | 当前应该高亮的奖品index |

## Method

### start() : 转动转盘开始抽奖

### stop(index, stopCallback) ： 完成抽奖，停止转盘转动

| Prop  | Default  | Type | Description |
| :------------ | :---------------:| :---------------:| :-----|
| index | 无 | `number` | 中奖奖品在奖品数据中的index |
| stopCallback | (index) => void | `number` | 转盘停止之后的回调函数 |

## LotteryItem 组件

为了更方便的实现 renderItem 函数， 组件框提供了一个简版的LotteryItem，具体参数如下：

| Prop  | Default  | Type | Description |
| :------------ | :---------------:| :---------------:| :-----|
| url | 无 | `string` | 奖品图片的url |
| index | 无 | `number` | 当前奖品的Index |
| width | 无 | `number` | 奖品图片的宽度 |
| height | 无 | `number` | 奖品图片的高度 |
| type | 'normal' | 'highLight' | 'lotteryBtn' | `string` | 转盘Item的类型， highLight 当前转盘旋转到的Item、lotteryBtn 转盘开始抽奖按钮、 normal 正常按钮 |
| lotteryPress | 无 | `function` | 抽奖按钮点击回调 |

## Example

本工程的 Demo 基于expo开发，请安装expo查看效果

```bash
$ cd example
$ npm install -g expo-cli #安装 expo cli 命令行工具
$ yarn add
$ npm start
```

如果没有安装expo也可以通过[在线Demo](https://snack.expo.io/@wangcheng714/react-native-lottery)查看效果