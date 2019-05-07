import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import BasicIcon from 'libraries/components/IconTemplate/BasicIcon'
import DefaultHeader from 'libraries/components/HeaderTemplate/DefaultHeader'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import ListNoDataComponent from 'libraries/components/ListNoDataComponent'
import { showLoading, hideLoading } from 'libraries/components/Loading/LoadingModal'
import apis from 'libraries/networking/apis'
import { API_ENDING } from 'libraries/networking/apiEnding'
import { Status } from 'libraries/networking/status'
import { width, height } from 'screens/RootView'
import NavigationService from 'routers/NavigationService'
import { BOOK_BY_CATEGORY_SCREEN } from 'libraries/utils/screenNames'

import R from 'res/R'

class CategoryScreen extends Component {
    state = {
        listCategory: [],
        isLoading: true
    }

    renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.categoryItem}
                onPress={this.onPressCategoryItem({item})}
            >
                <Text style={styles.categoryTextStyle}>{item.category_name}</Text>
                <BasicIcon
                    iconSource={R.images.icon_app.ic_arrow_right}
                />
            </TouchableOpacity>
        )
    }

    renderNoData = () => {
        return (
            <ListNoDataComponent
                imageNoData={R.images.default_image.img_none_data}
                textNodata={R.strings.noDataContent.book}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <DefaultHeader
                    headerTitle={R.strings.headerTitle.book_category}
                    iconBack={true}
                />
                <ScrollView>
                    <View style={{ width: '100%' }}>
                        {!this.state.isLoading && (
                            <FlatList
                                data={this.state.listCategory}
                                renderItem={this.renderCategoryItem}
                                keyExtractor={this.keyExtractor}
                                ListEmptyComponent={this.renderNoData}
                                style={styles.flatListStyle}
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        showLoading()
        apis.fetch(API_ENDING.CATEGORY, null, apis.IS_AUTH.NO)
            .then(res => {
                if (res && res.ok === Status.OK) {
                    this.setState({
                        listCategory: res.data,
                        isLoading: false
                    })
                    hideLoading()
                }
                else {
                    this.setState({
                        isLoading: false
                    })
                    hideLoading()
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                hideLoading()
                console.log(err)
            })
    }

    onPressCategoryItem = ({item}) => ()=> {
        NavigationService.navigate(BOOK_BY_CATEGORY_SCREEN, {data: item})
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
    },
    flatListStyle: {
        marginTop: 15,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderRadius: 10,
        backgroundColor: R.colors.primaryWhiteColor,
    },
    categoryItem: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.primaryBorderColor,
    },
    categoryTextStyle: {
        fontSize: R.size.textSize.content,
        color: R.colors.primaryColor,
        fontWeight: '400'
    }
})