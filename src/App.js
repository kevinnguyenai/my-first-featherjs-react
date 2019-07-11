import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';
//import { getQueryVariable } from './client';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			auth: [
				{
					endpoint: "facebook",
					id: 1,
					status: "UnAuthenticated",
				},
				{
					endpoint: "google",
					id: 2,
					status: "UnAuthenticated",
				}
			]
		};
		this.runLoginGoogle = this.runLoginGoogle.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
	};


	responseFacebook(response) {
		console.log(response);
	};


	responseGoogle(response) {
		console.log(response)
	};

	runRegiserGoogle = (data) => {
		console.log(data);
	}

	runLoginGoogle = (data) => {
		console.log(data);
	};


	componentClicked() {
		return true;
	}

  handleDeleteAuthClick = (auth_id) => {
		console.log(auth_id)
	};

	handleEditAuthClick = (auth_id) => {
		console.log(auth_id)
	};

	handleFacebookClick = () => {
		console.log("Facebook Clicked")

	};

	handleGoogleClick = () => {
		console.log("Google Clicked");
	};

	
	handleGithubClick = () => {
		console.log("Github Clicked");
		window.open("https://www.myfirstfeatherjsapp.tk:30000/auth/github")
	
	}


	authenticatedFacebook = (attrs) => {
		this.setState({
			auth: this.state.auth.map((obj) => {
				if (obj.id === attrs.id) {
					return Object.assign({}, obj, {
						status: "Authenticated"
					});
				} else {
					return obj;
				}
			}),
		});	
	};

	render() {
		return (
			<div className="ui vertical center aligned segment">
				<div className="ui large inverted pointing secondary menu">
					<div className="ui secondary menu">
						<div className="item">
								<FacebookLogin
									appId="988110078247105"
									fields="first_name,last_name,email"
									textButton="Facebook"
									cookie="true"
									size="medium"
									redirectUri="https://www.myfirstfeatherjsapp.tk:30000/auth/google"
									onClick={this.componentClicked}
									callback={this.responseFacebook}
								/>
						</div>
						<div className="item">
								<GoogleLogin
									clientId="67921048862-86qlfb3pfvmjd848sliush9c64sa2mvv.apps.googleusercontent.com"
									buttonText="Google"
									redirectUri="https://www.myfirstfeatherjsapp.tk:30000/auth/google"
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
								/>
						</div>
						<div className="item">
							<GitHubLogin 
								clientId="c10354513f1beb8774d7"
								redirectUri="https://www.myfirstfeatherjsapp.tk:30000/auth/github"
								onSuccess={this.onGithubSuccess}
								onFailure={this.onGithubFailure}
							/>
						</div>
				</div>
				</div>
				<div className="ui text container">
					<AuthenticationBox 
							auth = {this.state.auth}
							deleteAuthClick = {this.handleDeleteAuthClick}
							editAuthClick = {this.handleEditAuthClick}
					/>
				</div>
				<div className="extra content">
						<span className='right floated facebook icon' onClick={this.handleFacebookClick}>
								<i className='facebook icon' />
						</span>
						<span className='right floated google icon' onClick={this.handleGoogleClick}>
								<i className='google icon' />
						</span>
						<span className='right floated github icon' onClick={this.handleGithubClick}>
								<i className='github icon' />
						</span>
					</div>
				
			</div>
		)
	}
}


class AuthenticationBox extends Component {

	render() {
		const authenticator = this.props.auth.map((authenobj) => (
			<AuthenBox
				key = {authenobj.id}
				id = {authenobj.id}
				endpoint = {authenobj.endpoint}
				status = {authenobj.status}
				deleteClick = {this.props.deleteAuthClick}
				editClick = {this.props.editAuthClick}
			/>
		));
		return (
			<div id="authbox">
				{authenticator}
			</div>
		);
	}
}

class AuthenBox extends Component {

	handleDeleteClick = () => {
		this.props.deleteClick(this.props.id);
	};

	handleEditClick = () => {
		this.props.editClick(this.props.id);
	}


	render () {
		return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.endpoint}
          </div>
          <div className='center aligned description'>
            <h2>
              {this.props.status}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon' onClick={this.handleEditClick}>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon' onClick={this.handleDeleteClick}>
              <i className='trash icon' />
            </span>
          </div>
        </div>
			</div>
		)
	}
}