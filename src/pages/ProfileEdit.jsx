import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMail, AiOutlineLock, AiOutlineSmile, AiOutlineHome } from 'react-icons/ai';
import DaumPost from './DaumPost';


export default function EditProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // 비밀번호 확인용
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);  // 프로필 이미지

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateNickname = (e) => {
    setNickname(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSave = () => {
    
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
  
    // 수정된 정보를 서버에 전송하고 저장하는 로직을 구현해야 합니다.
    // 이 부분은 서버와의 통신 또는 데이터 저장 로직을 추가해야 합니다.
  };

  const handleAddressSearch = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  return (
    <EditProfileContainer>
      <ProfileTitle>마이프로필</ProfileTitle>
      <ProfileImageContainer>
      <ProfileImage image={profileImage} />
        <HiddenFileInput 
          type="file" 
          accept="image/*" 
          onChange={updateProfileImage} 
          id="profileImageInput" 
        />
      </ProfileImageContainer>
      <UploadButton onClick={() => document.getElementById("profileImageInput").click()}>
        사진변경
      </UploadButton>
        
      <InputContainer>
        <InputGroup>
          <IconStyle as={AiOutlineMail}/>
          <PaddedInputField 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={updateEmail}
           />
        </InputGroup>
        <InputGroup>
          <IconStyle as={AiOutlineLock}/>
          <PaddedInputField 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={updatePassword}
           />
        </InputGroup>
        <InputGroup>
          <IconStyle as={AiOutlineLock}/>
          <PaddedInputField 
          type="password" 
          placeholder="비밀번호 확인" 
          value={confirmPassword}
          onChange={updateConfirmPassword}
           />
        </InputGroup>
        <InputGroup>
          <IconStyle as={AiOutlineSmile}/>
          <PaddedInputField 
          type="text" 
          placeholder="닉네임" 
          value={nickname} 
          onChange={updateNickname}
           />
        </InputGroup>
        <AddressContainer>
        <AddressIconStyle as={AiOutlineHome} />
        <AddressInput 
          type="text" 
          placeholder="주소" 
          value={address} 
          onChange={updateAddress}
        />
        <DaumPost setAddress={handleAddressSearch} />
      </AddressContainer>
      <AddressContainer>
        <AddressIconStyle as={AiOutlineHome} />
        <AddressInput 
          type="text" 
          placeholder="상세주소" 
          // 여기서는 상세주소를 관리하기 위한 별도의 state와 함수가 필요합니다.
        />
      </AddressContainer>
        </InputContainer>
      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </EditProfileContainer>
  );
}

// 스타일
const EditProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;


const ProfileTitle = styled.h2`
  margin-bottom: 30px;
  margin-left: 250px;
`;

const ProfileImageContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin-left: 250px;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.image ? `url(${props.image})` : "url('/profile.jpg')"} center/cover;
`;

const UploadButton = styled.button`
  background-color: #ff922b;
  color: #fff;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;  // 위쪽 여백 추가
  margin-left: 290px;  // 왼쪽 여백 추가
  width: 80px;
`;


const InputContainer = styled.div`
  width: 80%;
  max-width: 500px;
  margin-top: -200px;
  margin-left: 550px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  width: 80%;
  max-width: 500px;
  padding: 15px;
  background-color: #ff922b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 550px;
`; 

const HiddenFileInput = styled.input`
  display: none;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const IconStyle = styled.div`
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  left: 10px;
  font-size: 24px;
`;

const AddressIconStyle = styled(IconStyle)`
  top: 30%;
`;

const PaddedInputField = styled(InputField)`
  padding-left: 40px;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -10px; 
  position: relative;
`;

const AddressInput = styled(PaddedInputField)`
  flex: 1;
  margin-right: 10px;
`;