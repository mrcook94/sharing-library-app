import { pixelRatio, platfromOS } from 'screens/RootView'

const androidText = {
    appLogoName: pixelRatio <= 2 ? 24 : 26,
    header: pixelRatio <= 2 ? 18 : 20,
    title: pixelRatio <= 2 ? 16 : 18,
    subTitle: pixelRatio <= 2 ? 15 : 17,
    content: pixelRatio <= 2 ? 14 : 15,
    subContent: 13,
}
const textSize = {
    appLogoName: platfromOS === 'ios' ? 28 : androidText.appLogoName,
    header: platfromOS === 'ios' ? 22 : androidText.header,
    title: platfromOS === 'ios' ? 20 : androidText.title,
    subTitle: platfromOS === 'ios' ? 18 : androidText.subTitle,
    content: platfromOS === 'ios' ? 17 : androidText.content,
    subContent: platfromOS === 'ios' ? 16 : androidText.subContent,
    smallContent: platfromOS === 'ios' ? 14 : 12,
    tabTitle: platfromOS === 'ios' ? 13 : 11,
}

const iconSize = {
    iconTextInput: 16,
    logoSize: pixelRatio <= 2 ? 42 : 46,
    tabBarIcon: pixelRatio <= 2 ? 16 : 18,
    basic: pixelRatio <= 2 ? 18 : 20,
    iconButton: pixelRatio <= 2 ? 22 : 24,
}

const buttonSize = {
    basic: pixelRatio <= 2 ? 40 : 45,
}

export default {
    textSize,
    iconSize,
    buttonSize,
}