<template>
    <div class="home">
        <div id="test-chart"></div>
        <!-- <table>
    	<thead>
    		<tr>
    			<th v-for="col in columns">{{ col }}</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="row in rows">
    			<td v-for="value in row">{{ value }}</td>
    		</tr>
    	</tbody>
    </table> -->
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'



export default {
    name: 'Home',
    data() {
        return {
            options: {
                chart: {
                	height: '600px',
                    type: 'candlestick',
                },
                dataLabels: {
                    enabled: false
                },
                series: [],
                title: {
                    text: 'Ajax Example',
                },
                noData: {
                    text: 'Loading...'
                }
            },
        };
    },
    mounted() {
        const chart = new ApexCharts(
            document.querySelector("#test-chart"),
            this.options
        );

        chart.render();

        this.$axios.get('http://iss.moex.com/iss/engines/stock/markets/shares/securities/GAZP/candles.json?from=2019-04-10&till=2020-04-10&interval=24').then(res => {
        	const candles = [];

        	res.data.candles.data.forEach(row => {
        		const candle = {
        			x: new Date(row[7]),
        			y: [row[0],row[2],row[3],row[1]]
        		};

        		candles.push(candle);

        	});

        	chart.updateSeries([{
         		data: candles
        	}]);
        });


    },
}
</script>