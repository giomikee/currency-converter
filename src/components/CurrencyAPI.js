/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React, { Component } from 'react';
import { API_PREFIX } from '../constants';
import CurrencyForm from './CurrencyForm';

export default class CurrencyAPI extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currencies: [],
			error: null
		};
	}

	componentDidMount() {
		fetch(API_PREFIX)
			.then(res => res.json())
			.then(data => this.setState(
				{ currencies: [data.base, ...Object.keys(data.rates)] }
			))
			.catch(error => this.setState({ error }));
	}
	render() {
		const { currencies, error } = this.state;
		let content;

		if (error) {
			content = error.message;
		} else if (currencies.length === 0) {
			content = 'Loading...';
		} else {
			content = <CurrencyForm currencies={currencies} />;
		}

		return <>{content}</>;
	}
}
