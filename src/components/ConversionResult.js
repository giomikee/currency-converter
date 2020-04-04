/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import { roundDecimal } from '../constants';

export default function ConversionRate({ result, target }) {
	const roundedResult = roundDecimal(result);

	return (
		<Card bg='success' text='white'>
			<Card.Header>Conversion Result</Card.Header>
			<Card.Body>
				<Card.Text>
					{roundedResult} {target}
				</Card.Text>
			</Card.Body>
		</Card>
	);
}
