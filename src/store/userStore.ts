import { makeAutoObservable } from 'mobx';
import { RecordKeys, Storage } from './storage';

export interface UserScheme {
    userinfo: userInfo;
    is_service: string;
    is_shop: number;
    is_zongjian: string;
    level_name: string;
    statistics: Statistics;
    [key: string]: any;
}

interface Statistics {
    dynamic: any;
    order: any;
}
interface userInfo {
    user_id: number;
    id: number;
    gender: number;
    username: string;
    nickname: string;
    level: number;
    score: number;
    avatar: string;
    mobile: string;
    token: string;
    invite_code: string;
    bio: string;
}
class UserStore {
    me = {} as UserScheme;
    recalledUser: boolean = false;
    login: boolean = false;
    postion: any = {}; //用户定位信息
    constructor() {
        makeAutoObservable(this);
    }

    //定位信息
    repostion(p: any) {
        if (p !== this.postion) {
            this.postion = p;
        }
    }

    signIn(user: UserScheme) {
        TOKEN = user.userinfo.token;
        this.me = user;
        this.login = true;
        this.recalledUser = true;
        Storage.setItem(RecordKeys.me, user);
    }
    recallUser(me?: UserScheme) {
        if (me?.userinfo?.id) {
            TOKEN = me.userinfo.token;
            this.me = me;
            this.login = true;
        }
        this.recalledUser = true;
    }
    //退出登录
    signOut() {
        TOKEN = null;
        this.me = {} as UserScheme;
        this.login = false;
        this.recalledUser = false;
        Storage.removeItem(RecordKeys.me);
    }
    changeProfile(userMetaData: any) {
        if (userMetaData !== null && typeof userMetaData === 'object') {
            this.me = Object.assign(this.me, userMetaData);
        }
        Storage.setItem(RecordKeys.me, this.me);
    }

    //更改图像
    changeAvatar(avatarUrl: string) {
        this.me.userinfo.avatar = avatarUrl;
        Storage.setItem(RecordKeys.me, this.me);
    }
    //更改用户名
    changeName(userName: string) {
        this.me.userinfo.username = userName;
        Storage.setItem(RecordKeys.me, this.me);
    }
    //更改用户昵称
    changeNickName(nickName: string) {
        this.me.userinfo.nickname = nickName;
        Storage.setItem(RecordKeys.me, this.me);
    }
    //更改用户签名
    changeBio(bio: string) {
        this.me.userinfo.bio = bio;
        Storage.setItem(RecordKeys.me, this.me);
    }
}

export default new UserStore();
