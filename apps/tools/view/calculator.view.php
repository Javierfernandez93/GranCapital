<div class="container-fluid py-4" id="app">
	<div class="row justify-content-center">
		<div class="col-12 col-lg-6">
			<div class="card bg-gradient-dark mb-3">
				<div class="card-header bg-transparent text-white">
					<h5 class="text-white">Calculadora de ROI</h5>
				</div>
				<div class="card-body">
					<div class="row mb-3">
						<div class="col-4">
							<div class="form-floating">
								<input v-model="data.capital" :autofocus="true" type="number" class="form-control" placeholder="0">
								<label>Balance</label>
							</div>
						</div>
						<div class="col-4">
							<div class="form-floating">
								<input v-model="data.duration" type="number" class="form-control" placeholder="0">
								<label>Duración (periodo)</label>
							</div>
						</div>
						<div class="col-4">
							<div class="form-floating">
								<input v-model="data.roi" type="number" class="form-control" placeholder="0">
								<label>ROI</label>
							</div>
						</div>
						<div class="col-6 d-none">
							<div class="form-floating">
								<input v-model="data.withdraws" type="number" class="form-control" placeholder="0">
								<label>Retiros</label>
							</div>
						</div>
					</div>

					<div class="row mb-3 d-none">
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

			<div class="row mb-3">
				<div class="col-12">
					<div class="card">
						<div class="table-responsive p-0">
							<table class="table align-items-center mb-0">
								<thead>
									<tr class="align-items-center">
										<th class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
											Periodo
										</th>
										<th class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
											Capital
										</th>
										<th class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
											Utilidad
										</th>
										<th class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
											Total
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="result in results">
										<td class="align-middle text-center text-sm">
											<p class="font-weight-bold mb-0">{{result.year}}</p>
										</td>
										<td class="align-middle text-center text-sm">
											<p class="font-weight-bold mb-0">$ {{data.capital.numberFormat(2)}}</p>
										</td>
										<td class="align-middle text-center text-sm">
											<p class="font-weight-bold mb-0">$ {{result.gain.numberFormat(2)}}</p>
										</td>
										<td class="align-middle text-center text-sm">
											<p class="font-weight-bold mb-0">$ {{result.result.numberFormat(2)}}</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="row text-center">
				<div class="col-6">
					<div class="card">
						<div class="card-body">
							<div>Capital inicial</div>
							<h5 v-if="data.capital">$ {{ data.capital.numberFormat(2) }}</h5>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="card">
						<div class="card-body">
							<div>Capital final</div>
							<h5 v-if="data.capitalFinal">
								$ {{ data.capitalFinal.numberFormat(2) }}
								<span class="text-success text-sm font-weight-bolder"> + {{ data.profit.numberFormat(0)}} % </span>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-6 d-none">
			<div class="card">
				<div class="card-body">
					<canvas id="myChart" width="400" height="400"></canvas>
				</div>
			</div>
		</div>
	</div>
</div>