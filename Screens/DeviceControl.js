import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground } from 'react-native-web';

export default function DeviceControl({navigation,route}) {
    const {device} = route.params;
    const [componentName, setcomponentName ] = useState('');
    const [components, setcomponents] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [token, settoken] = useState('');
    const [securityToken, setsecuritytoken] = useState('');
    const [selectedType, setselectedType] = useState('');
    const [componentStatuses, setComponentStatuses] = useState({});
    const [bottomsheetvisible, setbottomsheetvisible] = useState(false);
    const fetchToken = async() => {
        try{
            const storedLoginResponse =await AsyncStorage.getItem('LoginResponse');
            if(storedLoginResponse){
                const parsedResponse = JSON.parse(storedLoginResponse);
                const newToken = parsedResponse.result[0].token;
                settoken(newToken);
                fetchComponents(newToken);
            }
        }
        catch(error){
        console.error('error retriveing the token' ,error);
    }

    }
    const fetchUserProfile = async(token) => {
        if(!token)return;
        try{
            const Response = await fetch('https://moonhub.moonpreneur.com/LMSService/api/IOT/UserProfile',{
                method:'GET',
                headers:{'Authorization': `Bearer${token}`}
            });
            if(Response.status===200){
                const data = await Response.json();
                const UserProfile = data?.result?.[0];
                setsecuritytoken(UserProfile?.security_Token||'N/A');
            }
            else{
                console.error('failed to fetch profile', Response.status)
            }
        }
        catch(error){
            console.error('error fetching profile', error);
        }
    };
    const fetchComponents = async(apiToken) => {
        fetchUser(apiToken);
        try{
            const response = await fetch(`https://moonhub.moonpreneur.com/LMSService/api/IOT/GetDeviceComponents?user_device_id=${device.user_device_id}`, {
                method:'GET',
                headers:{
                    'Authorization': `Bearer${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });
        if(!response.ok){
            console.error(`HTTP error!  status:${response.status}`);
            return ;
        }
        const result = await response.json();
        if(result.statusCode === 200){
            setcomponent(result.result.filter(component=>component.deleted==='Active'));
            const statuses = {};
            result.result.forEach(component=>{
                statuses[component.device_component_id] = component.component_status ==='On';
            });

            setComponentStatuses(statuses);
        }
        }
        catch(error){
            console.error('error fetching Components:',error);
        }
    };
    const togglecomponentStatus = async(componentId, currentStatus) => {
        const newStatus = !currentStatus;
        const requestbody = {
            device_component_id: String(componentId),
            device_Token: String(device.device_Token),
            status:newStatus?true:false,
            component_desc: 'Test',
            component_text: 'Test',
        };
        console.log("updaterequest", JSON.stringify(requestbody));
        try {
            const response = await fetch('https://moonhub.moonpreneur.com/LMSService/api/IOTDevice/UpdateComponentStatus', {
                method: 'POST',
                headers: {
                    'user-token': securitytoken,
                    'device-token': device.device_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestbody),
            });
            console.log('update request part2', securitytoken);
            if (response.status === 200) {
                setComponentStatuses(prevstatuses => ({
                    ...prevstatuses,
                    [componentId]: newstatus,
                 }));
            }
             else {
                console.error('error updating component status:', response.status);
             }
        }
        catch(error){
            console.error('error updating component status', error);
        }
    };
    const savecomponent = async () => {
        if(!componentName || !selectedType){
            Alert.alert('error', 'please provide the component name and type');
            return;
        }
        console.log("Component Name:", componentName);
        console.log("selected type name:", selectedType);
        setisloading(true);
        let finalcomponentpin = '';
        if(selectedType === 'sensor'){
            finalcomponentpin='sensor'
        }
        else if(selectedType==='toggle'){
            finalcomponentpin = 'toggle'
        }
        else{
            Alert.alert('error', 'invalid component Type selected');
            setisloading(false);
            return ;
        }
        let component_id
        if(selectedtype==='sensor'){
            component_id=5;
        }
        else{
          component_id=1;

        }
        console.log('final component pin', finalcomponentpin);
        const componentdata = {
          user_device_id:device.user_device_id,
          device_component_id:0,
          device_component_name: componentname,
          component_id:component_id,
          component_pin:finalcomponentpin,
          is_active:1
        };
        console.log("request data:", componentdata);

        try{
          const response = await fetch('https://moonhub.moonpreneur.com/LMSService/api/IOT/AddUpdateComponent', {
            method: 'POST',
            headers:{
              'Authorization': `Bearer ${token}`,
              'Security-Key': securitytoken,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(componentdata)
        });
        const result=await response.json();
        if(result.iserror){
            const errormessages=result.responseException.validationErrors
            .map(error=>error.errorMessage)
            .join('\n');
             Alert.alert('Validation Error', errormessages);
        }
        if(response.ok && result.statusCode === 200){
            Alert.alert('success','Component saved successfully');
            fetchComponents(token);
            setbottomsheetvisible(false);
        }
        else{
            Alert.alert('error', result.message || 'failed to save the component');
        }
    }
    catch(error){
        console.error('error saving component:', error);
        Alert.alert('error', 'Something went wrong');
    }
    finally{
        setisloading(false);
    }
    };
  const deletecomponent=async (component)=>{
      if(!component || !component.device_component_id){
        Alert.alert('error', 'invalid component data');
        return;
      }
      setIsLoading(true);
      const requestbody = {
        user_device_id:device.user_device_id,
        device_component_id:component.device_component_id,
        device_component_name:component.device_component_name,
        component_id:component.component_id,
        component_pin:component.component_pin,
        is_active:0
      };
      try{
        const response = await fetch('https://moonhub.moonpreneur.com/LMSService/api/IOT/AddUpdateComponent', {
          method: 'POST',
          headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestbody)
        });
        const result=await response.json();
        if(result.iserror){
        Alert.alert('error', 'failed to delete component');

        }
        else if(response.ok && result.statusCode === 200){
            Alert.alert('Success', 'component deleted successfully');
            fetchComponents(token);
        }
        else{
            Alert.alert("error", result.message || 'something went wrong');
        }
      }
      catch(error){
        console.error("error deleting component:", error);
        Alert.alert("error", "something went wrong");
      }
      finally{
        setIsLoading(false);
      }
    };

const handlesensorpress = (item) =>{
  if(item.component_name.toLowerCase().includes("sensor")){
    navigation.navigate('sensorcontrol',{
      component:item,
      device:{device_token:String(device.device_token),securitytoken:securitytoken}
    });
  }
};

    return(
        <ImageBackground source={require('../assets/assets/images/background_dot.png')} style ={{width: '100%', height:'100%'}}>
            <FlatList data = {[1]} 
            renderItem={() => {
                <View style = {{flex:1}}>
                    <View style ={{flexDirection:'row', width: '100%', paddingHorizontal: 20, marginTop: 20, justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:12, borderRadius:10,marginTop:30,backgroundColor:'#d1a0a7'}}>
                            <Image source = {require('../assets/assets/images/backIcon.png')} style={{width:20, height:15,}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style = {{color:'white', fontSize: 35, fontWeight:'bold',width:'100%',alignSelf: 'center', textAlign: 'center',marginBottom: 20}}>Manage {'\n'} Components</Text>
                </View>
            }}/>
        </ImageBackground>
    );
  return (
    <View style={styles.container}>
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});