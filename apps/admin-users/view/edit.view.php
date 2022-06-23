<div class="container-fluid py-4" id="app">
    <div class="card">
        <div class="card-header pb-0 px-3"> 
            <div class="small">Editar usuario</div>
            <h6 class="text-uppercase text-primary">{{user.names}}</h6>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label>Usuario</label>
                <input 
                    :autofocus="true"
                    :class="user.names ? 'is-valid' : ''"
                    @keydown.enter.exact.prevent="$refs.email.focus()"
                    v-model="user.names"
                    ref="names"
                    type="text" class="form-control" placeholder="Nombre(s)">
            </div>
            <div class="mb-3">
                <label>Correo</label>
                <input 
                    v-model="user.email"
                    :class="user.email ? 'is-valid' : ''"
                    @keydown.enter.exact.prevent="$refs.password.focus()"
                    ref="email"
                    type="text" class="form-control" placeholder="Email">
            </div>
            <div class="mb-3">
                <label>Contraseña</label>
                <input 
                    v-model="user.password"
                    :class="user.password ? 'is-valid' : ''"
                    @keydown.enter.exact.prevent="$refs.phone.focus()"
                    ref="password"
                    type="text" class="form-control" placeholder="Password">
            </div>
            <div class="mb-3">
                <label>Teléfono</label>
                <input 
                    v-model="user.phone"
                    :class="user.phone ? 'is-valid' : ''"
                    @keydown.enter.exact.prevent="updateUser"
                    ref="phone"
                    type="text" class="form-control" placeholder="Número">
            </div>
        
            <button 
                :disabled="!brokerComplete"
                ref="button"
                type="submit" class="btn btn-primary" @click="updateUser">Actualizar usuario</button>
        </div>
    </div>
</div>