import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, } from 'react-native'
import R from 'res/R'
import ProfileHeader from './custom_components/ProfileHeader'
import { HEADER_HEIGHT } from 'libraries/components/HeaderTemplate/DefaultHeader'
import Avatar from './custom_components/Avatar'
import { AUTH_STACK, DETAIL_PROFILE_SCREEN, REQUEST_HISTORY_SCREEN } from 'libraries/utils/screenNames'
import NavigationService from 'routers/NavigationService'
import Database from 'libraries/utils/database'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { pixelRatio, platfromOS } from 'screens/RootView'
import { connect } from 'react-redux'
import LoadingComponent from 'libraries/components/Loading/LoadingComponent'
import { loadProfileAction } from '../../redux/actions/profileActions'
import BasicIcon from 'libraries/components/IconTemplate/BasicIcon'

class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'user'}
                size={R.size.iconSize.tabBarIcon}
                color={tintColor}
            />
        )
    };

    renderMenuItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.menuItemStyle}
                onPress={() => this.onPressMenuItem({ item })}
            >
                <View style={styles.menuItemGroup}>
                    <BasicIcon iconSource={item.image} />
                    <Text style={styles.itemTextStyle}>{item.title}</Text>
                </View>
                <BasicIcon iconSource={R.images.icon_app.ic_arrow_right} />
            </TouchableOpacity>
        )
    }

    render() {
        const { userProfile, isLoadingProfile, userListMenu } = this.props
        return (
            <View style={styles.container}>
                <ProfileHeader
                    headerTitle={R.strings.headerTitle.profile}
                    iconAdd={true}
                />
                <View style={styles.profileContainer}>
                    {isLoadingProfile ? <LoadingComponent /> :
                        (<View style={styles.profileView}>
                            <Avatar
                                avatarViewStyle={styles.avatarStyle}
                                avatarUrl={userProfile.avatar}
                                disabled={true}
                            />
                            <View style={styles.nameViewStyle}>
                                <Text style={styles.nameTextStyle}>{userProfile.name}</Text>
                                <View style={styles.pointView}>
                                    <BasicIcon iconSource={R.images.profile.ic_ranking} />
                                    <Text style={styles.pointTextStyle}>Thành viên {userProfile.rank}</Text>
                                </View>
                            </View>
                            <FlatList
                                data={userListMenu}
                                renderItem={this.renderMenuItem}
                                keyExtractor={this.keyExtractor}
                                style={styles.flatListStyle}
                            />
                        </View>)
                    }

                </View>
            </View>
        )
    }

    onPressMenuItem({ item }) {
        switch (item.id) {
            case R.strings.profileItemID.detailProfile:
                NavigationService.navigate(DETAIL_PROFILE_SCREEN)
                break;
            case R.strings.profileItemID.requestHistory:
                NavigationService.navigate(REQUEST_HISTORY_SCREEN)
                break;
            case R.strings.profileItemID.borrowingBooks:
                break;
            case R.strings.profileItemID.memberRanking:
                break;
            case R.strings.profileItemID.changePassword:
                break;
            case R.strings.profileItemID.logout:
                this.onClickLogout()
                break;
            default: break;
        }
    }

    onClickLogout = () => {
        Database.removeItem(Database.KEY.TOKEN)
        NavigationService.reset(AUTH_STACK)
    }

    keyExtractor = (item, index) => (item.id || item.key || index).toString()
}

export default connect(state => state.profileReducer, null)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.primaryGrayColor,
        alignItems: 'center'
    },
    profileContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
    },
    profileView: {
        backgroundColor: R.colors.primaryWhiteColor,
        position: 'absolute',
        top: -(HEADER_HEIGHT + 10),
        width: '100%',
        borderRadius: 8,
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginTop: 4
    },
    avatarStyle: {
        position: 'absolute',
        top: pixelRatio <= 2 ? -40 : -50,
    },
    pointView: {
        flexDirection: 'row',
        paddingTop: pixelRatio <= 2 ? 3 : 6,
        paddingBottom: pixelRatio <= 2 ? 6 : 10,
        alignItems: 'center',
    },
    pointTextStyle: {
        marginLeft: 10,
        color: R.colors.primaryColor
    },
    nameTextStyle: {
        fontSize: R.size.textSize.subTitle,
        fontWeight: '500',
        color: R.colors.primaryColor,
    },
    nameViewStyle: {
        marginTop: pixelRatio <= 2 ? 50 : 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListStyle: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: pixelRatio <= 2 ? 20 : 30,
    },
    menuItemStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: platfromOS === 'ios' ? 15 : 10,
        borderBottomWidth: 0.4,
        borderBottomColor: R.colors.primaryBorderColor,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuItemGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTextStyle: {
        fontSize: R.size.textSize.content,
        marginLeft: 15,
    },
    iconStyle: {
        width: R.size.iconSize.basic,
        height: R.size.iconSize.basic,
        tintColor: R.colors.primaryColor,
        resizeMode: 'contain'
    }
})
