import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from TheMealDB API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  // Mock preparation time (in minutes)
  const getPreparationTime = () => {
    return Math.floor(Math.random() * 60) + 1; // Random time between 1 and 60 minutes
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipes.map((recipe) => (
        <View key={recipe.idMeal} style={styles.recipeCard}>
          <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{recipe.strMeal}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>⏰ {getPreparationTime()} mins</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Description</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>How to Prepare</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RecipesPage;
