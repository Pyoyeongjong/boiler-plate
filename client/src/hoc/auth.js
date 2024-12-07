import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponemt, option, adminRoute = null) {

    // SpecificComponent: 하위 컴포넌트
    // option: 권한
    // adminRoute: true일 때 어드민만 들어갈 수 있음

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response);
                
                // 로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if (option) {
                        document.location.href='/login'
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin){
                        document.location.href='/'   
                    }else{
                        if(option === false)
                            document.location.href='/' 
                    }
                }
            })

        }, [])

        return (
            <SpecificComponemt />
        )
    }


    return AuthenticationCheck
}