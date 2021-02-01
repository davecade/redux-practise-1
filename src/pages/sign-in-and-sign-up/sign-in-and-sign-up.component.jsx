import React, { Fragment } from 'react';
import './sign-in-and-sign-up.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

const SignInAndSignUpPage = () => (
    <Fragment>
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    </Fragment>
)

export default SignInAndSignUpPage;