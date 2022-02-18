import { makeAutoObservable } from 'mobx';
import { RecordKeys, Storage } from './storage';

class LocalUserStore {
    searchRecord: string[] = []; // 搜索历史
    serachAddress: string[] = []; //搜索地址

    constructor() {
        makeAutoObservable(this);
    }

    async recallLocalStore() {
        this.searchRecord = (await Storage.getItem(RecordKeys.searchRecord)) || [];
    }
    async recallLocalAddress() {
        this.serachAddress = (await Storage.getItem(RecordKeys.serachAddress)) || [];
    }
}

export default new LocalUserStore();
