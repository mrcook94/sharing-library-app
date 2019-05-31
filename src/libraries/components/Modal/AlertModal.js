import React, { PureComponent } from 'react'
import { Text, View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'

import R from 'res/R'

export default class AlertModal extends PureComponent {
    render() {
        const { isModalVisible, onCloseModal, modalTitle, modalContents, confirmText, abortText, onPressActionOk, onPressActionAbort } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={onCloseModal}>
                <TouchableWithoutFeedback onPress={onCloseModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.titleViewStyle}>
                                <Text style={styles.modalTitleText}>{modalTitle}</Text>
                            </View>
                            <Text style={styles.modalContentText}>{modalContents}</Text>
                            <View style={styles.groupButtonStyle}>
                                {confirmText && (
                                    <BasicTextButton
                                        text={confirmText}
                                        buttonStyle={styles.buttonOkStyle}
                                        textStyle={[styles.defaultButtonTextStyle, styles.textWhiteColor]}
                                        onPress={onPressActionOk}
                                    />
                                )}
                                {abortText && (
                                    <BasicTextButton
                                        text={abortText}
                                        buttonStyle={styles.buttonNoStyle}
                                        textStyle={[styles.defaultButtonTextStyle, styles.textBlackColor]}
                                        onPress={onPressActionAbort ? onPressActionAbort : onCloseModal}
                                    />
                                )}

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center'
    },
    titleViewStyle: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.primaryBorderColor,
    },
    modalTitleText: {
        fontSize: R.size.textSize.title,
        textAlign: 'center',
        fontWeight: '500',
        color: R.colors.primaryColor,
    },
    modalContentText: { marginVertical: 20, fontSize: R.size.textSize.content, marginHorizontal: 40, textAlign: 'center' },
    groupButtonStyle: { width: '100%', flexDirection: 'row', alignItems: 'center' },
    buttonOkStyle: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 8,
        backgroundColor: R.colors.primaryColor,
        borderBottomLeftRadius: 8,
    },

    buttonNoStyle: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 8,
        backgroundColor: R.colors.unhightlightButtonColor,
        borderBottomRightRadius: 8
    },
    defaultButtonTextStyle: { fontWeight: '500', fontSize: R.size.textSize.content, },
    textWhiteColor: { color: R.colors.primaryWhiteColor },
    textBlackColor: { color: R.colors.primaryBlackColor }
})