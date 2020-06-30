import React, { Component } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableHighlight, Image, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

class SignalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSignal: 'A',
            timer: 10,
            modalVisible: false,
            currentSelectedRotation: 'clock',
            value: 10,
            ambTime: 10,
        };
    }

    ambPressed = (signal) => {
        console.log("Value Pressed is: ", signal);

        this.setState({ currentSignal: signal });
        this.setState({ timer: this.state.ambTime })
    }

    clearTime = (signal) => {
        this.setState({ currentSignal: signal });
        this.setState({ timer: this.state.value })
    }

    setModalVisible = () => {
        console.log("Setting Open", !this.state.modalVisible)
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    changeTimerCount = () => {
        if (this.state.timer - 1 <= 0) {
            this.setState({ timer: this.state.value }),
                this.changeSignal();
        } else {
            this.setState({ timer: this.state.timer - 1 });
        }
    }

    changeSignal = () => {

        if (this.state.currentSelectedRotation == "clock") {

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

            console.log("State is:", this.state.currentSignal);

        } else if (this.state.currentSelectedRotation == "antiClock") {

            if (this.state.currentSignal == "A") {
                this.setState({ currentSignal: 'D' });
            }
            else if (this.state.currentSignal == "D") {
                this.setState({ currentSignal: 'C' });
            }
            else if (this.state.currentSignal == "C") {
                this.setState({ currentSignal: 'B' });
            }
            else if (this.state.currentSignal == "B") {
                this.setState({ currentSignal: 'A' });
            }

            console.log("State is:", this.state.currentSignal);
        }
        else if (this.state.currentSelectedRotation == "updown") {

            if (this.state.currentSignal == "A") {
                this.setState({ currentSignal: 'C' });
            }
            else if (this.state.currentSignal == "C") {
                this.setState({ currentSignal: 'B' });
            }
            else if (this.state.currentSignal == "B") {
                this.setState({ currentSignal: 'D' });
            }
            else if (this.state.currentSignal == "D") {
                this.setState({ currentSignal: 'A' });
            }

            console.log("State is:", this.state.currentSignal);
        }
    }

    componentDidMount() {

        this.setState({ timer: this.state.value });

        this.interval = setInterval(() => {
            this.changeTimerCount();
        }, 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeSignalRotation = (selectedValue) => {
        this.setState({ currentSelectedRotation: selectedValue });
    }


    btnOKPressed = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
        this.clearTime('A');
    }

    changeTimerforSignal = (findValue) => {

        this.setState({ value: findValue });
        this.clearTime('A');
    }

    changeTimerforAMB = (findValue) => {
       
        this.setState({ ambTime: findValue });
        this.ambPressed('A');
    }

    render() {
        let { currentSignal, timer, currentSelectedRotation } = this.state;

        return (

            <SafeAreaView style={{ flex: 1 }}>

                {/* ====================== This is the Setting Screen Code ===============*/}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: !this.state.modalVisible });
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>

                            <TouchableHighlight
                                style={styles.btnOk}
                                onPress={() => {
                                    this.btnOKPressed();
                                }}>
                                <View>
                                    <Text>OK</Text>
                                </View>
                            </TouchableHighlight>

                            {/* <Text style={{ marginLeft: 5 }}>Select TimeDuration for Signal</Text>
                            <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onValueChange={(value) => this.changeTimerforSignal(value)}
                            />
                            <Text>Value: {this.state.value}</Text> */}

                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Enter time Duration for Signal"
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                                keyboardType="numeric"
                                onChangeText={(value) => this.changeTimerforSignal(value)} />

                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Enter time Duration for AMB "
                                placeholderTextColor="#9a73ef"
                                autoCapitalize="none"
                                keyboardType="numeric"
                                onChangeText={(value) => this.changeTimerforAMB(value)} />

                            <Text style={{ marginLeft: 5, marginTop: 10 }}>Select Rotation for Signal</Text>
                            <TouchableHighlight underlayColor="transpernt" onPress={() => { this.changeSignalRotation('clock'); }}>
                                <View style={{ marginLeft: 5, marginTop: 5, marginRight: 5, flexDirection: 'row' }}>
                                    {currentSelectedRotation != 'clock' ? <Image
                                        style={styles.radioButton}
                                        source={require('./images/circle.png')}
                                    /> : <Image
                                            style={styles.radioButton}
                                            source={require('./images/correct.png')}
                                        />}
                                    <Text>ClockWise</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="transpernt" onPress={() => { this.changeSignalRotation('antiClock'); }}>
                                <View style={{ marginLeft: 5, marginTop: 5, marginRight: 5, flexDirection: 'row' }}>
                                    {currentSelectedRotation != 'antiClock' ? <Image
                                        style={styles.radioButton}
                                        source={require('./images/circle.png')}
                                    /> : <Image
                                            style={styles.radioButton}
                                            source={require('./images/correct.png')}
                                        />}
                                    <Text>Anti ClockWise</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="transpernt" onPress={() => { this.changeSignalRotation('updown'); }}>
                                <View style={{ marginLeft: 5, marginTop: 5, marginRight: 5, flexDirection: 'row' }}>
                                    {currentSelectedRotation != 'updown' ? <Image
                                        style={styles.radioButton}
                                        source={require('./images/circle.png')}
                                    /> : <Image
                                            style={styles.radioButton}
                                            source={require('./images/correct.png')}
                                        />}
                                    <Text>Up to Down And Left to Right</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                {/* ====================== This is the Traffic Signal Screen Code ===============*/}

                <TouchableHighlight style={styles.btnOk}
                    onPress={() => this.setModalVisible()} >
                    <Text>Setting</Text>
                </TouchableHighlight>

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
                        <Text>{currentSignal == "A" ? timer : this.state.value}</Text>
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
                            <Text>{currentSignal == "B" ? timer : this.state.value}</Text>
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
                            <Text>{currentSignal == "D" ? timer : this.state.value}</Text>
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
                        <Text>{currentSignal == "C" ? timer : this.state.value}</Text>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export default SignalScreen;

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
    radioButton: {
        height: 20,
        width: 20,
        marginRight: 10,
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
    input: {
        borderRadius: 5,
        height: 45,
        width: 300,
        borderColor: 'black',
        borderWidth: 3,
        marginLeft: 10,
        marginTop:10,
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
    },
    btnOk: {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: 'black',
        height: 40,
        width: 60,
        alignSelf: 'flex-end',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }

})