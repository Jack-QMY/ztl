import Clipboard from '@react-native-community/clipboard';
import * as WeChat from 'react-native-wechat-lib';

interface Props {}

// 微信分享
const shareToWeChat = () => {
    WeChat.shareWebpage({
        title: '测试分享',
        webpageUrl: 'https://blog.csdn.net/qq_44041897/article/details/108983648?spm=1001.2014.3001.5501',
        thumbImageUrl: 'https://google.com/1.jpg',
        scene: 0,
    });
};

// 朋友圈分享
const shareToTimeline = () => {
    WeChat.shareWebpage({
        title: '测试分享',
        webpageUrl: 'https://blog.csdn.net/qq_44041897/article/details/108983648?spm=1001.2014.3001.5501',
        thumbImageUrl: 'https://google.com/1.jpg',
        scene: 1,
    });
};

//复制链接
const shareToLink = () => {
    Clipboard.setString('https://blog.csdn.net/qq_44041897/article/details/108983648?spm=1001.2014.3001.5501');
    Toast.show({ content: '复制链接成功' });
};

export const ShareUtil = {
    shareToWeChat,
    shareToTimeline,
    shareToLink,
};
