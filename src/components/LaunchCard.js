import React, {useState} from 'react';
import { Text, Image, Linking, Alert,Button} from 'react-native';
import {Card} from 'react-native-elements';
import { TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LaunchCard(props){
   const {item } = props;
  const [title, setTitle] = useState('Add To Favorites')
  const [isFavorite, setFavorite] = useState(false)
 async function removeFromFavorites(id) {
    let launches = await AsyncStorage.getItem('@FAVLAUNCHES');
    if (!launches) 
      launches = [];
     else 
      launches = JSON.parse(launches);
    let filteredlaunches = launches.filter((item) => item.id !== id);
    launches = JSON.stringify(filteredlaunches);
    await AsyncStorage.setItem('@FAVLAUNCHES', launches);
    setTitle('Add to Favorites');
    setFavorite(false);
  }

 async function addToFavorites(item) {
    let launches = await AsyncStorage.getItem('@FAVLAUNCHES');
    if (!launches) 
      launches = [];
    else 
      launches = JSON.parse(launches);
    if (launches.some((element) => item.id === element.id)) 
      Alert.alert('Already a favorite');
     else {
      launches.push(item);
      launches = JSON.stringify(launches);
      await AsyncStorage.setItem('@FAVLAUNCHES', launches);
      setTitle('Remove From Favorites');
      setFavorite(true);
    }
  }
  const handleClick = (item) =>
  { 
    if(item.pad.wiki_url !== undefined && item.pad.wiki_url !== '')
      Linking.openURL(item.pad.wiki_url)
    else if(item.program.wiki_url  !== undefined  && item.program.wiki_url !== '')
      Linking.openURL(item.program.wiki_url)
    else {
    console.log("no available data for this rocket"); 
    Alert.alert(
      "Error",
      "No URL found",
      [
        { text: "OK", onPress: () => console.log("OK") }
      ]
    );
    }
  }

 return (
    <TouchableHighlight onPress = {()=>handleClick(item)}>
    <Card  style={{alignItems: 'center'}}>
    <Text   style={{fontWeight :'bold', fontSize : 15 , textAlign :'center'}}>{item.name} </Text>
    <Image
      style={{width: 280, height: 100}}
      source={{uri: item.image}}
    />
    <Text style={{ textAlign :'center'}} >{new Date(item.window_end).toString()}</Text>
    <Text  style={{ textAlign :'center'}}  >{'Status: '+ item.status.name}</Text>        
    <Text style={{ textAlign :'center'}}>{'Location: ' + item.pad.location.name}</Text>
    <Button color={isFavorite ? "#32CD32":"#f198ff"} title={isFavorite ? 'Remove From Favorites': 'Add To Favorites'} variant="secondary" onPress={() => isFavorite ? removeFromFavorites(item.id) :  addToFavorites(item) }>   </Button>
  </Card>
  </TouchableHighlight>

);
  
}
export default LaunchCard;

