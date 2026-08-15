import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FAQ = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/assets/images/Background.png')} style={styles.background}>
            <View style={styles.container}>
                {/* Back Button */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={require('../assets/assets/images/A-1.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>FAQ</Text>

                {/* Content */}
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.text}>
                       How do I create an account?
                       --- click on sign up once u create it then login with those credentials.
                    </Text>
                    <Text style={styles.text}>
                       Can I use the app on multiple devices?
                       --- yes you can use it on multiple devices as long as you have your credentials!
                    </Text>
                    <Text style={styles.text}>
                        Is the app free to use? 
                        --- yes the App is free to use!
                    </Text>
                    <Text style={styles.text}>
                        Can I use the app without creating an account?
                        - No, unfortunatley you have to create a account to use the app.
                    </Text>

                    {/* Website Link */}
                    <TouchableOpacity onPress={() => Linking.openURL('https://moonpreneur.com/home/about-us')} style={styles.linkButton}>
                        <Text style={styles.linkText}>Visit Moonpreneur Website</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    backButton: {
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#d1a0a7",
    },
    backIcon: {
        width: 20,
        height: 15,
    },
    title: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    contentContainer: {
        maxWidth: '85%',
        alignSelf: 'center',
        flexShrink: 1,
        borderRadius: 20,
        flexGrow: 0,
        padding: 15,
        backgroundColor: 'white',
    },
    text: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'serif',
        textAlign: 'justify', 
        marginBottom: 12,
    },
    linkButton: {
        marginTop: 15,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f5837a',
        borderRadius: 20,
        marginBottom: 10,
        elevation: 5,
    },
    linkText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FAQ;