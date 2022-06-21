import { User } from '../../src/js/user.module.js'   

const ProfitViewer = {
    name : 'profit-viewer',
    props : [],
    emits : [],
    data() {
        return {
            User : null,
            gainStats : {
                investment : {
                    total: 0,
                    percentaje : 0
                },
                referral : {
                    total : 0,
                    percentaje : 0
                },
                newReferral : 0,
                totalReferral : 0,
            }
        }
    },
    watch : {
        
    },
    methods: {
        getProfitStats : function() {
            this.User.getProfitStats({},(response)=>{
                if(response.s == 1)
                {
                    Object.assign(this.gainStats,response.gainStats)
                }
            })
        }
    },
    updated() {
    },
    mounted() 
    {   
        this.User = new User

        this.getProfitStats()
    },
    template : `
        <div class="row mb-4">
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Ganancias por inversión</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        $ {{gainStats.investment.total}}
                                        <span v-if="gainStats.investment.percentaje >= 0" class="text-success text-sm font-weight-bolder">
                                            +{{gainStats.investment.percentaje}}%
                                        </span>
                                        <span v-else class="text-danger text-sm font-weight-bolder">
                                            -{{gainStats.investment.percentaje}}%
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Ganancias por referidos</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        $ {{gainStats.referral.percentaje}}
                                        <span v-if="gainStats.referral.percentaje >= 0" class="text-success text-sm font-weight-bolder">
                                            +{{gainStats.referral.percentaje}}%
                                        </span>
                                        <span v-else class="text-danger text-sm font-weight-bolder">
                                            -{{gainStats.referral.percentaje}}%
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Nuevos referidos</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        +{{gainStats.newReferral}}
                                        <span class="d-none text-danger text-sm font-weight-bolder">-2%</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Total Referidos</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        {{gainStats.totalReferral}}
                                        <span class="d-none text-success text-sm font-weight-bolder">+5%</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { ProfitViewer } 