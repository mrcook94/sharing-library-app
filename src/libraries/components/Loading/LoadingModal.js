import React, { Component } from 'react';
import { Modal } from 'react-native';
import LoadingManager from './LoadingManager';
import LoadingComponent from './LoadingComponent'

const TIME_OUT = 10 * 1000;

export function showLoading() {
    const ref = LoadingManager.getDefault();

    if (!!ref) {
        ref.showLoading();
    }
}

export function hideLoading() {
    const ref = LoadingManager.getDefault();

    if (!!ref) {
        ref.hideLoading();
    }
}

class LoadingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }


    render() {
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                style={{ position: "absolute" }}
                visible={this.state.isVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <LoadingComponent />
            </Modal>
        );
    }

    showLoading = () => {
        this.loadingTimeout = setTimeout(() => {
            this.setState({ isVisible: false })
        }, TIME_OUT);
        this.setState({ isVisible: true })
    }

    hideLoading = () => {
        if (this.loadingTimeout) clearTimeout(this.loadingTimeout)
        this.setState({ isVisible: false })
    }

    componentWillUnmount() {
        if (this.loadingTimeout) clearTimeout(this.loadingTimeout)
    }
}

export default LoadingModal;
