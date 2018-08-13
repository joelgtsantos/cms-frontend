import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { GoogleLogin, GoogleLogout  } from 'react-google-login';
import GitHubLogin from 'react-github-login';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { requestLogin } from '../../../actions';


class Login extends Component {

  responseGoogle = (response) => {
    this.props.requestLogin(response.accessToken);
  }

  responseGithub = (response) => {
    console.log(response);
    //const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const params = {client_id: '84321d8de8002c6f4e85', 
                      client_secret: 'd06490aca95a5775e5d331ac3ba4e7926162bd5c',
                      code: response.code
                    }
                    
    const bodyParams = Object.keys(params).map( key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: bodyParams
    }).then(response => response.json())
      .then(json => {
      const options = {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${json.access_token}`
        }
      };

      fetch('http://localhost:8080/cmsusers/api/v1/user', options).then(r => {
          const token = r.headers.get('x-auth-token');
          r.json().then(user => {
              if (token) {
                  this.setState({isAuthenticated: true, user, token})
              }
          });
      })
    });
  }

  responseGooglef = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Row>
                      <Col xs="12" className="text-right">
                        <GoogleLogin
                          clientId="729418284493-85l6tlnqm1cu825mt9ss1epd703dfp4t.apps.googleusercontent.com"                       
                          className="btn-google-plus btn-brand mr-1 mb-1 btn btn-secondary btn-block"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          prompt="consent"
                        >
                          <i className="fa fa-google icon-left"></i><span>Sign in with Google</span>
                        </GoogleLogin>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" className="text-right">
                        <GitHubLogin
                          clientId="84321d8de8002c6f4e85"
                          className="btn-github btn-brand mr-1 mb-1 btn btn-secondary btn-block"
                          redirectUri="http://localhost:3000/login" 
                          onSuccess={this.responseGithub}
                          onFailure={this.responseGithub}
                        >
                          <i className="fa fa-github icon-left"></i><span>Sign in with Github</span>                        
                        </GitHubLogin>
                      </Col>
                     {/*  <GoogleLogout
                        buttonText="Logout"
                        onLogoutSuccess={this.responseGoogle}
                      /> */}
                    </Row>
                    <br/>
                    <hr/>
                    <br/>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.props.client.login}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(null, { requestLogin })(Login);
