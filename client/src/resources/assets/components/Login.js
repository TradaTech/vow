import React, { Component } from 'react';
import '../sass/login.scss';
import GoogleLogin from 'react-google-login';
import { Grid, Col, Row } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            test: 'This is form login',
            name: [],
            img_url: [],
            email: [],
            result: {},
            directroute: '/login/profile',
            googleApp: '656940544950-kofdct0ehtdslu1uf461si4f2vlk5mn8.apps.googleusercontent.com',
            isChecked: false
        }
    }

    /**
     * @param showProfileGoogle collect information of user and send to profile
     */

    showProfileGoogle = (result) => {
        this.setState({
            name: result.profileObj.name,
            email: result.profileObj.email,
            img_url: result.profileObj.imageUrl,
            //    displayname: result.profileObject.displayname
        })
        localStorage.setItem("name", this.state.name);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("img_url", this.state.img_url);
        console.log(result)
        this.props.history.push(`/login/profile`);
    }

    /**
     * @param redirectToTarget direact to profile information
     */

    redirectToTarget = () => {
        this.props.history.push(`/login/profile`)
    }

    render() {
        return (
            <Grid className="login_page">
                <Col className="social_login">
                    <Col>
                        <h2> Chose the way to login</h2>
                        <Row className="rule_login">
                            <textarea readOnly>By Login With Google, We only know your name and address  :D</textarea>
                        </Row>
                        <GoogleLogin
                            clientId={this.state.googleApp}
                            render={renderProps => (
                                <button className="btn_google_login" onClick={renderProps.onClick} >Login with Google</button>
                            )}
                            buttonText="Login"
                            onSuccess={this.showProfileGoogle}
                        />
                        <button className="btn_user_login" onClick={this.redirectToTarget}>No google, I hate it!</button>
                    </Col>
                    <Col>
                    </Col>
                </Col>

            </Grid>
        )
    }
}

export default Login;