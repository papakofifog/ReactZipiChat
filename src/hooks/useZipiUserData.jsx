import {  useQuery } from "react-query";



export const useFetchZipiUserData = (onSuccess, onError, secreteKey, callBackFunction) =>{
    return useQuery(secreteKey, callBackFunction,{
        onSuccess,
        onError
    })
}