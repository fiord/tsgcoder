import React from 'react';
import DefaultLayout from './layouts/default';

class HelloMessage extends React.Component {
	render() {
		return (
			<DefaultLayout title={this.props.title}>
				<div>Hello {this.props.name}</div>
			</DefaultLayout>
		);
	}
}

module.exports = HelloMessage;
