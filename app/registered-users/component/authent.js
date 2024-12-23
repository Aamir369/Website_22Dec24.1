import {createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { firebaseConfig } from '@/lib/firebase/config/firebaseConfig';
import { onValue } from 'firebase/database';
import { signupPage } from './../../../app/signup/signuppage'
import { signinPage} from '../../signIn/SigninPage'

const auth = getAuth( firebaseConfig);

function firebaseapp(){
  const signUpUser = () =>{

    createUserWithEmailAndPassword (auth , "baig0220@gmail.com", "lallu7869").then((Value) => console.log(Value))
  };
  return(
    <div className='firebaseapp'>
      <signupPage/>
      <signinPage/>
    </div>

  );

} ;




