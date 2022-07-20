import { UserSupport } from '../../src/js/userSupport.module.js?t=5'

/* vue */
import { StatsViewer } from '../../src/js/adminStatsViewer.vue.js'

Vue.createApp({
    components: {
        StatsViewer
    },
    data() {
        return {
            UserSupport: null,
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        
    },
    mounted() {
        this.UserSupport = new UserSupport
    },
}).mount('#app')