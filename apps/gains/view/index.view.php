<div class="container-fluid py-4" id="app">
    <profit-viewer></profit-viewer>
    
    <div class="row">
        <div class="col-12">
            <div
                v-if="gains.profits.length > 0"
                class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">Profits</div>
                        <div class="col-auto"><span class="badge bg-primary">Total de ganancias {{gains.profits.length}}</span></div>
                    </div>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr class="text-center">
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Monto</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="profit in gains.profits" class="text-center">
                                    <td>
                                        <p class="text-xs text-secondary mb-0">{{profit.create_date}}</p>
                                    </td>
                                    <td>
                                        <p class="fw-semibold">$ {{profit.profit}}</p>
                                    </td>
                                    <td>
                                        <h6 class="mb-0 text-sm">{{profit.name}}</h6>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">Liberada</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="text-center">
                                    <td>Total</td>
                                    <td><p class="fw-semibold">$ {{gains.total}}</p></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="alert alert-secondary text-white text-center">
                    <div>No tenemos información sobre tus ganancias.</div>
                </div>
            </div>
        </div>
    </div>
</div>