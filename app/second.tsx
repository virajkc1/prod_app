import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Second() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Second Screen</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go Back to Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
});

