<div class="row d-flex justify-content-center align-items-center vh-100" id="app">
    <div class="col-12 col-xl-6 img-bg h-100" style="background-image: url('../../src/img/bg.jpg')">
    </div>
    <div class="col-12 col-xl-6">
        <div class="row justify-content-center text-center">
            <div class="col-11 col-xl-7">
                <div class="card text-start card-plain">
                    <div class="card-header pb-0 text-left bg-transparent">
                        <h3 class="font-weight-bolder text-info text-gradient">Bienvenido a Gran Capital</h3>
                        <p class="mb-0">Ingresa tus datos para unirte</p>
                    </div>
                    <div class="card-body">
                        <label>Nombre</label>
                        <div class="mb-3">
                            <input :autofocus="true" type="text" ref="names" v-model="user.names" class="form-control" @keydown.enter.exact.prevent="$refs.phone.focus()" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1">
                        </div>

                        <label>Teléfono</label>
						<div class="mb-3">
                            <input type="text" ref="phone" v-model="user.phone" class="form-control" @keydown.enter.exact.prevent="$refs.email.focus()" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1">
                        </div>
                        
                        <label>Correo electrónico</label>
						<div class="mb-3">
                            <input 
                                :class="isValidMail ? 'is-valid' : ''"
                                type="email" ref="email" v-model="user.email" class="form-control" @keydown.enter.exact.prevent="$refs.password.focus()" placeholder="correo electrónico" aria-label="correo electrónico" aria-describedby="basic-addon1">
                        </div>

                        <label>Contraseña</label>
                        <div class="mb-3">
                            <input :type="fieldPasswordType" ref="password" @keydown.enter.exact.prevent="doSignup" v-model="user.password" class="form-control" placeholder="contraseña" aria-label="contraseña" aria-describedby="basic-addon1">
                            <button class="btn btn-primary" type="button" id="button-addon2" @click="toggleFieldPasswordType">
                                <i v-if="fieldPasswordType == 'password'" class="bi bi-eye"></i>
                                <i v-else class="bi bi-eye-slash"></i>
                            </button>
                        </div>
                        <div v-show="feedback" class="alert alert-warning alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
    
                        <button :disabled="!userComplete" class="btn bg-gradient-info w-100 mt-4 mb-0" @click="doSignup" id="button">
                            Crear mi cuenta
                        </button>

                    </div>    
                    <div class="card-footer text-center pt-0 px-lg-2 px-1">
                        <p class="mb-4 text-sm mx-auto">
                            ¿Ya tienes una cuenta?
                            <a href="../../apps/login" class="text-info text-gradient font-weight-bold">Ingresa aquí</a>
                        </p>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</div>