import {  useQueries, useQuery } from "react-query";



export const fetchZipiUserData = (secreteKey, callBackFunction,handlDataTransformation) =>{
    return useQuery(secreteKey, callBackFunction,{
        select: handlDataTransformation
    })
}

export const fetchZipiUserDataFormMultipleSources=  ( queries, handleDataTransformation ) => { 
    return useQueries({queries: queries})
}