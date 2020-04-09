/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React, { Component } from 'react';
import { API_PREFIX, CONVERSION_RATES_STORAGE } from '../constants';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import ConversionRate from './ConversionRate';
import ConversionResult from './ConversionResult';

const getConversionApiUrl = (base, target) => `${API_PREFIX}?base=${base}&symbols=${target}`;

const showCurrencies = (currencies, keyPrefix) =>
	currencies.map(currency => <option value={currency} key={`${keyPrefix}${currency}`}>{currency}</option>);

export default class CurrencyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '',
			base: '',
			target: '',
			conversionRequested: false,
			rate: null,
			result: null,
			error: null
		};
	}
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
			conversionRequested: false
		});
	}
	fetchConversion = event => {
		event.preventDefault();

		const { base, target, amount } = this.state;
		const storageKey = `${base}-${target}`;
		let rate,
			result;

		if (CONVERSION_RATES_STORAGE[storageKey]) {
			rate = CONVERSION_RATES_STORAGE[storageKey];
			result = amount * CONVERSION_RATES_STORAGE[storageKey];

			this.setState({ rate, result });
		} else {
			fetch(getConversionApiUrl(base, target))
				.then(res => res.json())
				.then(data => {
					rate = data.rates[target];
					result = amount * rate;
					CONVERSION_RATES_STORAGE[storageKey] = rate;

					this.setState({ rate, result });
				})
				.catch(error => this.setState({ error }));
		}

		this.setState({ conversionRequested: true });
	}

	render() {
		const { currencies } = this.props,
			{ amount, base, target, rate, result, error, conversionRequested } = this.state;

		return (
			<>
				<Form onSubmit={this.fetchConversion} className='border border-info rounded'>
					<Form.Row className='p-sm-2'>
						<Form.Group as={Col} sm='3' controlId='amount'>
							<Form.Label>Amount to convert:</Form.Label>
							<Form.Control
								required
								type='number'
								name='amount'
								placeholder='Amount to convert'
								value={amount}
								onChange={this.handleChange} />
						</Form.Group>
						<Form.Group as={Col} sm='3' controlId='base'>
							<Form.Label>Currency base:</Form.Label>
							<Form.Control
								required
								as='select'
								name='base'
								value={base}
								onChange={this.handleChange}>
								<option value=''></option>
								{showCurrencies(currencies, 'base')}
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} sm='4' controlId='target'>
							<Form.Label>Convert to:</Form.Label>
							<Form.Control
								required
								as='select'
								name='target'
								value={target}
								onChange={this.handleChange}>
								<option value=''></option>
								{showCurrencies(currencies, 'target')}
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} sm='2' controlId='submit' className='m-sm-auto'>
							<Button variant="primary" type="submit" block>
							Convert
							</Button>
						</Form.Group>
					</Form.Row>
				</Form>
				<Row className='p-sm-2'>
					{
						conversionRequested && error &&
							<Col sm='12'>
								<Alert variant='danger'>
									{error.message}
								</Alert>
							</Col>
					}

					{
						conversionRequested && result &&
						<>
							<Col sm='6'>
								<ConversionRate rate={rate} base={base} target={target} />
							</Col>
							<Col sm='6'>
								<ConversionResult result={result} target={target} />
							</Col>
						</>
					}
				</Row>
			</>
		);
	}
}
