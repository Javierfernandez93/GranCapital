<div class="row d-flex justify-content-center align-items-center vh-100" id="app">
    <div class="col-12 col-xl-6 img-bg h-100" style="background-image: url('../../src/img/bg.jpg')">
    </div>
    <div class="col-12 col-xl-6">
        <div class="row justify-content-center text-center">
            <div class="col-11 col-xl-6">
                <div class="card shadow-lg rounded p-4">
                    <div class="card-header bg-transparent border-0">
                        <div class="fs-3">Iniciar sesión</div>
                    </div>
                    <div class="card-body">

                        <div class="input-group mb-3">
                            <input 
                                :class="isValidMail ? 'is-valid' : ''"
                                type="email" ref="email" v-model="user.email" class="form-control" @keydown.enter.exact.prevent="$refs.password.focus()" placeholder="usuario" aria-label="usuario" aria-describedby="basic-addon1">
                        </div>

                        <div class="input-group mb-3">
                            <input :type="fieldPasswordType" ref="password" @keydown.enter.exact.prevent="doLogin" v-model="user.password" class="form-control" placeholder="contraseña" aria-label="contraseña" aria-describedby="basic-addon1">
                            <button class="btn btn-primary" type="button" id="button-addon2" @click="toggleFieldPasswordType">
                                <i v-if="fieldPasswordType == 'password'" class="bi bi-eye"></i>
                                <i v-else class="bi bi-eye-slash"></i>
                            </button>
                        </div>

                        <div class="text-end">
                            <a href="../../apps/login/forgotPassword">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-0">
                        
                        <div v-show="feedback" class="alert alert-warning alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <button :disabled="!userComplete" class="btn btn-primary w-100" @click="doLogin" id="button">
                            Ingresar
                        </button>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</div>