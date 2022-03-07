import React, { Fragment, useEffect, useState } from "react";

import Metadata from "../layouts/Metadata";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userAction";

const ForgotPassword = () => {

    const [ email, setEmail ] = useState('')    
    
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { error, message, loading  } = useSelector(state => state.user);

    useEffect(() => {        
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message) {
            alert.success(message)            
        }
    }, [dispatch, alert, error, message ])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);
        
        dispatch(forgotPassword(formData))
    }

  return (
    <Fragment>
        <Metadata title={'Forgot Password'} />

        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email_field"></label>
                        <input type="text" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <button 
                    id="forgot_password_button"
                    type="submit" 
                    className="btn update-btn btn-block mt-4 mb-3" 
                    disabled={loading ? true : false}
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default ForgotPassword