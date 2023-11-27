import {  useQueries, useQuery} from "react-query";
import { useQueryClient } from "../App";


const options={
    enabled:true
}
export const fetchZipiUserData = (secreteKey, callBackFunction) =>{
    return useQuery(secreteKey, callBackFunction , options)
}

export const fetchZipiUserDataFromMultipleSources=  ( queryList ) => { 
    return useQueries({queries: queryList })
}

export const refreshFetchedZipiUserData= (secreteKeys)=>{
    const queryClient= useQueryClient();
    queryClient.invalidateQueries(secreteKeys);
}

