import * as types from '../constants/ActionTypes'
import { AsyncStorage } from "react-native"
const serverURL =  "http://256ec955.ngrok.io/1.0/api/"



export const register = payload =>(dispatch,getState) =>{
   
    //Check if user already exist
   getUser =  async ()=>{
      
        const user = await AsyncStorage.getItem(payload.email);
        return JSON.parse(user);
    }

    saveUser = async (user) =>{
        await AsyncStorage.setItem(user.email, JSON.stringify(user));
        return user;
    }
    getUser().then(u=>{

        if(u == null){
            
            saveUser(payload).then(user=>{
                dispatch({
                type:types.REGISTRATION_SUCCESS,
                token:user.email
                })
            }).catch(error=>{
                dispatch({
                    type:types.REGISTRATION_FAIL,
                    message:error.message
                })
            })
        }else{
            throw {message: 'User already exist'}
        }
    }).catch(error=>{
        dispatch({
            type:types.REGISTRATION_FAIL,
            message:error.message
        })
    })
   
}

export const login = payload =>(dispatch,getState) =>{
   
    //Check if user already exist
   getUser =  async ()=>{
      
        const user = await AsyncStorage.getItem(payload.email);
        return JSON.parse(user);
    }

    getUser().then(u=>{

        if(u != null){
           
            if(payload.password === u.password){
                dispatch({
                    type:types.LOGIN_SUCCESS,
                    token:u.email
                    })
            }else{
                dispatch({
                    type:types.LOGIN_FAIL,
                    message:"Email or Password is not valid"
                })
            }
        }else{
            throw {message: 'User does not exist'}
        }
    }).catch(error=>{
        dispatch({
            type:types.LOGIN_FAIL,
            message:error.message
        })
    })

}
