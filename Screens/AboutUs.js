import { StyleSheet, Text, View } from 'react-native';



export default function AboutUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        AboutUs Screen
      </Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
