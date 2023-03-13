import React, { useState } from 'react';
import { Alert, Dimensions, StatusBar } from 'react-native';
import styled,{ThemeProvider} from 'styled-components/native'; //스타일드 리엑트 네이티브 임포트
import { Input } from './components/Input';
import {theme} from './components/theme';
import { Task } from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

/* styled-components는 js in css 즉, 자바스크립트에서 css문법을 그대로 사용할 수 있게하는 라이브러리임. 
사용법 : const Container(사용자 컴포넌트 이름) = styled.내장된 컴포넌트 이름`css 스타일 속성 입력`*/
/* 추가로 attrs()함수를 통해 전달되는 props에 따라 css속성을 변경할 수 있음. */
/* const Container = styled.View.attrs(props => ({ 사용자 속성 : 값 })) */
const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme})=>theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;
const List = styled.ScrollView`
  flex: 1;
  width: ${({width})=>width - 40}px;
`;


export default function App() {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false); //useState = 함수형 컴포넌트에서 상태를 관리할 수 있음.
  /* const [state(변수[리액트=상태이며, 변화할 수 있는 값임]), setState(함수)] = useState(initialState(초기값)) */

  const [newTask, setNewTask] = useState(''); //입력 후 빈칸으로 만드는 로직

  const [tasks, setTasks] = useState({});

  const saveTasksF = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks); //setTasks(tasks에 할당할 값을 입력)
    } catch (e) {
      console.log(e);
    }
  };

  const loadTasksF = async () => {
    const loadTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadTasks || '{}'));
  };

  const addTask = ()=> {
    const Id = Date.now().toString();
    const newTaskObject = {
      [Id]: {id: Id, text: newTask, completed: false},
    };
    setNewTask('');
    saveTasksF({...tasks, ...newTaskObject});
  };

  const deleteTaskF = id => {
    const currentTasks = Object.assign({}, tasks);
    Alert.alert('','삭제하시겠습니까?', [
      {
        text: '아니오',
        onPress() {
          console.log('아니오');
        }
      },
      {
        text: '예',
        onPress(){
          console.log('예');
          delete currentTasks[id];
          saveTasksF(currentTasks);
        }
      }
    ]);
  };

  const toggleTaskF = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    saveTasksF(currentTasks);
  };

  const updateTaskF = item=>{
    const currentTasks = Object.assign({}, tasks); 
    /* 사용법 : Object.assign(target,sources[여러 개 넣을 수 있음]) => sources로 target를 "덮어쓰기"함. 또는, const currentTasks = ({...tasks, ...newTaskObject})로 사용할 수 있음. */
    currentTasks[item.id] = item;
    saveTasksF(currentTasks);
  };

  const handleTextChange = text =>{
    setNewTask(text);
  };

  const onBlurF = () => {
    setNewTask('');
  };

  return isReady ? (
    /*스타일드 컴포넌트의 <ThemeProvider></ThemeProvider> 는 사용자가 정의한 스타일을 자식 컴포넌트에 전달할 수 있으나, 자식 컴포넌트에 사용자 정의 스타일을 사용하고 있어야 한다. */
    <ThemeProvider theme={theme}> 
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={theme.background}></StatusBar>
        <Title>투두 리스또</Title>
        <Input 
          placeholder="+ 에드 어 타스크!"
          value={newTask} //입력 후 빈칸으로 만드는 로직
          //onChange => <TextInput /> 컴포넌트에 입력된 텍스트가 변경될 때 호출됨.
          onChangeText={handleTextChange} //onChangeText={함수}
          onSubmitEditing={addTask}
          onBlur={onBlurF}
        />
        <List width={width}>
          {Object.values(tasks)
          .reverse()
          .map(item=>(
            <Task key={item.id} item={item} 
            deleteTask={deleteTaskF} 
            toggleTask={toggleTaskF}
            updateTask={updateTaskF}
            />
          ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={loadTasksF}
      onFinish={()=>setIsReady(true)}
      onError={console.error}
    />
  );
}
