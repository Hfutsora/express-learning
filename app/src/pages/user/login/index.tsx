import { useState } from 'react';

import { AtForm, AtInput, AtButton } from 'taro-ui';

import './index.scss';

function Index() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  function submitLogin() {

  }

  return (
    <AtForm className='login-container' onSubmit={submitLogin}>
      <AtInput clear title='用户名' name='name' value={username} onChange={(value) => setUsername(String(value))}></AtInput>
      <AtInput clear title='密码' name='password' value={password} type='password' onChange={(value) => setPassword(String(value))}></AtInput>

      <AtButton className='submit-button' formType='submit'>登录</AtButton>
    </AtForm>
  )
}

export default Index;
