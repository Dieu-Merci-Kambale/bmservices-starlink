export default function handler(req, res) {
  // N'accepter que les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  const { amount, product, phone } = req.body;

  // Validation de base
  if (!amount || amount <= 0 || !product || !phone) {
    return res.status(400).json({ error: 'Veuillez fournir un montant, un produit et un numéro de téléphone valides.' });
  }

  // MOCK (Simulation pour le développement et le déploiement sur Vercel) :
  // On fait semblant que l'API a bien reçu la demande
  const transactionId = 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  const mockResponse = {
    status: 'success',
    message: `Demande envoyée ! Veuillez consulter votre téléphone (${phone}) pour valider le paiement de ${amount}$ pour le produit : ${product}.`,
    transactionId: transactionId
  };

  // Pause artificielle pour simuler le temps réseau
  setTimeout(() => {
    res.status(200).json(mockResponse);
  }, 1000);
}
