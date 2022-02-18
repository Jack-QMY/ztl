/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Global from './src/utils/global';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
