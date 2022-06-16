<div class="container-fluid py-4" id="app">
    <div class="row">
        <div class="col-12">
            <div
                v-if="referrals.length > 0"
                class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">Afiliados</div>
                        <div class="col-auto"><span class="badge bg-primary">Total de afiliados {{referrals.length}}</span></div>
                    </div>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Usuario</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Miembro desde</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="referral in referrals">
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="referral.image" class="avatar avatar-sm me-3" :alt="referral.names">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{referral.names}}</h6>
                                                <p class="text-xs text-secondary mb-0">{{referral.email}}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">Manager</p>
                                        <p class="text-xs text-secondary mb-0">Organization</p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">Online</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>