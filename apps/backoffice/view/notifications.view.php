<div class="container-fluid py-4" id="app">
    <div v-if="notifications">
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
</div>