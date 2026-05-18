<?php
// config.php
// Ce fichier ne doit JAMAIS être partagé publiquement ou inclus dans le code côté client (JS).

define('PAWAPAY_API_URL', 'https://api.pawapay.io/v1/'); // Exemple d'URL (Sandbox ou Prod)
define('PAWAPAY_API_KEY', 'votre_cle_api_secrete_ici'); // Remplacez par votre vraie clé
define('WEBHOOK_SECRET', 'votre_secret_webhook_ici'); // Pour vérifier que c'est bien PawaPay qui vous parle

// Autres configurations (Base de données, etc.)
// define('DB_HOST', 'localhost');
// define('DB_USER', 'root');
// define('DB_PASS', '');
// define('DB_NAME', 'bmservices');
