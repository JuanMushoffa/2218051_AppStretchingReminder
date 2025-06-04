/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

AppRegistry.registerComponent(appName, () => App);
