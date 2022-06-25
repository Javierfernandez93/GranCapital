import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            transactions : {},
            columns: { // 0 DESC , 1 ASC 
                user_support_id : {
                    name: 'user_support_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    watch : {
    },
    methods: {
        sortData: function (column) {
            this.administrators.sort((a,b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if(column.alphabetically)
                {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        getUsersTransactions : function() {
            this.UserSupport.getUsersTransactions({},(response)=>{
                if(response.s == 1)
                {
                    this.transactions = response.transactions
                }
            })
        },
    },
    mounted() 
    {
        this.UserSupport = new UserSupport
        this.getUsersTransactions()
    },
}).mount('#app')