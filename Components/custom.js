import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {View, TouchableOpacity, Text, StyleSheet, Alert, BackHandler} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function custom(props){
    const navigation = useNavigation();
    return(
        <View style = {styles.Container}> 
        <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style = {styles.backButton}>
        <Ionicons name = "arrow-back-outline" size = {30} color = {'orange'}/> 
        </TouchableOpacity>
        <DrawerItemList {...props}/>
        </DrawerContentScrollView>
        <View style ={styles.ExitButton}>
            <TouchableOpacity onPress={async() => 
            {props.navigation.closeDrawer();
                AsyncStorage.clear();
                navigation.navigate('Login')
            }} style ={styles.Button}>
                <MaterialIcons name = "logout" size = {26} color = {'orange'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Alert.alert('Exit app','Are sure to exit the app?',
                [
                    {text:'No', style:'cancel'},
                    {text:'Yes', onPress:() => BackHandler.exitApp()}
                ]
            )}} style = {styles.Button}>
                <MaterialIcons name ="exit-to-app" size = {26} color = {'orange'}/>
                <Text>Exit</Text>
            </TouchableOpacity>
        </View>
        </View>

    )
}
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: 'blue'
    },
    Button:{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth:2,
        backgroundColor: 'white',
        borderColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton:{
        width: 30,
        height:30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25,
        borderWidth: 2,
    },
    ExitButton:{
        padding:20,
        borderTopWidth: 1,
        borderTopColor: 'black'
    }
})