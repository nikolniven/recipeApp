# Recipe Search Application

A modern React application for searching and managing recipes with a clean, responsive interface and dark mode support.

## 🌟 Features

- **Recipe Search**
  - Search by meal name
  - Search by ingredient
  - Dynamic URL parameters for shareable searches

- **Recipe Details**
  - Detailed recipe information
  - Ingredient lists with measurements
  - Cooking instructions
  - Favorites system

- **User Interface**
  - Responsive grid layout
  - Dark/Light theme toggle
  - Loading states
  - Error handling

## 🛠 Tech Stack

- React
- React Router
- Context API for state management
- Tailwind CSS for styling
- Axios for API calls

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone [your-repository-url]
cd recipeApp
```

2. **Install dependencies**
```bash
cd Client
npm install
```

3. **Start the development server**
```bash
npm start
```

## 📁 Project Structure

```
recipeApp/
├── Client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchMeal.jsx
│   │   │   ├── RecipeDetail.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── MealContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   └── api/
│   │       └── MealApi.jsx
│   └── ...
```

## 🎨 Features in Detail

### Search Functionality
- Real-time search results
- Toggle between meal name and ingredient search
- Preserved search parameters in URL

### Recipe Details
- Complete ingredient lists
- Measurements
- Cooking instructions
- Favorite/unfavorite options

### Theme Support
- Light and dark mode
- Persisted theme preference
- Responsive design for all screen sizes

## 🔧 Configuration

The application uses environment variables for API configuration:
- Create a `.env` file in the client directory
- Add your API endpoints and keys

## 📝 License

[Your License Here]
