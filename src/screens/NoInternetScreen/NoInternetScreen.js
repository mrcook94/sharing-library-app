import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, NetInfo } from 'react-native';

import R from 'res/R';
const { width, height } = Dimensions.get('window');

class NoInternetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        
            NetInfo.isConnected.addEventListener(
                'connectionChange', 
                this.handleConnectivityChange
            );

        
    }

    handleConnectivityChange = isConnected => {
        console.log(isConnected, "mmm");
        if(this.state.isConnected !== isConnected){
            this.setState({ isConnected });
        }
        
    };

    render() {
        return (!this.state.isConnected ?
            <View style={styles.offlineContainer}>
                <Image
                    source={R.images.default_image.img_no_internet}
                    style={styles.imageStyle}
                    resizeMode='contain'
                />

                <Text style={styles.textStyle}>{'Không có kết nối internet!'}</Text>
            </View>
            :
            <View />)


    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        position: 'absolute',
    },
    offlineText: { color: '#fff' },

    textStyle: {
        fontSize: 16,
        color: 'black',
        marginVertical: 20
    },
    imageStyle: {
        width: width / 2,
        height: height / 3
    }
})

export default NoInternetScreen;
