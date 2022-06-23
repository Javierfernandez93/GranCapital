<?php

namespace JFStudio;

class Router {
    const Backoffice = 1;
    const Profile = 2;
    const Gains = 3;
    const Referrals = 4;
    const Signup = 5;
    const Login = 6;
    const RecoverPassword = 7;
    const NewPassword = 8;
    const Notifications = 15;
    const Plans = 16;
    const TradingView = 22;

    /* admin */
    const AdminUsers = 9;
    const AdminActivations = 10;
    const AdminAdministrators = 11;
    const AdminBrokers = 12;
    const AdminLogin = 13;
    const AdmiActivation = 14;
    const AdminBrokersEdit = 16;
    const AdminBrokersAdd = 17;
    const AdminBrokersCapitals = 18;
    const AdminUserEdit = 19;
    const AdminUserAdd = 20;
    const AdminAdministratorsAdd = 21;
    const AdminAdministratorsEdit = 21;

    static function getName(int $route = null)
    {
        switch ($route) 
        {
            case self::Backoffice:
                return 'Oficina virtual';
            case self::Profile:
                return 'Perfil';
            case self::Gains:
                return 'Ganancias';
            case self::Referrals:
                return 'Referidos';
            case self::Signup:
                return 'Regístrate';
            case self::Login:
                return 'Iniciar sesión';
            case self::RecoverPassword:
                return 'Recuperar contraseña';
            case self::NewPassword:
                return 'Cambiar contraseña';
            case self::Plans:
                return 'Planes';
            case self::Notifications:
                return 'Notificaciones';
            case self::TradingView:
                return 'Visualización de terminal';
            case self::AdminUsers:
                return 'Usuarios';
            case self::AdminUserEdit:
                return 'Editar usuario';
            case self::AdminUserAdd:
                return 'Añadir usuario';
            case self::AdminActivations:
                return 'Activaciones';
            case self::AdminAdministrators:
                return 'Administradores';
            case self::AdminAdministratorsAdd:
                return 'Añadir administrador';
            case self::AdminAdministratorsEdit:
                return 'Editar administrador';
            case self::AdminBrokers:
                return 'Brokers';
            case self::AdminBrokersEdit:
                return 'Editar broker';
            case self::AdminBrokersAdd:
                return 'Añadir broker';
            case self::AdminBrokersAdd:
                return 'Capital invertido';
            case self::AdminLogin:
                return 'Iniciar sesión admin';
            case self::AdmiActivation:
                return 'Activar en plan';
            default: 
                return 'Sin nombre';
        }
    }
}