<template>
    <div class="home">
    	<div id="sync-charts">
    		<div id=candlesChart></div>
	        <div id=volumesChart></div>
    	</div>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'



export default {
    name: 'Home',
    data() {
        return {
        	volumeOptions: {
        		chart: {
        			id: 'volumes',
                    height: '200px',
                    type: 'bar',
                    group: 'chartsGroup',
                },
                dataLabels: {
                    enabled: false,
                },
                series: [],
                title: {
                    text: 'Volume',
                },
                noData: {
                    text: 'Loading...'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
				    labels: {
				      minWidth: 80,
				      maxWidth: 80,
				    },
				  }
        	},
            candleOptions: {
                chart: {
                	id: 'candles',
                    height: '400px',
                    type: 'candlestick',
                    group: 'chartsGroup',
                    toolbar: {
			            autoSelected: 'pan',
			          },
                },
                dataLabels: {
                    enabled: false,
                },
                series: [],
                title: {
                    text: 'GAZP',
                },
                noData: {
                    text: 'Loading...'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                	labels: {
				      minWidth: 80,
				      maxWidth: 80,
				    },
		          tooltip: {
		            enabled: true
		          }
		        },
            },
        };
    },
    mounted() {
        const candlesChart = new ApexCharts(
            document.querySelector("#candlesChart"),
            this.candleOptions
        );
        const volumesChart = new ApexCharts(
            document.querySelector("#volumesChart"),
            this.volumeOptions
        );

        candlesChart.render();
        volumesChart.render();

        this.$axios.get('http://iss.moex.com/iss/engines/stock/markets/shares/securities/GAZP/candles.json?from=2019-04-10&till=2020-04-10&interval=24').then(res => {
            const candles = [];
            const volumes = [];

            res.data.candles.data.forEach(row => {
                candles.push({
                    x: new Date(row[7]),
                    y: [row[0], row[2], row[3], row[1]]
                });
                volumes.push({
                    x: new Date(row[7]),
                    y: row[5]
                });
            });

            candlesChart.updateSeries([{
            	name: 'Candle',
                type: 'candlestick',
                data: candles,
            }]);

            volumesChart.updateSeries([{
            	data: volumes,
            	name: 'Volume',
            }]);
        });

    },
}
</script>