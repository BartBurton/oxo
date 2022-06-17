import { StyleSheet, View } from 'react-native'
import { Children } from 'types/Children'

const Layout = ({ children }: Children) => {
    return (
        <View style={styles.container}>
            {children as any}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#41342e',
    },
})

export default Layout