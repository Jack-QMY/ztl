import React, { Component } from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import { SvgIcon, SvgPath } from '~/components';

interface Props {
    size?: number;
    style?: typeof ViewPropTypes;
}

class PlaceholderImage extends Component<Props> {
    static defaultProps = {
        style: {},
        resizeMode: 'cover',
        videoMarkSize: pixel(50),
    };

    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    render() {
        let { style, source, resizeMode, videoMark, videoMarkSize } = this.props;
        if (this.state.error || !source || !source.uri || !source.uri.includes('http')) {
            return <View style={[styles.container, style]} />;
        }
        return (
            <View style={[styles.container, style]}>
                <Image
                    source={source}
                    resizeMode={resizeMode}
                    style={styles.content}
                    onLoad={this._onLoad}
                    onError={this._onError}
                    onLayout={this._onLayout}
                />
                {videoMark && (
                    <View style={styles.videoMark}>
                        <SvgIcon name={SvgPath.play} size={videoMarkSize} color={'#fff'} />
                    </View>
                )}
            </View>
        );
    }

    _onLoad = () => {
        const { onLoad } = this.props;
        onLoad && onLoad();
    };

    _onError = () => {
        this.setState({
            error: true,
        });
        const { onError } = this.props;
        onError && onError();
    };

    _onLayout = () => {
        const { onLayout } = this.props;
        onLayout && onLayout();
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.groundColour,
        overflow: 'hidden',
    },
    content: {
        ...StyleSheet.absoluteFill,
    },
    videoMark: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlaceholderImage;
