import { useMutation } from "react-query";


export const mutateZipiUserData = (secretKey, callBackFunction, onSuccess, onError) =>{
    return useMutation( secretKey,
        callBackFunction,
            {
                onSuccess,
                onError,
            }
        )
}