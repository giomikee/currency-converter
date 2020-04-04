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

export default function ConversionRate({ rate, base, target }) {
	const roundedRate = roundDecimal(rate);

	return (
		<Card bg='info' text='white'>
			<Card.Header>Conversion Rate</Card.Header>
			<Card.Body>
				<Card.Text>
                    1 {base} = {roundedRate} {target}
				</Card.Text>
			</Card.Body>
		</Card>
	);
}
