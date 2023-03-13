import React from "react";
import {useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
/* 리액트는 내장된 컴포넌트로 사용자 정의 컴포넌트를 만들 수 있다. 아래와 같은 방법으로 */
const StyledInput = styled.TextInput.attrs(({theme})=>({
  placeholderTextColor: theme.main
}))`
  width: ${({width})=> width - 40}px; 
  /* 사용법 : "width: ${()=> {}}" (필요시: px) 또한, ({width}) 구조분해를 사용함. */
  height: 60px;
  margin: 3px 0px;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({theme})=>theme.itemBackground};
  font-size: 25px;
  color: ${({theme})=>theme.text};
`;
const Input=({placeholder, value, onChangeText, onSubmitEditing, onBlur})=>{
  const width = useWindowDimensions().width
  /* Dimensions과 useWindowDimensions => 다양한 기기의 환경에 맞게 지정한 크키로 동일하게 적용가능함. 즉, 화면의 크기가 변경되면 크기, 너비, 높이를 자동으로 업데이트함.  */
  /*사용법 : Dimensions.get('window').width or useWindowDimensions().width */
  return (
    <StyledInput 
      width={width} 
      placeholder={placeholder} 
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      // keyboardAppearance="dark" 아이폰의 키보드색을 검정색으로 변경
      // secureTextEntry={true} 입력문자 보호
      // multiline={true} 여러줄 입력
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};
// props 속성의 타입과 필수여부체크
/* Task 컴포넌트에 전달할 때 올바른지 확인하는 라이브러리 -> propTypes */
/* 사용법: 객체명 : 값 = obj: PropTypes.타입(string(문자열), number(숫자) func(함수), object(객체), array(배열)).isRequired(필수 전달 여부 확인)*/
Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export {Input};