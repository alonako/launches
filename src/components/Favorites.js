import { Text, View, FlatList, Image, Alert, Linking } from 'react-native';
import React, { useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

//AsyncStorage.clear();

function Favorites(props) {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getFavorites();
  }, [isFocused]);

  const handleClick = (item) => {

    if (item.pad.wiki_url !== undefined && item.pad.wiki_url !== '')
      Linking.openURL(item.pad.wiki_url)
    else if (item.program.wiki_url !== undefined && item.program.wiki_url !== '')
      Linking.openURL(item.program.wiki_url)

    else {
      console.log("no data for this rocket");
      Alert.alert(
        "Error",
        "No URL found",
        [
          { text: "OK", onPress: () => console.log("ok") }
        ]
      );
    }
  }

  async function getFavorites() {
    setLoading(true);
    const launches = await AsyncStorage.getItem('@FAVLAUNCHES');
    const parsedlaunches = JSON.parse(launches);
    setLoading(false);
    setFavorites(parsedlaunches);
  }
  return (
    <FlatList

      contentContainerStyle={{
        backgroundColor: '#FBFBF8',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
      }}
      keyExtractor={(item) => item.id.toString()}
      data={favorites}
      renderItem={({ item }) => (
        <View
          style={{
            marginTop: 25,
            width: 350,
            height: 250

          }}>

          <TouchableHighlight onPress={() => handleClick(item)}>

            <Card style={{ alignItems: 'center' }}>

              <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{item.name} </Text>

              <Image
                style={{ width: 280, height: 100 }}
                source={{ uri: item.image }}
              />

              <Text style={{ textAlign: 'center' }}>{new Date(item.window_end).toString()}</Text>
              <Text style={{ textAlign: 'center' }}>{'Status: ' + item.status.name}</Text>

              <Text style={{ textAlign: 'center' }}>{'Location: ' + item.pad.location.name}</Text>

            </Card>
          </TouchableHighlight>
        </View>


      )}
    />
  );
}

export default Favorites;



