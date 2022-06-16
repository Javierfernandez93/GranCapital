<div class="row d-flex justify-content-center align-items-center h-100">
  <div class="col-11 col-md-4 col-xl-3">
    <div class="card">
      <div class="card-header text-center lead bg-white border-0">
        <img src="../../src/img/logo-vect.png" class="img-fluid">
      </div>

      <div class="card-body">
        <div class="form-floating mb-3">
          <input type="email" autofocus class="form-control" onpaste="setEmail(this,13,'#password')" onkeyup="setEmail(this,event,'#password')" id="email" placeholder="name@example.com">
          <label for="email">Correo electrónico</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" onpaste="setPassword(this,13,'#login')" onkeyup="setPassword(this,event,'#login')" id="password" placeholder="Password">
          <label for="password">Contraseña</label>
        </div>
      </div>

      <div class="card-footer d-flex justify-content-center bg-white border-0">
        <button class="btn btn-primary w-100 btn-block btn-lg badge-pill" id="login" disabled onclick="login(this)">Ingresar</button>
      </div>
    </div>        
  </div>
</div>