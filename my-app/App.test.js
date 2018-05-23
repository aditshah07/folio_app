import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';
import Login from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import hostUrl from './screens/data/url.json';
import resources from './screens/data/resources.json';

it('renders App without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();

  expect(rendered).toBeTruthy();
});

it('renders Login without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON();

  expect(rendered).toBeTruthy();
});

it('check initially isLoggedIn is false', () => {
	const component = renderer.create(
		<App />
	);
	expect(component.getInstance().state.nav.routes[0].params.isLoggedIn).toBe(false)
});

it('check initially token is empty', () => {
	const component = renderer.create(
		<App />
	);
	expect(component.getInstance().state.nav.routes[0].params.token).toBe('')
});

it('check isLoggedIn is true', async() => {
	jest.useFakeTimers();
	const component = renderer.create(
		<App />
	);
	const rendered = renderer.create(
		<Login />
	);

	async function login () {
		rendered.getInstance().userName = "diku_admin";
		rendered.getInstance().password = "admin";
		var data = await (rendered.getInstance().onPressCallback());
	}
	var data  = await login();

	expect(rendered.getInstance().userName).toBe('diku_admin')

	expect(rendered.getInstance().password).toBe('admin')

});

it('print settings info', () => {
	const component = renderer.create(
		<App />
	);
	console.log(component.getInstance().state.nav.routes[0].params.resources);
});

it('put input in login page', () => {

	const rendered = renderer.create(
		<Login />
	);
	rendered.getInstance().userName = "diku_admin";
	rendered.getInstance().password = "admin";
	
	expect(rendered.getInstance().userName).toBe('diku_admin')

	expect(rendered.getInstance().password).toBe('admin')

});

it('Invalid password should not login', async() => {
	const component = renderer.create(
		<App />
	);
	const rendered = renderer.create(
		<Login />
	);

	async function login () {
		rendered.getInstance().userName = "diku_admin";
		rendered.getInstance().password = "admi";
		try { 
			await (rendered.getInstance().onPressCallback());
		} catch(e){
			expect(e).toEqual(e);
		}
	}
	var data  = await login();

	expect(component.getInstance().state.nav.routes[0].params.isLoggedIn).toBe(false)

});

it('Renders profile page after loading user information', async() => {
	jest.useFakeTimers();
	var rendered = "";
    const data = JSON.stringify({
        username: "diku_admin",
        password: "admin",
    });
    const url = hostUrl.url + '/authn/login';
    await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Okapi-Tenant': 'diku',
            },
        })
        .then((response) => {
            var navigation = {state:{params:{token:"", username:""}}};
            navigation.state.params.token = response.headers['x-okapi-token'];
            navigation.state.params.username = "diku_admin";
            rendered = renderer.create(<ProfileScreen navigation = {navigation}/>).toJSON();
            expect(rendered).toBeTruthy();
        })
});

it('Renders HomePage after log in', async() => {
	jest.useFakeTimers();
	var rendered = "";
    const data = JSON.stringify({
        username: "diku_admin",
        password: "admin",
    });
    const url = hostUrl.url + '/authn/login';
    await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Okapi-Tenant': 'diku',
            },
        })
        .then((response) => {
            var navigation = {state:{params:{resources:resources, token: ""}}};
            navigation.state.params.token = response.headers['x-okapi-token'];
            rendered = renderer.create(<HomeScreen navigation = {navigation}/>).toJSON();
            expect(rendered).toBeTruthy();
        })
});
