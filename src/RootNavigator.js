import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  SignalScreen  from './SignalScreen';
import  SettingScreen  from './SettingScreen';
import Signal from './Signal';

const Stack = createStackNavigator();

export class RootNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <NavigationContainer>
            <Stack.Navigator initialRouteName="SignalScreen">
                <Stack.Screen 
                    name="SignalScreen"
                    component={SignalScreen}
                    options={{ title: 'Traffic Signal' }}
                />
                <Stack.Screen
                    name="SettingScreen"
                    component={SettingScreen}
                    options={{ title: 'Setting Screen' }}
                />
            </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

