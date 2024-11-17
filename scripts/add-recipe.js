// This whole file was based off of code generated from ChaGPT to help me start a 
// firestore database for the first time. 

// import { db, storage } from "../../src/index"; // Import db and storage from index.js
// import { addDoc, collection } from "firebase/firestore"; // Firestore functions
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage functions
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDMMqAWKIZL-9omIFBmXAF4aEQBNsV9hnc",
    authDomain: "apartment-6-recipes.firebaseapp.com",
    databaseURL: "https://apartment-6-recipes-default-rtdb.firebaseio.com",
    projectId: "apartment-6-recipes",
    storageBucket: "apartment-6-recipes.firebasestorage.app",
    messagingSenderId: "693486017182",
    appId: "1:693486017182:web:7bbd59bc7b5c0e9b33798f"
});

// Initialize cloud Firestore
const db = firebase.firestore();
const storage = firebase.storage();


// Elements from the form
const recipeForm = document.getElementById('recipeForm');
const nameInput = document.getElementById('name');
const ingredientsDiv = document.getElementById('ingredients');
const directionsDiv = document.getElementById('directions');
// const imageInput = document.getElementById('image');

// Add event listeners to buttons for adding ingredients and steps
document.getElementById('addIngredient').addEventListener('click', () => {
  // Create a new input element for the ingredient
  console.log("add ingredient button clicked")
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Ingredient ${ingredientsDiv.children.length + 1}`;
  ingredientsDiv.appendChild(input);  // Append the input field to the ingredients div
});

document.getElementById('addDirection').addEventListener('click', () => {
  // Create a new textarea for the direction
  const textarea = document.createElement('textarea');
  textarea.placeholder = `Step ${directionsDiv.children.length + 1}`;
  directionsDiv.appendChild(textarea);  // Append the textarea to the directions div
});

// Handle form submission
recipeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Collect recipe details
  const name = nameInput.value;
  const ingredients = Array.from(ingredientsDiv.getElementsByTagName('input')).map(input => input.value);
  const directions = Array.from(directionsDiv.getElementsByTagName('textarea')).map(textarea => textarea.value);
//   const imageFile = imageInput.files[0];

  try {
    // let imageUrl = '';

    // // If an image is selected, upload it to Firebase Storage
    // if (imageFile) {
    //   const storageRef = storage.ref(`recipe-images/${imageFile.name}`);
    //   await storageRef.put(imageFile);
    //   imageUrl = await storageRef.getDownloadURL();
    // }

    // Add the recipe data to Firestore
    await db.collection('recipes').add({
      name,
      ingredients,
      directions,
    //   image: imageUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Clear the form after successful submission
    recipeForm.reset();
    // Remove all dynamically added ingredient inputs
    ingredientsDiv.innerHTML = '';  // Clears the ingredient inputs

    // Remove all dynamically added direction textareas
    directionsDiv.innerHTML = '';  // Clears the direction textareas

    // Optionally, add one ingredient input and one direction textarea back for the next recipe
    const defaultIngredientInput = document.createElement('input');
    defaultIngredientInput.type = 'text';
    defaultIngredientInput.placeholder = 'Ingredient 1';
    ingredientsDiv.appendChild(defaultIngredientInput);
    
    const defaultDirectionTextarea = document.createElement('textarea');
    defaultDirectionTextarea.placeholder = 'Step 1';
    directionsDiv.appendChild(defaultDirectionTextarea);
   
    alert('Recipe added successfully!');
  } catch (error) {
    console.error('Error adding recipe:', error);
    alert('Failed to add recipe. Please try again.');
  }
});
