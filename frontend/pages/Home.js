import { Text, View, StyleSheet } from "react-native";

import SummaryCard from "../components/SummaryCard";

// Descriptions for Summary Cards
const batteryLifeDesc = "Your battery life is within the normal range of 70-100%"
const heartRateDesc = "Your heart rate is within the normal range of 60-100 bpm"
const bloodOxDesc = "Your blood oxygen is within the normal range of 90-100%"
const bloodPressDesc = "Your blood pressure is within the normal range of 120/80 Hg or lower"
const tempDesc = "Your temperature is within the normal range of 36-37.5C"
const flowRateDesc = "Your flow rate is within the normal range of 70-100%"

// Stats for Summary Cards
const batteryLife = "93%"
const heartRate = "72 BMP"
const bloodOx = "95%"
const bloodPress = "120/80"
const temp = "36C"
const flowRate = "20%"
// TODO: Write functions for data formatting -> Turning raw data from sensors into formatted strings

export default function Home({ navigation }) {
    return (
        <>
            <View style={styles.statusBar}>
                <Text>TODO: Status Bar</Text>
            </View>
            <View style={styles.outerContainer}>
                <SummaryCard title="Battery Life" description={batteryLifeDesc} stat={batteryLife} navigation={navigation}></SummaryCard>
                <SummaryCard title="Heart Rate" description={heartRateDesc} stat={heartRate} navigation={navigation}></SummaryCard>
                <SummaryCard title="Blood Oxygen" description={bloodOxDesc} stat={bloodOx} navigation={navigation}></SummaryCard>
                <SummaryCard title="Blood Pressure" description={bloodPressDesc} stat={bloodPress} navigation={navigation}></SummaryCard>
                <SummaryCard title="Temperature" description={tempDesc} stat={temp} navigation={navigation}></SummaryCard>
                <SummaryCard title="Flow Rate" description={flowRateDesc} stat={flowRate} navigation={navigation}></SummaryCard>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: 'D1D1D6',
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '15',
    },

    statusBar: {
        padding: 10,
        display: 'flex',
        alignItems: 'center'
    }
})