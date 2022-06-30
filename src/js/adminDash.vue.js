import { UserSupport } from "../../src/js/userSupport.module.js";

/* vue */

Vue.createApp({
    components: {},
    data() {
        return {
            UserSupport: null,
            brokers: {},
            stats: {
                totalCapital: 0,
                totalDeposit: 0,
                totalWithdraws: 0,
                totalProfits: 0,
                pendingWithdraws: 0,
                totalUsers: 0,
            },
        };
    },
    watch: {
        query: {
            handler() {
                this.filterData();
            },
            deep: true,
        },
    },
    methods: {
        sortData: function (column) {
            this.users.sort((a, b) => {
                const _a = column.desc ? a : b;
                const _b = column.desc ? b : a;

                if (column.alphabetically) {
                    return _a[column.name].localeCompare(_b[column.name]);
                } else {
                    return _a[column.name] - _b[column.name];
                }
            });

            column.desc = !column.desc;
        },
        filterData: function () {
            this.users = this.usersAux;

            this.users = this.users.filter((user) => {
                return (
                    user.names.toLowerCase().includes(this.query.toLowerCase()) ||
                    user.email.toLowerCase().includes(this.query.toLowerCase()) ||
                    user.company_id.toString().includes(this.query.toLowerCase())
                );
            });
        },
        initChart: function (response) {
            const ctx = document.getElementById("myChart").getContext("2d");

            const DATA_COUNT = 7;
            const NUMBER_CFG = [123, 123, 123, 123, 123];

            console.log(response);

            // const labels = Utils.months({count: 7});

            let datasets = [];
            response.brokers.map((broker) => {
                datasets.push({
                    label: broker.name,
                    data: broker.data,
                    borderColor: broker.color,
                    backgroundColor: broker.color,
                    pointStyle: "circle",
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    cubicInterpolationMode: "monotone",
                    tension: 0.4,
                });
            });

            const data = {
                labels: response.labels,
                datasets: datasets,
            };

            const config = {
                type: "line",
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: false,
                            text: "Capital invertido por broker 5 días atrás",
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: "Montos invertidos",
                            },
                        },
                    },
                },
            };

            const myChart = new Chart(ctx, config);
        },
        initChartPie: function (response) {
            const ctx = document.getElementById("myChartPie").getContext("2d");

            console.log(response.pie.brokersNames)
            console.log(response.pie.brokersColors)
            console.log(response.pie.data)
            const data = {
                labels: response.pie.brokersNames,
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: response.pie.data,
                        backgroundColor: response.pie.brokersColors,
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true,
                            text: "Capital invertido por broker 5 días atrás",
                        },
                    },
                },
            };

            const myChart = new Chart(ctx, config);
        },
        getBrokersPercentajeData: function (response) {
            let brokers = []

            response.brokers.map((broker) => {
                brokers.push({
                    name: broker.name,
                    gainAvg: broker.averange.gain,
                    capitalAvg: broker.averange.capital,
                    percentaje: (response.pie.data[broker.broker_id-1] * 100) / response.stats.totalCapital
                })
            })

            return brokers
        },
        getStats: function (company_id) {
            return new Promise((resolve) => {
                this.UserSupport.getStats({ company_id: company_id }, (response) => {
                    if (response.s == 1) {
                        this.stats = response.stats;
                        this.brokers = this.getBrokersPercentajeData(response);

                        resolve(response);
                    }
                });
            });
        },
    },
    mounted() {
        this.UserSupport = new UserSupport();
        this.getStats().then((response) => {
            this.initChart(response);
            this.initChartPie(response);
        });
    },
}).mount("#app");