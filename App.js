import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

function TodoItem ({item, handleCheck}) {
  return (
      <View style={styles.listEntry}>
          <Text style={item.checked ? styles.listItemChk : styles.listItem}>{item.title}</Text>
          <SimpleLineIcons name="check" style={styles.chkBtn} onPress={() => handleCheck(item)}/>
      </View>
  );
}

export default function App() {

  const [textValue, setTextValue] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);

  const handleAdd = (todoText) => {
    const newId = todoList && todoList.length ? todoList[todoList.length-1].id + 1 : 1;
    setTodoList(todoList=> todoList.concat({id: `${newId}`, title: todoText, checked: false}))
    setFilteredList(filteredList=> filteredList.concat({id: `${newId}`, title: todoText, checked: false}))
  }

  const handleCheck = (checkedItem) => { 
    const newArr = filteredList.slice();
    newArr.map((item) => {
      if(item.id === checkedItem.id) {
        item.checked = !item.checked
      }
    })
    setFilteredList(newArr);
  }

  const getAll = () => {
    setFilteredList(todoList)
  }

  const getDone = () => {
    const res = todoList.filter((item) => {
      return item.checked === true
    })
    setFilteredList(res)
  }

  const getActive = () => {
    const res = todoList.filter((item) => {
      return item.checked === false
    })
    setFilteredList(res)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BABY SHARK</Text>
      <Text style={styles.hint}>TODO-dooodoooodooo</Text>
      <View style={styles.inputBar}>
        <TextInput 
          style={styles.textInput}
          onChangeText={text => setTextValue(text)}
          value={textValue}
          // placeholder="Enter Todo"
        />
        <SimpleLineIcons name="plus" style={styles.addBtn} onPress={() => handleAdd(textValue)} />
      </View>
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterBtn} onPress={()=>getAll()}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={()=>getActive()}><Text>Active</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={()=>getDone()}><Text>Done</Text></TouchableOpacity>
      </View>
      <FlatList
        data={filteredList}
        style={styles.list}
        renderItem={({ item }) => 
          <TodoItem item={item} handleCheck={handleCheck} />
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010e33',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#d15304',
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 60,
  },
  hint: {
    color: "#fff",
    marginBottom: 12,
  },
  textInput: {
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#d15304",
    borderWidth: 2,
    padding: 2,
    paddingLeft: 7,
    borderRadius: 10,
    width: 200
  },
  inputBar: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 35,
    // justifyContent: 'space-between',
    // height: 0.4,
  },
  addBtn: {
    marginTop: 4,
    marginLeft: 7,
    fontSize: 30,
    color: '#d15304',
  },
  filterBar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 40
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    marginTop: 40,
    width: 350,
  },
  listItem: {
    color: "#fff",
    fontSize: 25,
    margin: 10,
  },
  listEntry: {
    flexDirection: 'row',

  },
  chkBtn: {
    marginTop: 10,
    marginLeft: 23,
    fontSize: 30,
    color: '#d15304',
  },
  listItemChk: {
    color: "#d15304",
    fontSize: 25,
    margin: 10,
    textDecorationLine: "line-through",
    fontStyle: "italic"
  },
});
