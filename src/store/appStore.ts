import Echo from 'laravel-echo';
import { makeAutoObservable } from 'mobx';

class App {
    currentRouteName: string = '';
    client: Record<string, any> = {};
    viewportHeight: number = Device.HEIGHT;
    echo: object = {}; //socoket
    constructor() {
        makeAutoObservable(this);
    }
    //监听对象（即时能力）
    setEcho(echo: Echo) {
        this.echo = echo;
    }
}
export default new App();
