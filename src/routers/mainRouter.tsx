import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { screenContainerNames, screenNames } from '.';

const MainRouter = () => {
    const Stack = createNativeStackNavigator();

    // StackScreens
    function StackScreens(
        screenName: string,
        screenComponent: React.ComponentType<any>,
        headerShown: boolean,
    ) {
        return (
            <Stack.Screen
                name={screenName}
                component={screenComponent}
                options={{
                    headerShown: headerShown,
                }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screenNames.home}>
                {StackScreens(
                    screenNames.login,
                    screenContainerNames.LoginContainer,
                    false,
                )}
                {StackScreens(
                    screenNames.home,
                    screenContainerNames.HomeContainer,
                    true,
                )}
                {StackScreens(
                    screenNames.userDetails,
                    screenContainerNames.UserDetailsContainer,
                    true,
                )}
                {StackScreens(
                    screenNames.addUser,
                    screenContainerNames.AddUserContainer,
                    true,
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRouter;
