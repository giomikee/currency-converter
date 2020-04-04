/*
 * Created on Sat Apr 04 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

import React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import CurrencyAPI from './CurrencyAPI';

function App() {
	return (
		<div className="App">
			<Container>
				<Header />
				<CurrencyAPI />
				<Footer />
			</Container>
		</div>
	);
}

export default App;
