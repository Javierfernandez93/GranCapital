<div class="container-fluid py-4" id="app">
    <div v-if="notifications.length > 0">
        <div v-for="notification in notifications"
            class="card mb-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <i v-html="notification.extra"></i>
                    </div>
                    <div class="col">
                        <div class="fw-semibold text-dark small">{{notification.kind}}</div>
                        <div>{{notification.message}}</div>
                    </div>
                    <div class="col-auto">
                        <span class="badge bg-primary">{{notification.create_date}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-secondary text-center text-white">
            No tienes notificaciones aún. Vuelve más tarde
        </div>
    </div>
</div>