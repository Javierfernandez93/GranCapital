<div class="container-fluid py-4" id="app">
    <div class="row">
        <div class="col-12">
            <div
                v-if="Object.keys(brokers).length > 0"
                class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">Brokers</div>
                        <div class="col-auto"><span class="badge bg-primary">Total de brokers {{Object.keys(brokers).length}}</span></div>
                    </div>
                </div>
                <div class="card-header pb-0">
                    <input 
                        :autofocus="true"
                        v-model="query"
                        type="text" class="form-control" placeholder="Buscar..."/>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Broker</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Monto invertido</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">% portafolio</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ganancia bruta</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fee</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ganancia neta</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">% ganado</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nuevo saldo</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="broker in brokers"
                                    class="text-center">
                                    <td>
                                        <h6 class="mb-0 text-sm">{{broker.name}}</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <h6 class="mb-0 text-sm">$ {{broker.capital}} </h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0 text-sm">{{broker.portfolio}} %</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <h6 class="mb-0 text-sm">$ {{broker.gain}}<h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0 text-sm">{{broker.fee}}</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <h6 class="mb-0 text-sm">$ {{broker.real_gain}} </h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0 text-sm">{{broker.percentaje_gain}}</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <h6 class="mb-0 text-sm">{{broker.new_capital}}</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Ver montos invertidos</button></li>
                                                <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                                <li><hr class="dropdown-divider"></li>
                                                <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                    
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr class="text-center">
                                    <td></td>
                                    <td class="align-middle fw-semibold text-center">
                                        $ {{totals.capital}}
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        {{totals.portfolio}} %
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        $ {{totals.gain}}
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        {{totals.fee}} %
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        $ {{totals.real_gain.numberFormat()}}
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        {{totals.percentaje_gain}}%
                                    </td>
                                    <td class="align-middle fw-semibold text-center">
                                        $ {{totals.new_capital}}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="alert alert-secondary text-white text-center">
                    <div>No tenemos usuarios aún</div>
                </div>
            </div>
        </div>
    </div>
</div>