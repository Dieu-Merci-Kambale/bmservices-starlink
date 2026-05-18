<?php
// api/webhook.php
// Ce script est appelé par le serveur de PawaPay/FlexPay quand le client a tapé son code PIN.
require_once '../config.php';

// Lire les données envoyées par l'agrégateur
$input = file_get_contents('php://input');
$webhookData = json_decode($input, true);

// Vérifier la signature/sécurité (très important !)
// (Dépend de la documentation de votre agrégateur)

if ($webhookData && isset($webhookData['status'])) {
    $transactionId = $webhookData['transactionId'] ?? 'Inconnu';
    
    if ($webhookData['status'] === 'COMPLETED') {
        // Le paiement a réussi !
        // -> Enregistrer dans la base de données
        // -> Envoyer un email de confirmation au client
        // -> Mettre à jour le statut de la commande
        
        file_put_contents('../log_paiements.txt', date('Y-m-d H:i:s') . " - Succès TXN: $transactionId\n", FILE_APPEND);
    } else {
        // Le paiement a échoué (fonds insuffisants, annulation...)
        file_put_contents('../log_paiements.txt', date('Y-m-d H:i:s') . " - Échec TXN: $transactionId\n", FILE_APPEND);
    }
}

// Toujours répondre 200 OK à l'agrégateur pour qu'il sache qu'on a bien reçu le message.
http_response_code(200);
echo "Webhook reçu";
