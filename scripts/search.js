// This whole file was based off of code generated from ChaGPT to help me start a 
// firestore database for the first time. 

import { db } from './firebaseConfig.js';

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Function to perform a search query in Firestore
async function searchRecipes(query) {
  try {
    // Fetch all recipes from Firestore
    const snapshot = await db.collection('recipes').get();

    // Clear previous results
    searchResults.innerHTML = '';

    if (snapshot.empty) {
      searchResults.innerHTML = '<p>No recipes found.</p>';
      return;
    }

    // Convert the query to lowercase for case-insensitive search
    const lowerCaseQuery = query.toLowerCase();

    // Filter documents based on whether any field contains the query
    const results = snapshot.docs.filter(doc => {
      const data = doc.data();

      // Check if any of the fields (name, ingredients, directions) contain the query
      const nameMatch = data.name.toLowerCase().includes(lowerCaseQuery);
      const ingredientsMatch = data.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowerCaseQuery)
      );
      const directionsMatch = data.directions.some(direction =>
        direction.toLowerCase().includes(lowerCaseQuery)
      );

      return nameMatch || ingredientsMatch || directionsMatch;
    });

    // Display search results
    if (results.length > 0) {
      results.forEach(doc => {
        const recipe = doc.data();
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-item';
        recipeDiv.innerHTML = `
          <h3>${recipe.name}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
          <p><strong>Directions:</strong> ${recipe.directions.join(' ')}</p>
        `;
        searchResults.appendChild(recipeDiv);
      });
    } else {
      searchResults.innerHTML = '<p>No matching recipes found.</p>';
    }
  } catch (error) {
    console.error('Error searching recipes:', error);
    searchResults.innerHTML = '<p>Error searching recipes. Please try again.</p>';
  }
}

// Add event listener for the search button
searchBtn.addEventListener('click', () => {
  const query = searchBar.value.trim();
  if (query) {
    searchRecipes(query);
  }
});

// Add ability to press enter and search
searchBar.addEventListener('keydown', (event) => {
    const query = searchBar.value.trim();
    if (event.key === 'Enter' && query) {
      event.preventDefault(); // Prevent form submission
      searchRecipes(query);
    }
  });

// Optional: Real-time search as the user types
// searchBar.addEventListener('input', () => {
//   const query = searchBar.value.trim();
//   if (query) {
//     searchRecipes(query);
//   } else {
//     searchResults.innerHTML = '';
//   }
// });
