import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
import Login from './screens/LoginScreen';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('check', () => {
	const component = renderer.create(
		<Login />,
	);

	component.getInstance().setState ({
		userName : 'diku_admin',
		password : 'admin'
	})
	var a = await component.getInstance().onPressCallback();
	a.then(() => {
		console.log(this.component.getInstance());
	},this);
})
