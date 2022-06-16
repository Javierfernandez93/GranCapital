<div class="row d-flex justify-content-center align-items-center vh-100" id="app">
    <div class="col-12 col-xl-6 img-bg h-100 order-1" style="background-image: url('../../src/img/bg.jpg')">
    </div>
    <div class="col-12 col-xl-6">
        <div class="row justify-content-center text-center">
            <div class="col-11 col-xl-6">
                <div class="card border-0 p-4">
                    <div class="card-header bg-transparent border-0">
                        <div class="fs-4 fw-bold">Recuperar contraseña</div>
                        <div class="text-muted">Ingresa tus datos para continuar</div>
                    </div>
                    <div class="card-body">

                        <div class="input-group mb-3">
                            <input 
                                :autofocus="true"
                                :class="isValidMail ? 'is-valid' : ''"
                                type="email" ref="email" v-model="email" class="form-control form-control-lg bg-light" @keydown.enter.exact.prevent="recoverPassword" placeholder="correo electronico" aria-label="correo electronico" aria-describedby="basic-addon1">
                        </div>

                        <div class="text-end">
                            <a href="../../apps/login/">¿Quieres ingresar a tu cuenta?</a>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-0">
                        
                        <div v-show="feedback" class="alert alert-warning alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <button :disabled="!isValidMail" class="btn btn-lg btn-primary w-100" @click="recoverPassword" id="button">
                            Recuperar contraseña
                        </button>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</div>