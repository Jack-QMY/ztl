import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SvgIcon, SvgPath } from '~/components';

var { width, height } = Dimensions.get('window');
var widthSize;
var heightSize;
var totalScore;
var currentScore;
// var callBack;
var selected;

export default class RattingView extends Component {
    constructor(props) {
        super(props);
        var containerStyle = this.props.style;
        var config = this.props.config;
        // callBack = this.props?.callback;

        if (config != undefined) {
            widthSize = config.widthSize;
            heightSize = config.heightSize;
            totalScore = config.totalScore;
            currentScore = config.currentScore;
            selected = config.selected;
        }
        var selectedStyle = { width: widthSize, height: heightSize, position: 'absolute' };
        var unselectedStyle = { width: widthSize, height: heightSize };
        this.state = {
            totalScore: totalScore,
            currentScore: currentScore,
            containerStyle: containerStyle != undefined ? containerStyle : styles.container,
            selectedStyle: selectedStyle,
            unselectedStyle: unselectedStyle,
        };
    }

    render() {
        var containerStyle = this.state.containerStyle;
        var selectedStyle = this.state.selectedStyle;
        var unselectedStyle = this.state.unselectedStyle;
        // this._getScore(callBack, this.state.currentScore);

        return <View style={containerStyle}>{this._addScoreIcon(selectedStyle, unselectedStyle)}</View>;
    }

    _addScoreIcon(selectedStyle, unselectedStyle) {
        let images = [];
        for (var i = 1; i <= this.state.totalScore; i++) {
            let currentCount = i;
            images.push(
                <View key={'i' + i}>
                    <TouchableWithoutFeedback
                        onPress={(i) => {
                            this._updateScore(currentCount);
                        }}>
                        <View>
                            <SvgIcon name={SvgPath.selecteIcon} color="#FF0104" size={20} />
                            {/*
                            打开可选择
                            {this._addSelectIcon(i, selectedStyle)} */}
                        </View>
                    </TouchableWithoutFeedback>
                </View>,
            );
        }
        return images;
    }

    _addSelectIcon(count, selectedStyle) {
        if (count <= this.state.currentScore) {
            return <SvgIcon name={SvgPath.unselectIcon} size={23} />;
        }
    }

    _updateScore(i) {
        if (selected) {
            this.setState({
                currentScore: i,
            });
        }
    }
    // _getScore(callback, currentScore) {
    //     return callback(currentScore);
    // }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
