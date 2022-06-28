<div class="container-fluid py-4" id="app">
	<div class="row">
		<div class="col-6">
			<div class="card bg-secondary">
				<div class="card-header">
					<span v-if="data.result">
						Rentabilidad $ {{data.result.numberFormat()}}
					</span>
				</div>
				<div class="card-body">
					<div class="row mb-3">
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.balance" type="number" class="form-control" placeholder="0">
								<label>Balance</label>
							</div>
						</div>
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.duration" type="number" class="form-control" placeholder="0">
								<label>Duración</label>
							</div>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.roi" type="number" class="form-control" placeholder="0">
								<label>Roi</label>
							</div>
						</div>
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.withdraws" type="number" class="form-control" placeholder="0">
								<label>Retiros</label>
							</div>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.fee" type="number" class="form-control" placeholder="0">
								<label>Impuestos anuales (opcional) </label>
							</div>
						</div>
						<div class="col-6">
							<div class="form-floating">
								<input v-model="data.inflation" type="number" class="form-control" placeholder="0">
								<label>Inflación anual (opcional) </label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="card">
				<div class="card-body">
					<canvas id="myChart" width="400" height="400"></canvas>
				</div>
			</div>
		</div>
	</div>
</div>