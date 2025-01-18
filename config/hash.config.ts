/** Global configuration for amount of saltRounds on hashes of sensitive information */

import { compare, hash } from 'bcrypt';

// Fonction pour calculer le hash d'une chaîne
// export function generateHash(data: string, algorithm: string = 'sha256'): string {
//     const hasher = createHash(algorithm); // Crée un objet de hashage avec l'algorithme spécifié
//     hasher.update(data); // Met à jour le hash avec les données
//     return hasher.digest('hex'); // Retourne le hash sous forme de chaîne hexadécimale
// }

export const hashConfig = {
    saltRounds: 10,
  };