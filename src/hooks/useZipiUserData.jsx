import {  useQueries, useQuery } from "react-query";



export const fetchZipiUserData = (secreteKey, callBackFunction) =>{
    return useQuery(secreteKey, callBackFunction )
}

export const fetchZipiUserDataFormMultipleSources=  ( queries, handleDataTransformation ) => { 
    return useQueries({queries: queries})
}