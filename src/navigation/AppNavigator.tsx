import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AmbienteScreen from '../screens/AmbienteScreen';
import AmbienteCreateScreen from '../screens/AmbienteCreateScreen';
import AmbienteDetailScreen from '../screens/AmbienteDetailScreen';
import EquipeScreen from '../screens/EquipeScreen';
import ColaboradorCreateScreen from '../screens/ColaboradorCreateScreen';
import ColaboradorDetailScreen from '../screens/ColaboradorDetailScreen';


export type RootStackParamList = {
    Login: undefined;
    App: undefined;
};

export type AmbienteStackParamList = {
    AmbienteMain: undefined;
    AmbienteCreate: undefined;
    AmbienteDetail: { id: number };
};

export type EquipeStackParamList = {
    EquipeMain: undefined;
    ColaboradorCreate: undefined;
    ColaboradorDetail: { id: number };
};


const AmbienteStack = createNativeStackNavigator<AmbienteStackParamList>();

function AmbienteNavigator() {
    return (
        <AmbienteStack.Navigator screenOptions={{ headerShown: false }}>
            <AmbienteStack.Screen name="AmbienteMain" component={AmbienteScreen} />
            <AmbienteStack.Screen name="AmbienteCreate" component={AmbienteCreateScreen} />
            <AmbienteStack.Screen name="AmbienteDetail" component={AmbienteDetailScreen} />
        </AmbienteStack.Navigator>
    );
}

const EquipeStack = createNativeStackNavigator<EquipeStackParamList>();

function EquipeNavigator() {
    return (
        <EquipeStack.Navigator screenOptions={{ headerShown: false }}>
            <EquipeStack.Screen name="EquipeMain" component={EquipeScreen} />
            <EquipeStack.Screen name="ColaboradorCreate" component={ColaboradorCreateScreen} />
            <EquipeStack.Screen name="ColaboradorDetail" component={ColaboradorDetailScreen} />
        </EquipeStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 8,
                    borderTopColor: colors.border,
                    backgroundColor: colors.card,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondary,
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} /> }}
            />
            <Tab.Screen
                name="Ambiente"
                component={AmbienteNavigator}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" size={size} color={color} /> }}
            />
            <Tab.Screen
                name="Equipe"
                component={EquipeNavigator}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} /> }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }}
            />
        </Tab.Navigator>
    );
}


const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="App" component={MainTabs} />
        </RootStack.Navigator>
    );
}