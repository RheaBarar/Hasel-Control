import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CategoryItem from '../components/BrowseCard';

const categories = [
    { id: '1', title: 'MBH Recommendations' },
    { id: '2', title: 'User Manual' },
    { id: '3', title: 'TAH Parameters' },
    { id: '4', title: 'Hospitals that support TAH' },
    { id: '5', title: 'Emergency protocols' },
    { id: '6', title: 'Support and Community' },
    { id: '7', title: 'Educational Resources' },
    { id: '8', title: 'FAQs' },
    { id: '9', title: 'Data Security' },
  ];

export default function Browse({ navigation }) {
    const renderItem = ({ item }) => (
        <CategoryItem
          title={item.title}
          onPress={() => navigation.navigate('Categories', { categoryTitle: item.title })}
        />
    );
    
    return (
        <View style={styles.container}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      padding: 10
    },
  });