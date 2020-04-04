/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function Header() {
	return (
		<Row>
			<Col sm='12'>
				<header>
					<h1>
                Currency Converter
					</h1>
				</header>
			</Col>
		</Row>
	);
}
