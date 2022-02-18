import { makeAutoObservable } from 'mobx';
import { RecordKeys, Storage } from './storage';

interface cartInfo {
    shopName: string;
    shopItems: Array<{
        itemName: string;
        itemId: number;
        itemimg: string;
        itemPrice: number;
        minQuantity: number;
        maxQuantity: number;
        itemDes: string;
    }>;
}

class CartStore {
    cart = {} as cartInfo;
    isSelect: boolean = false; // 是否被选中
    count: number = 1; // 添加数量

    constructor() {
        makeAutoObservable(this);
    }

    // 储存购物车数据
    addStorageCart(cartRes: cartInfo) {
        this.cart = cartRes;
        Storage.setItem(RecordKeys.cart, cartRes);
    }

    //添加
    addCartNum() {
        ++this.count; //增加和选中状态同步
        this.isSelect = true;
    }

    //减少
    decCartNum() {
        if (this.count > 1) {
            --this.count;
            this.isSelect = true;
        } else {
            this.isSelect = false;
            this.count = 1;
        }
    }
    //全选

    //结算

    //删除
}
export default new CartStore();
