<div class="container-fluid py-4" id="app">
    <div class="row">        
        <div class="col-12 col-xl-4" v-if="user">
            <div class="card">
                <div class="card-body">
                    <div class="fs-5 fw-semibold mb-3">
                        Usuario
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
                        <div>{{user.signup_date}}</div>
                    </div>

                    <div class="mb-3">
                        <div class="text-uppercase text-body text-xs font-weight-bolder">Teléfono</div>
                        <div>{{user.phone}}</div>
                    </div>
                </div>
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
                        <select 
                            style="height:41px"
                            class="form-control" v-model="user.catalog_plan_id">
                            <option v-for="plan in plans" v-bind:value="plan.catalog_plan_id">
                                PLAN {{ plan.name }} - Profit {{ plan.profit }}%
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Profit adicional</label>
                        <input 
                            @keydown.enter.exact.prevent="updatePlan"
                            v-model="user.additional_profit"
                            type="text" class="form-control" placeholder="0%" aria-label="0%" aria-describedby="basic-addon1">
                    </div>

                    <div
                        v-if="user.additional_profit > 0" 
                        class="alert alert-secondary text-white text-center fw-semibold">

                        <strong>Aviso</strong> El profit final para éste usuario:
                        <div>PLAN {{selectedPlan.name}} = {{selectedPlan.profit}}% + </div>
                        <div>Profit adicional = {{user.additional_profit}}%</div>
                        <div class="fw-semibold">Total = {{parseFloat(user.additional_profit) + parseFloat(selectedPlan.profit)}}% </div>
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