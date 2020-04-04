/*
 * Created on Fri Mar 20 2020
 * Author: Gio Justiniano
 * More info: https://github.com/giomikee/
 *
 * Copyright (c) 2020
 */

export const API_PREFIX = 'https://api.exchangeratesapi.io/latest';
export const CONVERSION_RATES_STORAGE = {};

export const roundDecimal = amount => Math.round(amount * 100) / 100; // eslint-disable-line no-magic-numbers
