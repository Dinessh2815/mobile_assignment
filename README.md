# Proactively Mobile App

A React Native app with authentication and user profile management using Expo and TypeScript.

## Features

- 🚀 Splash Screen with logo and gradient background
- 🔐 Authentication with email and password
- 💾 Persistent login with AsyncStorage
- 👤 Home screen with profile UI
- ⚙️ Account management screen

## Tech Stack

- **Expo**: Managed workflow for easy development
- **React Navigation**: For screen navigation
- **TypeScript**: For type safety
- **twrnc**: For Tailwind CSS styling in React Native
- **AsyncStorage**: For data persistence
- **React Native SVG**: For rendering SVG components
- **React Native Vector Icons**: For UI icons

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Testing

- Test credentials:
  - Email: admin@example.com
  - Password: 1234

## Project Structure

```
src/
  ├── assets/
  │   └── proactively_logo.svg
  ├── components/
  ├── screens/
  │   ├── AccountScreen.tsx
  │   ├── HomeScreen.tsx
  │   ├── LoginScreen.tsx
  │   └── SplashScreen.tsx
  ├── types/
  │   └── index.ts
  └── utils/
      ├── auth.ts
      ├── storage.ts
      └── tw.ts
```

## License

This project is for educational purposes.

---

Made with ❤️ using React Native and Expo
