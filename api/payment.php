<?php
// api/payment.php
header('Content-Type: application/json');
require_once '../config.php';

// N'accepter que les requêtes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée. Utilisez POST.']);
    exit;
}

// Lire les données JSON envoyées par JavaScript
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$product = isset($data['product']) ? htmlspecialchars($data['product']) : '';
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : '';

// Validation de base
if ($amount <= 0 || empty($product) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Veuillez fournir un montant, un produit et un numéro de téléphone valides.']);
    exit;
}

// === ICI COMMENCE L'INTÉGRATION DE L'API DE PAIEMENT ===
// Exemple théorique pour PawaPay ou FlexPay :
/*
$payload = [
    'amount' => $amount,
    'currency' => 'USD', // ou CDF
    'msisdn' => $phone, // Le numéro de téléphone du client
    'description' => "Achat " . $product,
    'referenceId' => uniqid('BM_')
];

$ch = curl_init(PAWAPAY_API_URL . 'payments');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . PAWAPAY_API_KEY,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
$response = curl_exec($ch);
curl_close($ch);
// Analyser $response pour voir si le "Push" USSD a été envoyé au client.
*/

// MOCK (Simulation pour le développement local) :
// On fait semblant que l'API a bien reçu la demande
$mockResponse = [
    'status' => 'success',
    'message' => "Demande envoyée ! Veuillez consulter votre téléphone ($phone) pour valider le paiement de $amount$ pour le produit : $product.",
    'transactionId' => uniqid('TXN_')
];

// Pause artificielle pour simuler le temps réseau
sleep(1); 

echo json_encode($mockResponse);
