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

    /* admin */
    const AdminUsers = 9;
    const AdminActivations = 10;
    const AdminAdministrators = 11;
    const AdminBrokers = 12;
    const AdminLogin = 13;
    const AdmiActivation = 14;

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
            case self::AdminUsers:
                return 'Usuarios';
            case self::AdminActivations:
                return 'Activaciones';
            case self::AdminAdministrators:
                return 'Administradores';
            case self::AdminBrokers:
                return 'Brokers';
            case self::AdminLogin:
                return 'Iniciar sesión admin';
            case self::AdmiActivation:
                return 'Activar en plan';
            default: 
                return 'Sin nombre';
        }
    }
}