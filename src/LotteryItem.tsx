import React, { FC } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const ItemStyle = StyleSheet.create({
  container: {
    
  },
  highLightBlock: {
      backgroundColor: 'rgba(0, 0, 0, .5)',
      borderRadius: 10,
  },
});

interface Props {
  url: string;
  index: number;
  lotteryPress?(): void;
  width: number;
  height: number;
  type: 'normal' | 'highLight' | 'lotteryBtn'
}

const LotteryItem: FC<Props> = (props) => {
  const { url, type, lotteryPress, width, height,  index } = props;
    let itemDom = null;
    switch (type) {
      case 'normal':
        itemDom = <Image style={{ width, height }} source={{ uri: url }}/>;  
        break;
      case 'highLight':
        itemDom = (
          <ImageBackground style={{ width, height }} source={{ uri: url }}>
            <View style={[ItemStyle.highLightBlock, { width, height }]} />
          </ImageBackground>
        );
        break;
      case 'lotteryBtn':
        itemDom = (
          <TouchableHighlight onPress={() => { lotteryPress!(); }}>
            <Image style={{ width, height }} source={{ uri: url }}/>
          </TouchableHighlight>
        );
        break;
    }
    return (
      <View style={{ width: width + 2, height: height + 2 }} key={index}>
        {itemDom}
      </View>
    )
}

export default LotteryItem;
