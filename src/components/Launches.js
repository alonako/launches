import React, {useState , useEffect} from 'react';
import {View, FlatList, TextInput} from 'react-native';
import LaunchCard  from './LaunchCard';


function Launches(props){
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')

useEffect(() => {
  
  fetch(`https://lldev.thespacedevs.com/2.0.0/launch/?offset=${offset}&limit=10&format=json`)
    .then((res) => res.json())
    .then((res) => {
      setData(prevData => [...prevData, ...res.results])       
      })
    .catch(function(error) {
        console.log('Error');
        alert(error.message);
  });  
      setLoading(false);
}, [offset]);

const loadMore = () => {
  setOffset(offset+10);
};

const fetchData=(text)=> {

  if(text.length>2) {
    const api_url= `https://lldev.thespacedevs.com/2.0.0/launch/?search=${text}&limit=20&format=json`;
    fetch(api_url)
      .then((res) => res.json())
      .then((res) => {
        setInput(res.results)
      })
      .catch(function(error) {
        console.log('Error');
        alert(error.message);
      });
    }
  }

  useEffect(() => {
    setData(input);
  }, [input]);


const renderHeader=()=>{

  return (
    <TextInput
    onChangeText={text => fetchData(text)}
    placeholder='Search'
    style={{
      borderRadius: 20,
      borderColor: '#000',
      backgroundColor: '#fff'
    }}
    textStyle={{ color: '#000' }}

    />
  );
}


    return (
      
      <FlatList
          contentContainerStyle={{
          backgroundColor: '#FBFBF8',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}
        data={data}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => String(index)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        renderItem={({item}) => (
          <View
          style={{
            marginTop: 25,
            width: 350,
            height: 250,

          }}>

          <LaunchCard item={item}   />

        </View>
          

        )}
      />
    );
  
}
export default Launches;

