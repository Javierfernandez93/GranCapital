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
            default: 
                return 'Sin nombre';
        }
    }
}