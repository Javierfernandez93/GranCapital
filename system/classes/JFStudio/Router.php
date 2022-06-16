<?php

namespace JFStudio;

class Router {
    const Backoffice = 1;
    const Profile = 2;
    const Gains = 3;
    const Referrals = 4;

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
            default: 
                return 'Sin nombre';
        }
    }
}