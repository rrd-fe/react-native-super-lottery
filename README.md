# react-native-super-lottery

## Install

```bash
$ npm i react-native-super-lottery --save
```

## Usage

转盘只支持九宫格。

```jsx
$ npm i react-native-super-lottery --save
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

### LotteryItem 组件

为了更方便的实现 renderItem 函数， 组件框提供了一个简版的LotteryItem，具体参数如下：

| Prop  | Default  | Type | Description |
| :------------ | :---------------:| :---------------:| :-----|
| url | 无 | `string` | 奖品图片的url |
| index | 无 | `number` | 当前奖品的Index |
| width | 无 | `number` | 奖品图片的宽度 |
| height | 无 | `number` | 奖品图片的高度 |
| type | 'normal' | 'highLight' | 'lotteryBtn' | `string` | 转盘Item的类型， highLight 当前转盘旋转到的Item、lotteryBtn 转盘开始抽奖按钮、 normal 正常按钮 |
| lotteryPress | 无 | `function` | 抽奖按钮点击回调 |
