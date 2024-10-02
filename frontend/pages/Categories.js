import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Categories = ({ route }) => {
  const { categoryTitle } = route.params;

  // TODO: Define different content for each category
  const getCategoryContent = (title) => {
    switch (title) {
        case 'MBH Recommendations':
            return 'Details about MBH Recommendations.';
        case 'User Manual':
            return 'Learn more on how to use the TAH system.';
        case 'TAH Parameters':
            return 'Information on TAH Parameters.';
        case 'Hospitals that support TAH':
            return 'Hospitals that support TAH.';
        case 'Emergency protocols':
            return 'Understand your Emergency protocols.';
        case 'Emergency protocols':
            return 'Understand your Emergency protocols.';
        case 'Support and Community':
            return 'Support and Community.';
        case 'Educational Resources':
            return 'Educational Resources.';
        case 'FAQs':
            return 'Frequently Asked Questions.';
        case 'Data Security':
            return 'Data Security.';
        default:
            return 'Information not available.';
    }
  };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{categoryTitle}</Text>
        <Text style={styles.description}>{getCategoryContent(categoryTitle)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default Categories;
