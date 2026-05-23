import React,{useState, useEffect, useMeno, useMemo } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet,FlatList,Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDevice = (props) => {
    const navigation = useNavigation();
    const route = useRoute();

    const textName = route.params?.data ?? '';
    const h_id = route.params?.h_id ?? '';

    const [token, setToken] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const deviceImages = useMemo(() => ([
      { id: '0', name: 'Fan', image: require('../assets/assets/AppIcons/Fan.png') },
      { id: '1', name: 'AC', image: require('../assets/assets/AppIcons/AC.png') },
      { id: '2', name: 'Bulb', image: require('../assets/assets/AppIcons/Bulb.png') },
      { id: '3', name: 'Speaker', image: require('../assets/assets/AppIcons/Speaker.png') },
      { id: '4', name: 'Charger', image: require('../assets/assets/AppIcons/Charging.png') },
      { id: '5', name: 'Smart Door', image: require('../assets/assets/AppIcons/smart door.png') },
      { id: '6', name: 'TV', image: require('../assets/assets/AppIcons/tv.png') },
      { id: '7', name: 'Security', image: require('../assets/assets/AppIcons/security system.png') },
      { id: '8', name: 'Vacuum', image: require('../assets/assets/AppIcons/robot vacuum.png') },
      // { id: '9', name: 'Others', image: require('../assets/AppIcons/Others.png') },
    ]), []);

useEffect(() => {
  const fetchToken = async () => {
    try {
      const storedLoginResponse = await AsyncStorage.getItem('LoginResponse');
      if (storedLoginResponse) {
        const parsed = JSON.parse(storedLoginResponse);
        setToken(parsed.result[0].token);
      }
    } catch (err) {
      console.log('Token fetch error:', err);
    }
  };
  fetchToken();
}, []);

const handleAddDevice = async () => {
  if (selectedImageIndex === null) {
    Alert.alert('Select Device Type', 'Please select a device type.');
    return;
  }

  try {
    const response = await fetch(
      'https://moonhub.moonpreneur.com/LMSService/api/IOT/AddUpdateDevice',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          device_id: parseInt(selectedImageIndex),
          user_device_id: 0,
          user_device_name: deviceName,
          connection_type_id: 1,
          hardware_id: h_id,
          status: false,
          is_active: 0,
          roomids: '4,5',
          room_no: 1,
          start_bg_color: '',
          end_bg_color: '',
          lottie_bg: '',
        }),
      }
    );
    const result = await response.json();
    if (!result.isError) {
      Alert.alert('Success', 'Device added successfully.');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Failed to add a Device.');
    }
  } catch (e) {
    console.log('Add Device Error:', e);
  }
};

return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === "ios" ? 'padding' : undefined}
    >
      <View style={styles.background} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/a1.png')} style={styles.backIcon}/>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Add Device</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Device Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter device Name"
            placeholderTextColor="#999"
            value={deviceName}
            onChangeText={setDeviceName}          
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hardware</Text>
          <TextInput
            style={[styles.input, {backgroundColor: '#ffffff10', color: '#ccc' }]}
            placeholder="Device Hardware"
            placeholderTextColor="aaa"
            value={textName}
            editable={false}
          />
        </View>

        <Text style={styles.label}>Choose Device Type </Text>

        <FlatList
          data={deviceImages}
          numColumns={3}
          keyExtractor={(item) => item.id}
          extraData={selectedImageIndex}
          contentContainerStyle={{ marginBottom: 30, marginTop: 8 }}
          renderItem={({ item, index }) => {
          const isSelected = selectedImageIndex === index;
          return (
            <TouchableOpacity
            onPress={() => setSelectedImageIndex(index)}
            style={{ alignItems: 'center', flex: 1, marginVertical: 12 }}
            >
           <View style={isSelected ? styles.selectedGlow : {}}>
           <Image source={item.image} style={styles.iconImage} />
           </View>
           <Text style={[styles.iconLabel, isSelected && styles.selectedIconLabel]}>
              {item.name}
           </Text>
           </TouchableOpacity>
          );
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
          <Text style={styles.addButtonText}>Add Device</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#527ff4',
    padding: 12,
    borderRadius: 10,
  },
  backIcon: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#0f2051',
   textAlign: 'center',
   marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#0f2051',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#0f2051',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#0f205130',
  },
  addButton: {
    backgroundColor: '#0f2051',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    bottom: 50,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  iconImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  selectedGlow: {
    shadowColor: '#527ff4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
    borderRadius: 35,
    backgroundColor: '#fff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel:{
    marginTop: 8,
    fontSize: 14,
    color: '#0f2051',
    fontWeight: '500'
  },
  selectedIconLabel:{
    color: '#527ff4',
    fontWeight: '700'
  }


})