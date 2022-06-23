<div class="container-fluid py-4" id="app">
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <i class="bi bi-pie-chart-fill"></i>
                        </div>
                        <div class="col fw-semibold text-dark">
                            <div class="small">Usuarios</div>
                        </div>
                        <div class="col-auto text-end">
                            <div><a href="../../apps/admin-users/add" type="button" class="btn btn-success btn-sm">Añadir usuario</a></div>
                            <div><span class="badge bg-secondary">Total de usuarios {{Object.keys(users).length}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="card-header">
                    <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                </div>
                <div
                    v-if="Object.keys(users).length > 0" 
                    class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th @click="sortData(columns.company_id)" class="text-center c-pointer text-uppercase text-primary text-xs font-weight-bolder opacity-7">
                                        <i class="bi bi-filter-square-fill"></i> <u>ID</u>
                                    </th>
                                    <th 
                                        @click="sortData(columns.names)"
                                        class="text-center c-pointer text-uppercase text-primary text-xs font-weight-bolder opacity-7">
                                        <i class="bi bi-filter-square-fill"></i> <u>Usuario</u>
                                    </th>
                                    <th 
                                        @click="sortData(columns.plan_name)"
                                        class="text-center c-pointer text-uppercase text-primary text-xs font-weight-bolder opacity-7">
                                        <i class="bi bi-filter-square-fill"></i> <u>Estatus</u>
                                    </th>
                                    <th 
                                        @click="sortData(columns.signup_date)"
                                        class="text-center c-pointer text-uppercase text-primary text-xs font-weight-bolder opacity-7">
                                        <i class="bi bi-filter-square-fill"></i> <u>Miembro desde</u>
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users">
                                    <td class="align-middle text-center text-sm">
                                        <p class="font-weight-bold mb-0">{{user.company_id}}</p>
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="user.image" class="avatar avatar-sm me-3" :alt="user.names">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                                <p class="text-xs text-secondary mb-0">{{user.email}}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span v-if="user.catalog_plan_id">
                                            <span class="badge badge-sm bg-primary">
                                                Activo en plan {{user.plan_name}}
                                            </span>
                                            <span v-if="user.additional_profit > 0" class="badge badge-sm bg-danger ms-1">
                                                {{user.additional_profit}}% adicional
                                            </span>
                                        </span>
                                        <span v-else class="badge badge-sm bg-secondary">
                                            Inactivo
                                        </span>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0">Fecha</p>
                                        <p class="text-xs text-secondary mb-0">{{user.signup_date.formatDate()}}</p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                                <li><button class="dropdown-item" @click="goToActivatePlan(user.user_login_id)">Activar plan</button></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else
                    class="card-body">
                    <div class="alert alert-secondary text-white text-center">
                        <div>No tenemos usuarios aún</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>