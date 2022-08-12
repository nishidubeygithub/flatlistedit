import React, {useState} from 'react';
import {SafeAreaView,FlatList,StyleSheet,Text,View, Modal, TouchableOpacity, TextInput} from 'react-native';

const DATA = [
  {id:1, text: 'Item One'},
  {id:2, text: 'Item Two'},
  {id:3, text: 'Item Three'},
  {id:4, text: 'Item Four'},
]



const App = () => {
  const [data, setdata] = useState(DATA)
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [editItem, seteditItem] = useState();
  const [inputText, setinputText] = useState();

  const onPressItem = (item) => {
    setisModalVisible(true);
    setinputText(item.text)
    seteditItem(item.id)
  }

  const renderItem = ({item, index}) => {
return (
  <TouchableOpacity 
  style={styles.item}
  onPress ={()=> onPressItem(item)}
  >
<Text style={styles.text}>{item.text}</Text>
</TouchableOpacity>
)
  }

  const handleEditItem =(editItem) =>{
    const newData = data.map(item => {
      if (item.id == editItem){
        item.text = inputText;
        return item;
}
      return item;
    })
    setdata(newData);
    setisRender(!isRender)
  }

  const onPressSaveEdit =() => {
    handleEditItem(editItem); // save input text to data
    setisModalVisible(false); //close modal

  }
  return (
<SafeAreaView style ={styles.container}>
  <FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  extraData={isRender}
  />
  <Modal 
  animationType='fade'
  visible={isModalVisible}
  onRequestClose={() => setisModalVisible(false)}
  >
    <View style={styles.modalView}>
      <Text style={styles.text}>Change</Text>
      <TextInput
      style={styles.textInput}
      onChangeText={(text) => setinputText(text)}
      defaultValue={inputText}
      editable={true}
      multiline={false}
      maxLength={200}>
        </TextInput>
        <TouchableOpacity
        onPress={() => onPressSaveEdit()}
        style ={styles.touchableSave}
        >
          <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
     container:{
       flex:1 
     },
      item:{
borderBottomWidth:1,
borderBottomColor:'grey',
alignItems:'center'

        },
        text:{
          marginVertical:2,
          fontSize:25, 
          fontWeight:'bold',
          marginLeft:10
        }, 
        textInput:{
          width:'90%',
          height:70,
          borderColor:'purple',
          borderWidth:1,
          fontsize:25
        },
        modalView:{
          flex:1, 
          alignItems:'center',
          justifyContent:'center'
        },
        touchableSave:{
            backgroundColor:'orange',
            paddingHorizontal:100,
            alignItems:'center',
            marginTop:20
        }
})
export default App;