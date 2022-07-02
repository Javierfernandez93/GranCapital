<div class="container-fluid py-4" id="app">
    <div class="row">        
        <div class="col-12 col-xl-4" v-if="user">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="fs-5 fw-semibold mb-3">
                        Usuario
                    </div>
                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">ID</div>
                        <div>{{user.company_id}}</div>
                    </div>
                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">Nombre</div>
                        <div>{{user.names}}</div>
                    </div>

                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">Correo electrónico</div>
                        <div>{{user.email}}</div>
                    </div>

                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">Miembro desde</div>
                        <div>{{user.signup_date.formatDate()}}</div>
                    </div>

                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">Teléfono</div>
                        <div>{{user.phone}}</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <label>Fecha inicio</label>
                        <input 
                            v-model="runComission.start_date"
                            type="date" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Fecha fin</label>
                        <input 
                            v-model="runComission.end_date"
                            type="date" class="form-control">
                    </div>
                    <button 
                        @click="runOldComissions(user.company_id)"
                        ref="button"
                        class="btn btn-primary" type="button">Correr ganancias</button>
                </div>

                <ul 
                    v-if="responses.length > 0"
                    class="list-group">
                    <li v-for="response in responses" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <span v-if="response.s == 1">
                                    <i class="bi bi-bookmark-check text-success"></i>
                                </span>
                                <span v-else>
                                    <i class="bi bi-exclamation text-danger"></i>
                                </span>
                            </div>
                            <div class="col">
                                <div class="small fw-semibold text-muted">
                                    {{response.day}}
                                </div>
                                {{response.r}}
                            </div>
                            <div class="col-auto text-end small text-muted">
                                <div>
                                    Time
                                </div>
                                <div>
                                    <span v-if="response.time">
                                        {{response.time.numberFormat(2)}} segs.
                                    </span>
                                    <span v-else>
                                        N/A 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 col-xl-8">
            <div class="card">
                <div class="card-body">
                    <div class="fs-5 fw-semibold mb-3">
                        Activación de usuario
                    </div>
                    <div class="mb-3">
                        <label>Plan</label>
                        <div
                            v-if="selectedPlan" 
                            class="fw-semibold text-primary">
                            <u>
                                PLAN $ {{selectedPlan.name.numberFormat(0)}} - % {{selectedPlan.profit}} Profit
                            </u>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label>Monto invertido</label>
                        <input 
                            @keydown.enter.exact.prevent="$refs.sponsor_profit.focus()"
                            v-model="user.ammount"
                            type="text" class="form-control" placeholder="$0" aria-label="$0" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="mb-3">
                        <label>Profit para patrocinador</label>
                        <input 
                            @keydown.enter.exact.prevent="$refs.aditional_profit.focus()"
                            v-model="user.sponsor_profit"
                            ref="sponsor_profit"
                            type="text" class="form-control" placeholder="0%" aria-label="0%" aria-describedby="basic-addon1">
                    </div>

                    <div class="mb-3">
                        <label>Profit adicional</label>
                        <input 
                            @keydown.enter.exact.prevent="updatePlan"
                            v-model="user.additional_profit"
                            ref="aditional_profit"
                            type="text" class="form-control" placeholder="0%" aria-label="0%" aria-describedby="basic-addon1">
                    </div>
                    

                    <div
                        v-if="user.additional_profit > 0" 
                        class="alert alert-secondary text-white text-center fw-semibold">

                        <strong>Aviso</strong> El profit final para éste usuario:
                        <div>PLAN $ {{selectedPlan.name.numberFormat(0)}} = {{selectedPlan.profit}}% + </div>
                        <div>Profit adicional = {{user.additional_profit}}%</div>
                        <div>Profit sponsor = {{user.sponsor_profit}}%</div>
                        <div class="fw-semibold">Total = {{parseFloat(user.additional_profit) + parseFloat(selectedPlan.profit) + parseFloat(user.sponsor_profit)}}% </div>
                    </div>
                    <button 
                        @click="updatePlan"
                        ref="button"
                        class="btn btn-primary" type="button">Guardar/Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</div>