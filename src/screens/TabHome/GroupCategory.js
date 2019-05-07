import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { BasicTextButton } from 'libraries/components/ButtonTemplate/BasicButton'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import NavigationService from 'routers/NavigationService'
import { CATEGORY_SCREEN, BOOK_BY_CATEGORY_SCREEN } from 'libraries/utils/screenNames'

import R from 'res/R'

class GroupCategory extends Component {
    state = {
        listCategory: [],
        isLoading: true,
    }

    renderListCategory = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.categoryItemStyle}
                onPress={this.onPressCategoryItem({ item })}
            >
                <Text style={styles.textCategory}>{item.category_name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.textTitle}>{R.strings.homeTitle.category}</Text>
                    <BasicTextButton
                        text='Xem thêm >>'
                        textStyle={styles.buttonSeeMoreStyle}
                        onPress={this.onClickSeeMore}
                    />
                </View>
                {this.state.isLoading ? <LoadingComponent /> : (
                    <FlatList
                        data={this.state.listCategory}
                        renderItem={this.renderListCategory}
                        keyExtractor={this.keyExtractor}
                        numColumns={3}
                        style={styles.categoryListStyle}
                    />
                )}
            </View>
        )
    }

    componentDidMount() {
        const data = {
            limit: 6
        }
        apis.fetch(API_ENDING.CATEGORY, data, apis.IS_AUTH.NO)
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

    onClickSeeMore = () => {
        NavigationService.navigate(CATEGORY_SCREEN)
    }

    onPressCategoryItem = ({ item }) => () => {
        NavigationService.navigate(BOOK_BY_CATEGORY_SCREEN, { data: item })
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()
}

export default GroupCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    buttonSeeMoreStyle: {
        color: R.colors.primaryBlurTextColor,
        fontSize: R.size.textSize.subContent,
    },
    titleViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryItemStyle: {
        flex: 1,
        padding: 6,
        backgroundColor: R.colors.primaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        marginHorizontal: 3
    },
    textTitle: {
        fontSize: R.size.textSize.title,
        fontWeight: '500',
    },
    textCategory: {
        color: R.colors.primaryWhiteColor,
        fontSize: R.size.textSize.content,
    },
    categoryListStyle: {
        flex: 1,
        marginTop: 5,
    }
})