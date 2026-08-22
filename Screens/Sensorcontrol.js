import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


export default function Sensorcontrol({route}) {
    const navigation = useNavigation();
    const {component, device} = route.params;
    const[desc, setdesc] = useState('');
    const[text, settext] = useState('');
    const[[isEnabled, setisEnabled]] = useState('false');
    const[loading, setloading] = useState(true);
    const fetchcomponentdetails = async()=> {
      try{
         const apiUrl = `https://test.moonr.com/LMSService/api/IOTDevice/GetComponentStatus?device_component_id=${component.device_component_id}&device_token=${device.device_token}`;
         console.log("fetching data form;", apiUrl);
         const response = await fetch(apiUrl)
      }
    }
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