import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Picker } from 'react-native'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import CustomTextinput from './custom_components/CustomTextinput'
import BookImagePicker from './custom_components/BookImagePicker'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import constants from 'libraries/utils/constants'
import { width, platfromOS } from 'screens/RootView'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import Toast from 'react-native-simple-toast'

import R from 'res/R'

export default class AddBookScreen extends Component {
    state = {
        book_name: '',
        author: '',
        description: '',
        listCategory: [],
        category_id: '',
        category_name: '',
        isLoading: true,
    }

    renderPickerItem = () => {
        return this.state.listCategory.map(e => {
            return (
                <Picker.Item label={e.category_name} value={e._id} key={e._id} />
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.add_book}
                    iconBack={true}
                />
                <ScrollView keyboardDismissMode='on-drag'>
                    <CustomTextinput
                        textinputTitle='Tên sách'
                        placeholder={'Nhập tên sách'}
                        onChangeText={this.onChangeText('book_name')}
                        returnKeyType='next'
                        onSubmitEditing={this.onSubmitName}
                        ref={refs => { this.bookNameInput = refs }}
                    />
                    <CustomTextinput
                        textinputTitle='Tên tác giả'
                        placeholder={'Nhập tên tác giả'}
                        onChangeText={this.onChangeText('author')}
                        returnKeyType='next'
                        onSubmitEditing={this.onSubmitAuthor}
                        ref={refs => { this.authorInput = refs }}
                    />
                    <View style={styles.pickerViewStyle}>
                        <Text style={styles.categoryTextStyle}>Thể loại sách</Text>
                        <Text style={styles.categoryNameTextStyle}>{this.state.category_name}</Text>
                        <Picker
                            selectedValue={this.state.category_name}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue, itemPosition) =>
                                this.setState({
                                    category_id: itemValue,
                                    category_name: this.state.listCategory[itemPosition].category_name
                                })
                            }>
                            {this.state.listCategory.length ? this.renderPickerItem() :
                                (<Picker.Item label="" value="" />)
                            }
                        </Picker>
                    </View>
                    <BookImagePicker title='Ảnh bìa trước' ref={refs => { this.frontImage = refs }} />
                    <BookImagePicker title='Ảnh bìa sau' ref={refs => { this.backImage = refs }} />
                    <CustomTextinput
                        textinputTitle='Mô tả'
                        placeholder={'Nhập mô tả ngắn'}
                        onChangeText={this.onChangeText('description')}
                        multiline={true}
                    />
                </ScrollView>
                <BasicTextButton
                    buttonStyle={styles.buttonStyle}
                    text='ĐĂNG KÝ SÁCH'
                    textStyle={styles.textButtonStyle}
                    onPress={this.onPressContributeBook}
                />
            </View>
        )
    }
    componentDidMount() {
        apis.fetch(API_ENDING.CATEGORY, null, apis.IS_AUTH.NO)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    this.setState({
                        listCategory: res.data,
                        isLoading: false
                    })
                }
                else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                console.log(err)
            })
    }

    onChangeText = type => text => {
        this.setState({ [type]: text });
    };

    onPressContributeBook = () => {
        const front_image = this.frontImage.state.bookImageData
        const back_image = this.backImage.state.bookImageData
        const { book_name, author, description, category_id } = this.state
        const data = {
            name: book_name,
            author, description,
            request_type: constants.REQUEST_TYPE.CONTRIBUTE,
            front_image, back_image,
            category_id,
        }
        console.log(data, 'ADADADADADADACACA')

        if (book_name.length == 0) {
            Toast.show('Tên sách không được để trống')
            return
        }

        if (author.length == 0) {
            Toast.show('Tên tác giả không được để trống')
            return
        }

        if (description.length < 50) {
            Toast.show('Mô tả cần ít nhất 50 ký tự')
            return
        }

        if (!front_image || !back_image) {
            Toast.show('Cần có đủ 2 ảnh bìa')
            return
        }

        const formData = new FormData()
        Object.keys(data).map(value => {
            formData.append(value, data[value])
        })

        console.log(formData, 'FORMMMMM')

        apis.postWithFormData(API_ENDING.REQUEST_CONTRIBUTE, formData, apis.IS_AUTH.YES)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pickerViewStyle: {
        marginTop: 10,
        marginHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    categoryTextStyle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
    },
    pickerStyle: {
        height: 50,
        width: 50,
    },
    categoryNameTextStyle: {
        marginLeft: 20,
        fontSize: R.size.textSize.content,
    },
    buttonStyle: {
        width,
        paddingVertical: platfromOS == 'android' ? 10 : 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: R.colors.primaryColor,
    },
    textButtonStyle: {
        fontSize: R.size.textSize.content,
        fontWeight: '500',
        color: R.colors.primaryWhiteColor
    }
})