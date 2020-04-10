# Currency Converter

A simple currency converter to check the current exchange rates between two currencies

*Powered by [Exchange Rates API](https://exchangeratesapi.io/)*

*Coded with React and React Bootstrap*

## App features
![App demo](https://i.gyazo.com/2b6fc6d60d52ce9206327867b1ab8ed6.gif)
- Check the value of a certain amount of currency in another.
- To give a detailed conversion, the app first shows the exchange rate of two selected currencies before showing the final value of the converted amount.
- To reduce requests to the API, the app stores the exchange rate between the selected currencies throughout the user's session. So for example, if the user tries to convert from euro to US dollar, the first conversion will be requested to the API and after that the app will store the exchange rate between these two currencies. That means if in the same session the user wants to again convert with the same currencies, the app doesn't need to go through the API anymore to calculate the conversion.

## Getting Started

Clone the repository to your machine by running:
```bash
git clone https://github.com/giomikee/currency-converter
```

Go into the project's root directory and install its dependencies:
```bash
cd currency-converter && npm install
```

Once all the dependencies have been properly installed, you can run the app with:
```bash
npm start
```

Your browser should automatically open with the page of the app. Otherwise, it should be accessed by opening http://localhost:3000/ in your browser as long as the dependencies are properly installed.
