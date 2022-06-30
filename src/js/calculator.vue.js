import { User } from '../../src/js/user.module.js?t=1'

/* vue */ 
import { ProfitViewer } from '../../src/js/profitViewer.vue.js?t=1'

Vue.createApp({
    components : { 
        ProfitViewer
    },
    data() {
        return {
            User : null,
            chart : null,
            periods : ['Mes','Semestral','Año'],
            data : {
                profit : null,
                capitalFinal : null,
                capital : null,
                duration : null,
                roi : null,
                withdraws : null,
                fee : null,
                inflation : null,
            },
            results : [],
            gains : null,
            years : null,
        }
    },
    watch : {
        data : {
            handler() {
                this.calculateData()
            },
            deep: true
        },
    },
    methods: {
        calculateDataResults : function() {
            return new Promise((resolve) => {
                this.results = []

                const n = 1 // number of coumpundings per year

                for(let i = 0; i < this.data.duration; i++)
                {
                    const result = (this.data.capital * Math.pow((1 + (this.data.roi / (n * 100))), (n * i+1)));

                    this.results.push({
                        year: i+1,
                        result: result,
                        gain: result - this.data.capital,
                    }) 
                }
                
                resolve()
            })
        },
        calculateData : function() {
            this.calculateDataResults().then(() => {   
                this.data.capitalFinal = this.results[this.results.length - 1].result
                this.data.profit = (this.data.capitalFinal * 100) / this.data.capital
            })
        },
        initChart : function() {
            const ctx = document.getElementById('myChart').getContext('2d');

            // if(this.chart)
            // {
            //     this.chart.destroy()
            // }

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.years,
                    datasets: [{
                        label: 'capital',
                        data: this.gains,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
    },
    mounted() 
    {
        this.User = new User
        this.initChart()
    },
}).mount('#app')