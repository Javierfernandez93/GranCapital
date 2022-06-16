<div class="row h-100">
	<div class="col-12 col-lg-4 h-100 px-6">
		<div class="row h-100">
			<div class="col-12 align-self-center">
				<div class="row first_step steps">	
					<div class="col-12">
						<div class="row text-center py-4">
							<div class="col-12">
								<h1 class="display-4 text-center mb-3">
						          <t>Registro</t>
						        </h1>
						        
						        <!-- Subheading -->
						        <p class="text-muted text-center mb-5">
						          <t>Ingresa lo que se te pide. (* campos obligatorios)</t>
						        </p>
							</div>
						</div>

						<div class="row mx-auto">
							<div class="col-12">
								<label for="mail"><t>Correo electrónico</t>*</label>
								<div data-form='mail' class="input-group mb-3">
						     		<input type="email" class="form-control" id="mail" data-field="true" data-message="Ingresa un correo electrónico válido" data-type="mail"  placeholder="name@address.com" >
						     		
						     		<div class="input-group-append d-none" id="email-status">
								    	<span class="input-group-text bg-info text-white"></span>
								  	</div>
								</div>
								
								<label for="password"><t>Contraseña</t> *</label>
								<div data-form='password' class="input-group mb-3">
						     		<input type="password" class="form-control" id="password" data-field="true" data-message="Ingresa una contraseña" data-type="text">
						     		<div class="input-group-append">
								    	<button class="btn btn-outline-primary" type="button" onclick="togglePassword(this)">Mostrar contraseña</button>
								  	</div>
								</div>
								
								<label for="reafirm_password"><t>Repita su contraseña</t> *</label>
								<div data-form='reafirm_password' class="input-group mb-5">
						     		<input type="password" class="form-control" id="reafirm_password" data-message="Repite tu contraseña" data-type="text">
						     		<div class="input-group-append">
								    	<button class="btn btn-outline-primary" type="button" onclick="togglePassword(this)">Mostrar contraseña</button>
								  	</div>
								</div>

								<div class="row text-center">
									<div class="col-12">
										<button class="btn btn-lg btn-block btn-primary mb-3" onclick="stepOne(1)"> <t>Siguiente</t></button>				

										<p>
								            <small class="text-muted text-center">
								              ¿Ya tienes cuenta? <a href="../../apps/login">Ingresa a tu cuenta aquí</a>.
								            </small>
							          	</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row second_step steps d-none">	
					<div class="col-12">
						<div class="row text-center py-4">
							<div class="col-12">
								<h1 class="display-4 text-center mb-3">
						          <t>Registro</t>
						        </h1>
						        
						        <!-- Subheading -->
						        <p class="text-muted text-center mb-5">
						          <t>Ingresa lo que se te pide. (* campos obligatorios)</t>
						        </p>
							</div>
						</div>

						<div class="row">
							<div class="col-12">
								<div data-form='name' class="form-group">
									<label for="name"><t>Nombre</t> *</label>
									<input type="text" class="form-control" id="name" data-field="true" data-message="Ingresa tu nombre" data-type="text">
								</div>

								<div data-form='last_name' class="form-group">
									<label for="last_name"><t>Apellido paterno</t> *</label>
									<input type="text" class="form-control" id="last_name" data-field="true" data-message="Ingresa tu apellido" data-type="text">
								</div>

								<div data-form='second_last_name' class="form-group">
									<label for="second_last_name"><t>Apellido materno</t></label>
									<input type="text" class="form-control" id="second_last_name" value="x" 
									data-field="true" data-message="Ingresa tu apellido materno" data-type="text">
								</div>

								<div data-form='phone' class="form-group">
									<label for="phone"><t>Teléfono fijo</t></label>
									<input type="number" class="form-control" id="phone"data-field="true" data-message="Ingresa tu número de teléfono" data-minlenght="10" data-type="number">
								</div>

								<div data-form='cellular' class="form-group">
									<label for="cellular"><t>Celular</t></label>
									<input type="number" class="form-control" id="cellular" data-field="true"  data-message="Ingresa tu número de celular"  data-minlenght="10" data-type="number">
								</div>

								<div data-form='sex' class="form-group">
									<label for="cellular"><t>Género</t> *</label>
									<div class="radio">
										<label>
											<input type="radio" name="sex" id="male" value="male" checked>
											<i class="fa fa-male"></i> <t>Masculino</t>
										</label>
									</div>
									<div class="radio">
										<label>
											<input type="radio" name="sex" id="female" value="female">
											<i class="fa fa-female"></i> <t>Femenino</t>
										</label>
									</div>

									<div class="row text-center">
										<div class="col-12">
											<button class="btn btn-lg btn-block btn-primary mb-3" onclick="stepOne(2)"> <t>Siguiente</t></button>				
										</div>
									</div>								
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row third_step steps d-none">
					<div class="col-12">
						<div class="row text-center py-4">
							<div class="col-12">
								<h1 class="display-4 text-center mb-3">
						          <t>Registro</t>
						        </h1>
						        
						        <!-- Subheading -->
						        <p class="text-muted text-center mb-5">
						          <t>Ingresa lo que se te pide. (* campos obligatorios)</t>
						        </p>
							</div>
						</div>

						<div data-form='sponsor_id' class="form-group box-typehead">
							<label for="sponsor_id"><t>ID de patrocinador</t></label>
				      		<?php if(!$sponsor_id) { ?>
				     		    <input type="text" class="box-autocomplete-input form-control" id="sponsor_id" data-message="Ingresa un ID de patrocinador válido" data-type="text" data-field="true">
				     		    
								<div  class="text-center" id="sponsor_name"></div>
				      		<?php } else { ?>
				     		    <input type="text" class="box-autocomplete-input form-control" disabled value="<?php echo $sponsor_id?>" id="sponsor_id" data-field="true" data-message="Ingresa tu patrocinador" data-type="number">
				      		<?php } ?>
				     	</div>

						<div class="text-center box-info-colocation">
					    	<div class="text-center">
					    		<div class="custom-control custom-checkbox">
								  <input type="checkbox" class="custom-control-input" id="terms">
								  <label class="custom-control-label" for="terms"><t>Acepto los términos y condiciones y el </t><t>contrato de afiliado independiente</t></label>
								</div>
							</div>
				    	</div>	
						
						<div class="row text-center">
							<div class="col-12">
								<button class="btn btn-lg btn-block btn-primary mb-3" onclick="createNewUser()"> <t>Crear cuenta</t></button>				
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>