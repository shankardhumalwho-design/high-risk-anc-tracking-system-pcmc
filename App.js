import React, {
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from "react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import FollowupScreen from "./screens/FollowupScreen";
import UpdateANCScreen from "./screens/UpdateANCScreen";
import FacilityStaffScreen from "./screens/FacilityStaffScreen";
import MasterManagementScreen from "./screens/MasterManagementScreen";
import ReportsScreen from "./screens/ReportsScreen";

const Stack =
  createNativeStackNavigator();

const AuthContext =
  createContext(null);

export function useAuth() {
  return useContext(
    AuthContext
  );
}

function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <View
      style={
        styles.loadingContainer
      }
    >
      <View
        style={styles.loadingCard}
      >
        <Text
          style={styles.loadingTitle}
        >
          High Risk ANC Tracking System
        </Text>

        <Text
          style={
            styles.loadingSubtitle
          }
        >
          PCMC Health Department
        </Text>

        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={styles.loader}
        />

        <Text
          style={styles.loadingText}
        >
          Loading application...
        </Text>
      </View>
    </View>
  );
}

function AppNavigator() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation:
            "slide_from_right",
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={
                LoginScreen
              }
            />

            <Stack.Screen
              name="ForgotPassword"
              component={
                ForgotPasswordScreen
              }
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={
                DashboardScreen
              }
            />

            <Stack.Screen
              name="Registration"
              component={
                RegistrationScreen
              }
            />

            <Stack.Screen
              name="Followup"
              component={
                FollowupScreen
              }
            />

            <Stack.Screen
              name="UpdateANC"
              component={
                UpdateANCScreen
              }
            />

            <Stack.Screen
              name="FacilityStaff"
              component={
                FacilityStaffScreen
              }
            />

            <Stack.Screen
              name="MasterManagement"
              component={
                MasterManagementScreen
              }
            />

            <Stack.Screen
              name="Reports"
              component={
                ReportsScreen
              }
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles =
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor:
        "#f0f4f8",
      justifyContent:
        "center",
      alignItems:
        "center",
      padding: 24,
    },

    loadingCard: {
      width: "100%",
      maxWidth: 420,
      backgroundColor:
        "#ffffff",
      borderRadius: 24,
      padding: 32,
      alignItems:
        "center",
      borderWidth: 1,
      borderColor:
        "#e2e8f0",
    },

    loadingTitle: {
      fontSize: 22,
      fontWeight:
        "800",
      color:
        "#1a365d",
      textAlign:
        "center",
    },

    loadingSubtitle: {
      marginTop: 8,
      fontSize: 14,
      color:
        "#475569",
      textAlign:
        "center",
    },

    loader: {
      marginTop: 28,
    },

    loadingText: {
      marginTop: 14,
      fontSize: 14,
      color:
        "#64748b",
    },
  });
 
