import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import NavigationService from 'routers/NavigationService'
import { ISBN_SCANNER } from 'libraries/utils/screenNames'

import apis from 'libraries/networking/book-apis'

export default class OnlineBookScreen extends Component {
    state = {
        startIndex: 10,
        maxResults: 20
    }
    render() {
        return (
            <View>
                <Button
                    title='Click here'
                    onPress={() => NavigationService.navigate(ISBN_SCANNER)}
                />
            </View>
        )
    }

    componentDidMount() {
        const searchKey = 'thinking'
        const { startIndex, maxResults } = this.state
        const data = {
            q: searchKey,
            startIndex,
            maxResults,
        }
        apis.fetch(apis.ENDING.VOLUMES, data)
            .then(res => {
                console.log(res, 'ACVVVVV')
            })
            .catch(err => {
                console.log(err, 'BBBBBBBBBBBB')
            })
    }

}
