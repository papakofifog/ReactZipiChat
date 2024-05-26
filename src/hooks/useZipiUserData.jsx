import {  useQueries, useQuery } from "react-query";



export const fetchZipiUserData = (secreteKey, callBackFunction) =>{
    return useQuery(secreteKey, callBackFunction )
}

export const fetchZipiUserDataFromMultipleSources=  ( queryList ) => { 
    return useQueries({queries: queryList })
}