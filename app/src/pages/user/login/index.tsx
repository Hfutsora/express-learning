import { login } from '@/api/user';
import { encrypt } from '@/utils/crypto';
import { setAuthorizationToken } from '@/utils/request';
import Taro from '@tarojs/taro';
import { useState } from 'react';

import { AtForm, AtInput, AtButton } from 'taro-ui';

import './index.scss';

function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  async function submitLogin() {
    const { data } = await login({
      body: {
        name: username,
        password: encrypt(password)
      }
    });

    setAuthorizationToken(data.token);

    Taro.redirectTo({ url: '/pages/home/index' });
  }

  return (
    <AtForm className='login-container' onSubmit={submitLogin}>
      <AtInput clear title='用户名' name='name' value={username} onChange={(value) => setUsername(String(value))}></AtInput>
      <AtInput clear title='密码' name='password' value={password} type='password' onChange={(value) => setPassword(String(value))}></AtInput>

      <AtButton className='submit-button' onClick={submitLogin}>登录</AtButton>
    </AtForm>
  );
}

export default Login;
