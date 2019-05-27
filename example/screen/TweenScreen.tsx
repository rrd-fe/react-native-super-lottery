import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import TWEEN from '@tweenjs/tween.js';

const TweenStyle = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        marginLeft: 20,
        borderRadius: 60,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


interface TweenScreenProps {
    navigation: NavigationScreenProp<any,any>
}

interface State {
    marginTop: number;
    stage: string;
}

class TweenScreen extends React.Component<TweenScreenProps, State> {
    readonly state = {
        marginTop: 20,
        stage: '加速'
    };

    private currentSpeed = 100;
    private uniformTimes = 0;
    private speedUpTween;
    private speedDownTween;

    constructor(props) {
        super(props);   
    }

    animate() {
        TWEEN.update();
    }

    speedUniformAnimate(): void {
        setTimeout(() => {
            if (this.uniformTimes < 20) {
                this.setState(
                    (preState) => {
                        return {
                            marginTop: preState.marginTop + 5,
                            stage: '匀速'
                        };
                    },
                    () => {
                        this.uniformTimes += 1;
                        this.speedUniformAnimate();
                    }
                )
            } else {
                this.speedDownTween.start();
                this.animate();
            }
        }, this.currentSpeed);
    }

    componentDidMount() {
        this.speedUpTween = new TWEEN.Tween({ interval: this.currentSpeed })
            .to({ interval: 40 }, 3000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate((object) => {
                setTimeout(() => {
                    this.setState(
                        (preState) => {
                            return {
                                marginTop: preState.marginTop + 5,
                                stage: '加速'
                            };
                        },
                        () => {
                            this.animate();
                        }
                    )
                }, object.interval);
                this.currentSpeed = object.interval;
            })
            .onComplete(() => {
                this.speedUniformAnimate();
            })
            .start();

        this.speedDownTween = new TWEEN.Tween({ interval: this.currentSpeed })
            .to({ interval: 500 }, 3000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate((object) => {
                setTimeout(() => {
                    this.setState(
                        (preState) => {
                            return {
                                marginTop: preState.marginTop + 5,
                                stage: '减速'
                            };
                        },
                        () => {
                            this.animate();
                        }
                    )
                }, object.interval);
            });

        this.animate();
    }

    

    render() {
        const { marginTop, stage } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[TweenStyle.circle, { marginTop }]}>
                    <Text>
                        {stage}
                    </Text>
                </View>
            </View>
        )
    }
}

export default TweenScreen;
