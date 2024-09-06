import { Text, View, StyleSheet } from "react-native";

export default function Details({ route }) {
    const { title, desc, stat } = route.params;
  
    return (
      <View style={styles.outer}>
        <Text style={styles.title}>{title}</Text>

        {/** Current Stat */}
        <View style={styles.container}>
          <Text style={styles.subtitle}>Current {title}</Text>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.desc}>{desc}</Text>
          <Text style={styles.stat}>{stat}</Text>
        </View>

        {/** Diagnostics */}
        <View style={styles.container}>
          <Text style={styles.subtitle}>Diagnostics</Text>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.desc}>Your {title} over the last 24 hours:</Text>

          <Text>TODO: Graph</Text>

        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
  // Containers
  outer: {
      padding: 15,
  },

  container: {
    marginTop: 15,
    backgroundColor: '#FFF',
    width: '905',
    borderRadius: 20,
    padding: 15,
  },

  // Text
  title: {
    fontSize: 30,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 20,
  },

  desc: {
    fontSize: 15,
    color: '#6C6262',
    marginBottom: 10
  },

  stat: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  // Other
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 8,
    marginBottom: 8,
  },
})