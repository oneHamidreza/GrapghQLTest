import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {isReadyRef, navigationRef} from './RootNavigation';
import UserIndexScreen from "./screens/UserIndexScreen";
import UserDetailScreen from "./screens/UserDetailScreen";


const Stack = createStackNavigator();

const client = new ApolloClient({
    uri: 'https://dummyapi.io/data/graphql',
    cache: new InMemoryCache(),
    headers: {
        'app-id': '60ad457740bdd848b24c14b8'
    }
});


export default function App() {

    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true;
                }}>
                <Stack.Navigator
                    initialRouteName={'Main'}
                    screenOptions={{
                        headerShown: true,
                    }}>
                    {/*<Stack.Screen name="Auth" component={AuthScreen}/>*/}
                    <Stack.Screen name="Main" component={UserIndexScreen}/>
                    <Stack.Screen name="UserDetail" component={UserDetailScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
            </View>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
