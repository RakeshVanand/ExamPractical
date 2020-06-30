import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, StyleSheet, TextInput, Alert } from 'react-native';
import { Directions, TouchableHighlight } from 'react-native-gesture-handler';

class Signal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSignal: 'A',
            timer: 10,
        };
    }

    ambPressed = (signal) => {
        console.log("Value Pressed is: ", signal);

        this.setState({currentSignal : signal});
        this.setState({ timer: 10 })
    }

    openSetting = () => {
        console.log("Setting Open");
    }

    changeTimerCount = () =>  {
        if (this.state.timer - 1 <= 0) {
            this.setState({ timer: 10 });
            this.changeSignal();
        } else {
            this.setState({ timer: this.state.timer - 1 });
        }
    }

    changeSignal = () => {
        if (this.state.currentSignal == "A") {
            this.setState({ currentSignal: 'B' });
        }
        else if (this.state.currentSignal == "B") {
            this.setState({ currentSignal: 'C' });
        }
        else if (this.state.currentSignal == "C") {
            this.setState({ currentSignal: 'D' });
        }
        else if (this.state.currentSignal == "D") {
            this.setState({ currentSignal: 'A' });
        }

        // console.log("State is:", this.state.currentSignal);
    }

    componentDidMount() {
        this.interval = setInterval(() =>{
            this.changeTimerCount();
        }, 1000);
    }


    componentWillUnmount() {
        this.clearInterval(this.interval);   
    }

    render() {
        let { currentSignal, timer } = this.state;

        return (

            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                {/* <TouchableHighlight style={{backgroundColor: 'red', height: 30, widht: 50, justifyContent: 'center', alignItems: 'flex-end'}} onPress={() => this.openSetting()} >
                    <Text>Setting</Text>
                </TouchableHighlight> */}

                <View style={styles.containerView}>

                    <View style={styles.subContainer}>
                        <TouchableHighlight onPress={() => this.ambPressed("A")}>
                            <View style={styles.ambView}>
                                <Text style={styles.txtAMB}> AMB </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={[currentSignal != "A" ? styles.signalView : styles.openSignalView]}>
                            <Text style={styles.txtSignal}> A </Text>
                        </View>
                        <Text>{currentSignal == "A" ? timer : '10'}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.leftContainer}>
                            <TouchableHighlight onPress={() => this.ambPressed("B")}>
                                <View style={styles.ambView}>
                                    <Text style={styles.txtAMB}> AMB </Text>
                                </View>
                            </TouchableHighlight>
                            <View style={[currentSignal != "B" ? styles.signalView : styles.openSignalView]}>
                                <Text style={styles.txtSignal}> B </Text>
                            </View>
                            <Text>{currentSignal == "B" ? timer : '10'}</Text>
                        </View>

                        <View style={styles.rightContainer}>
                            <TouchableHighlight onPress={() => this.ambPressed("D")}>
                                <View style={styles.ambView}>
                                    <Text style={styles.txtAMB}> AMB </Text>
                                </View>
                            </TouchableHighlight>
                            <View style={[currentSignal != "D" ? styles.signalView : styles.openSignalView]}>
                                <Text style={styles.txtSignal}> D </Text>
                            </View>
                            <Text>{currentSignal == "D" ? timer : '10'}</Text>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableHighlight onPress={() => this.ambPressed("C")}>
                            <View style={styles.ambView}>
                                <Text style={styles.txtAMB}> AMB </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={[currentSignal != "C" ? styles.signalView : styles.openSignalView]}>
                            <Text style={styles.txtSignal}> C </Text>
                        </View>
                        <Text>{currentSignal == "C" ? timer : '10'}</Text>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export default Signal;

const styles = StyleSheet.create({
    containerView: {
        height: 350,
        width: 350,
        // backgroundColor: 'red',
        justifyContent: 'space-between'
    },
    subContainer: {
        height: 130,
        width: 50,
        alignSelf: 'center',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signalView: {
        height: 40,
        width: 40,
        margin: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openSignalView: {
        height: 40,
        width: 40,
        margin: 10,
        alignItems: 'center',
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ambView: {
        height: 40,
        width: 40,
        margin: 10,
        alignItems: 'center',
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
    },
    txtAMB: {
        fontSize: 12,
    },
    txtSignal: {
        fontSize: 15,
    },
    bottomContainer: {
        height: 130,
        width: 50,
        alignSelf: 'center',
        // backgroundColor: 'green',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    leftContainer: {
        height: 50,
        width: 150,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'green',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rightContainer: {
        height: 50,
        width: 150,
        alignSelf: 'flex-end',
        // backgroundColor: 'green',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    }

})