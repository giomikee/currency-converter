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
import { Col, Row, Alert, Button } from 'react-bootstrap';
import ConversionRate from './ConversionRate';
import ConversionResult from './ConversionResult';

const NULL_OPTION = <option></option>;

const getConversionApiUrl = (base, target) => `${API_PREFIX}?base=${base}&symbols=${target}`;

const showCurrencies = (currencies, keyPrefix) => [
	Object.assign({}, NULL_OPTION, { key: `${keyPrefix}Null` }),
	...currencies.map(currency => <option value={currency} key={`${keyPrefix}${currency}`}>{currency}</option>)
];

const calculateConversion = (amount, rate) => amount * rate;

export default class CurrencyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '',
			base: '',
			target: '',
			rate: null,
			result: null,
			error: null
		};
	}
	handleChange = event => {
		this.setState(
			{ [event.target.name]: event.target.value },
			() => {
				const { base, target, amount } = this.state;

				base && target && amount && this.fetchConversion();
			}
		);
	}
	swapCurrencies = () => {
		const { base, target } = this.state;

		this.setState({
			base: target,
			target: base
		}, this.fetchConversion);
	}
	fetchConversion = event => {
		event && event.preventDefault();

		const { base, target, amount } = this.state;
		const storageKey = `${base}-${target}`;
		let rate,
			result;

		if (CONVERSION_RATES_STORAGE[storageKey]) {
			rate = CONVERSION_RATES_STORAGE[storageKey];
			result = calculateConversion(amount, rate);

			this.setState({ rate, result });
		} else {
			fetch(getConversionApiUrl(base, target))
				.then(res => res.json())
				.then(data => {
					rate = data.rates[target];
					result = calculateConversion(amount, rate);
					CONVERSION_RATES_STORAGE[storageKey] = rate;

					this.setState({ rate, result });
				})
				.catch(error => this.setState({ error }));
		}
	}

	render() {
		const { currencies } = this.props,
			{ amount, base, target, rate, result, error } = this.state,
			isSwapEnabled = amount && base && target;

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
								{showCurrencies(currencies, 'base')}
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} sm='1' controlId='swap' className='m-sm-auto'>
							<Button
								onClick={this.swapCurrencies}
								variant='secondary'
								size='sm'
								disabled={!isSwapEnabled}
								block>
								⇄
							</Button>
						</Form.Group>
						<Form.Group as={Col} sm='5' controlId='target'>
							<Form.Label>Convert to:</Form.Label>
							<Form.Control
								required
								as='select'
								name='target'
								value={target}
								onChange={this.handleChange}>
								{showCurrencies(currencies, 'target')}
							</Form.Control>
						</Form.Group>
					</Form.Row>
				</Form>
				<Row className='p-sm-2'>
					{
						error ?
							<Col sm='12'>
								<Alert variant='danger'>
									{error.message}
								</Alert>
							</Col>
							: result &&
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
