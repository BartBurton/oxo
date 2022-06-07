import { useFonts } from 'expo-font'
import { StyleProp, Text, TextStyle } from 'react-native'
import { oColor, shadowColor } from 'theme'
import { Children } from 'types/Children'

type Props = {
    styles?: StyleProp<TextStyle>
    color?: string,
    fontSize?: number
}

const OxoText = ({
    styles,
    fontSize = 42,
    color = oColor,
    children
}: Props & Children) => {

    const [loaded] = useFonts({
        Wolfskin: require('fonts/Wolfskin.ttf')
    })

    return (
        <Text style={[
            styles,
            {
                fontFamily: loaded ? 'Wolfskin' : 'Calibri',
                fontSize,
                color,
                letterSpacing: 3,
                textShadowColor: shadowColor,
                textShadowOffset: {width: 4, height: 4},
            },
        ]}>
            {children as any}
        </Text>
    )
}

export default OxoText