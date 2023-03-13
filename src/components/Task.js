import React, { useState } from "react";
import styled from "styled-components/native";
import { IconButton } from "./IconButton";
import { images } from "./images";
import PropTypes from 'prop-types';
import { Input } from "./Input";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme})=>theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({theme, completed})=>(completed ? theme.done : theme.text)};
  text-decoration-line: ${({completed})=>
    completed ? 'line-through' : 'none'};
`;

const Task = ({item, deleteTask, toggleTask, updateTask})=>{
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  const onSubmitEditingF = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, {text}); //{...item, ...{text}}; 로 변경가능함.
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  const onBlurF = () => {
    if (isEditing) {
      setIsEditing(false);
      setText(item.text);
    }
  };

  return isEditing ? (
    <Input 
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={onSubmitEditingF}
      onBlur={onBlurF}
    />
    ) : (
      <Container>
        <IconButton type={item.completed ? images.completed : images.uncompleted}
          id={item.id}
          onPressOut={toggleTask}
          completed={item.completed}
        />
        <Contents completed={item.completed}>{item.text}</Contents>
        {item.completed || (
          <IconButton 
            type={images.update} 
            onPressOut={handleUpdateButtonPress}
            />)}
        <IconButton type={images.delete} 
        id={item.id} 
        onPressOut={deleteTask}
        completed={item.completed}
        />
      </Container>
  );
};
/* Task 컴포넌트에 전달할 때 올바른지 확인하는 라이브러리 -> propTypes */
/* 사용법: 객체명 : 값 = obj: PropTypes.타입(string(문자열), number(숫자) func(함수), object(객체), array(배열)).isRequired(필수 전달 여부 확인)*/
Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export {Task};