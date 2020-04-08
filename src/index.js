import './styles/main.scss';
import './js/main.js';


import axios from 'axios';

axios.get('http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?date=2013-12-20')
	.then(res => {
		console.log(res.data)
	});
