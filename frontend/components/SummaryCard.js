import { Text, View, StyleSheet, Button, Pressable } from "react-native";

export default function SummaryCard({ title, stat, description, navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{ title }</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.desc}>{ description }</Text>
            <Text style={styles.stat}>{ stat }</Text>

            {/**TODO: Make this button nicer and more button like */}
            <Pressable onPress={() => navigation.navigate('Details', { title: title, desc: description, stat: stat })}>
                <Text style={styles.pressableText}>Details {">"}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        width: '45%',
        height: '30%',
        borderRadius: 20,
        padding: 15,
    },

    title: {
        fontSize: 20,
    },

    desc: {
        fontSize: 12,
        color: '#6C6262',
        marginBottom: 18,
    },

    stat: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: 5,
        marginBottom: 5,
    }, 

    pressableText: {
        color: '#24a0ed',
        // textDecorationLine: 'underline',
        textAlign: 'right'
    }
})