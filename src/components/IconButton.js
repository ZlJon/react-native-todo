import React from "react";
import styled from "styled-components/native"; 
import PropTypes from 'prop-types';
import { Pressable} from "react-native";
import { images } from "./images";

const Icon = styled.Image`
  tint-color: ${({theme, completed})=> 
    completed ? theme.done : theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`;

const IconButton = ({type, onPressOut, id}) => {
  const onPressOutF = ()=>{
    onPressOut(id);
  };
/* <Pressable의 Press 이벤트 종류 */
/*  onPressIn: 터치가 시작될 때 항상 호출
    onPressOut: 터치가 해제될 때 항상 호출
    onPress: 터치가 해제될 때 onPressOut 이후 호출
    onLongPress: 터치가 일정 시간 이상 지속되면 호출 
    사용방법: Press이벤트 종류={실행할 함수} */
  return(
    <Pressable onPressOut={onPressOutF}> 
      <Icon source={type}/>
    </Pressable>
  );
};

IconButton.defaultProps = {
  onPressOut: ()=>{},
};
/* Task 컴포넌트에 전달할 때 올바른지 확인하는 라이브러리 -> propTypes */
/* 사용법: 객체명 : 값 = obj: PropTypes.타입(string(문자열), number(숫자) func(함수), object(객체), array(배열)).isRequired(필수 전달 여부 확인)*/
IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export {IconButton};