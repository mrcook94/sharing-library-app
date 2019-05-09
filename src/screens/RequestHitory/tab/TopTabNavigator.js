import * as screenNames from 'libraries/utils/screenNames';
import R from 'res/R';
import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import SingleTab from './SingleTab'
import { width, pixelRatio } from 'screens/RootView'

const requestTopTab = createMaterialTopTabNavigator(
    {
        [screenNames.REQUEST_BORROW_BOOK]: {
            screen: props => <SingleTab {...props} />,
            navigationOptions: {
                title: R.strings.headerTitle.request_tab.borrow,

            }
        },
        [screenNames.REQUEST_CONTRIBUTE_BOOK]: {
            screen: props => <SingleTab {...props} />,
            navigationOptions: {
                title: R.strings.headerTitle.request_tab.contribute,

            }
        },
    },
    {
        swipeEnabled: true,
        lazy: true,
        tabBarOptions: {
            scrollEnabled: true,
            showIcon: false,
            indicatorStyle: {
                backgroundColor: R.colors.primaryColor
            },
            upperCaseLabel: false,
            style: {
                backgroundColor: R.colors.primaryWhiteColor
            },
            tabStyle: {
                height: 50,
                width: width / 2,
            },
            labelStyle: {
                fontWeight: '500',
                fontSize: R.size.textSize.content,

            },
            activeTintColor: R.colors.primaryColor,
            inactiveTintColor: R.colors.primaryBlurTextColor,
        }
    }
)

export default RequestTopTabNavigator = createAppContainer(requestTopTab)