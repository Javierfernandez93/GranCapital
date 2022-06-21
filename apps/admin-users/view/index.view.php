<div class="container-fluid py-4" id="app">
    <div class="row">
        
        <div class="col-12">
            <div
                v-if="Object.keys(users).length > 0"
                class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">Usuarios</div>
                        <div class="col-auto"><span class="badge bg-primary">Total de usuarios {{Object.keys(users).length}}</span></div>
                    </div>
                </div>
                <div class="card-header">
                    <input 
                        v-model="query"
                        :autofocus
                        type="text" class="form-control" placeholder="Buscar..."/>
                </div>
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Usuario</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Miembro desde</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users">
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
                                        <span class="badge badge-sm bg-secondary">Inactivo</span>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0">Fecha</p>
                                        <p class="text-xs text-secondary mb-0">{{user.signup_date}}</p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                                <li><button class="dropdown-item" @click="goToActivatePlan(user.user_login_id)">Activar plan</button></li>
                                                <li><hr class="dropdown-divider"></li>
                                                <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
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