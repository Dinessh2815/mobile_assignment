# Proactively Mobile App

A React Native health tracking application built with Expo and TypeScript, featuring health metrics tracking, to-do lists, and appointment management.

![Proactively App Banner](https://via.placeholder.com/800x200?text=Proactively+Health+App)

## Features

- 🚀 Splash Screen with logo and gradient background
- 🔐 Authentication with email and password
- 💾 Persistent login with AsyncStorage
- � Health metrics tracking (Steps, BMI, Sleep)
- ✅ Interactive To-Do list with progress tracking
- 📅 Appointment management
- 👤 User profile management

## Tech Stack

- **Expo**: Managed workflow for easy development
- **React Navigation**: For screen navigation
- **TypeScript**: For type safety
- **twrnc**: For Tailwind CSS styling in React Native
- **AsyncStorage**: For data persistence
- **React Native SVG**: For rendering SVG components
- **React Native Vector Icons**: For UI icons

## Getting Started with Expo Go

Follow these step-by-step instructions to run the Proactively app on your mobile device using Expo Go:

### Prerequisites

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/) (v14 or newer)
2. **Install Expo CLI**: Open your terminal and run:
   ```bash
   npm install -g expo-cli
   ```
3. **Install Expo Go app** on your mobile device:
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

### Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/proactively-mobile-app.git
   cd proactively-mobile-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npx expo start
   ```

   This will start the Metro Bundler and display a QR code in your terminal.

4. **Connect your device**:
   - **Android**: Open Expo Go app and scan the QR code from your terminal
   - **iOS**: Scan the QR code using your camera app, which will prompt you to open in Expo Go

### Logging In

Once the app is running on your device:

1. You'll see the splash screen with the Proactively logo
2. After a few seconds, you'll be redirected to the login screen
3. Use these credentials to log in:

   - **Email**: `admin@example.com`
   - **Password**: `1234`

4. You'll now have access to all features of the Proactively app!

### Troubleshooting

- **Connection issues**: Make sure your development machine and mobile device are on the same WiFi network
- **App crashes on start**: Try clearing the cache with `expo r -c`
- **Module not found errors**: Run `npm install` again to ensure all dependencies are properly installed

## Using the App

Once logged in, you can explore the following features:

### Home Screen

- **Health Score**: View your overall health score
- **Appointments**: See upcoming appointments and tap for details
- **Health Overview**: Track your steps, BMI, and sleep data
- **To-Do List**: Check off completed health tasks and see your progress

### Health Metrics

- **Steps**: Record and track your daily step count
- **BMI**: Update your BMI measurements
- **Sleep**: Log your sleep hours

### Account Screen

- View and manage your profile information
- Log out of the application

## Project Structure

```
src/
  ├── assets/             # SVG icons and images
  ├── components/         # Reusable UI components
  │   ├── AppointmentCard.tsx
  │   ├── HealthBar.tsx
  │   ├── HealthCard.tsx
  │   ├── HealthOverviewCard.tsx
  │   └── TodoList.tsx
  ├── hooks/             # Custom React hooks
  ├── navigation/        # Navigation configuration
  │   └── MainTabs.tsx
  ├── screens/           # App screens
  │   ├── AccountScreen.tsx
  │   ├── AppointmentDetails.tsx
  │   ├── BMIEntryScreen.tsx
  │   ├── HomeScreen.tsx
  │   ├── LoginScreen.tsx
  │   ├── SleepEntryScreen.tsx
  │   ├── SplashScreen.tsx
  │   └── StepsEntryScreen.tsx
  ├── types/             # TypeScript type definitions
  │   └── index.ts
  └── utils/             # Utility functions
      ├── auth.ts
      ├── storage.ts
      ├── styles.ts
      └── tw.ts
```

## Screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="https://via.placeholder.com/200x400?text=Splash+Screen" width="19%" alt="Splash Screen" />
  <img src="https://via.placeholder.com/200x400?text=Login+Screen" width="19%" alt="Login Screen" />
  <img src="https://via.placeholder.com/200x400?text=Home+Screen" width="19%" alt="Home Screen" />
  <img src="https://via.placeholder.com/200x400?text=Health+Track" width="19%" alt="Health Tracking" />
  <img src="https://via.placeholder.com/200x400?text=Todo+Screen" width="19%" alt="Todo List" />
</div>

## License

This project is for educational purposes.

---

Made with ❤️ using React Native and Expo
