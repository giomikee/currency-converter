/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<Row>
			<Col sm='12'>
				<footer className='fixed-bottom'>
					<p className='font-italic font-weight-light'>
                        Currency rates provided by &nbsp;
						<a
							href='https://exchangeratesapi.io/'
							target='_blank'
							rel="noopener noreferrer">
                                Exchange Rates API
						</a>
					</p>
				</footer>
			</Col>
		</Row>
	);
}
