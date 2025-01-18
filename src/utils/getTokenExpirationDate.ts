import ms from 'ms';
import { addMilliseconds, format, addMinutes, addHours } from 'date-fns';
import { refreshJwtConfig } from '../../config/jwt.config';
import { addDays } from 'date-fns'; // Si vous utilisez date-fns


/**
 * Calculates the token expiration date based on the provided configuration.
 * 
 * @returns {Date} The token expiration date.
 */
export default function getTokenExpirationDate(): Date {
    console.log("Starting token expiration calculation");
  
    const expiresIn = refreshJwtConfig.expiresIn as string;
  
    // Parse the duration string manually
    const match = expiresIn.match(/^(\d+)([smhd])$/); // Regex pour détecter les durées (s, m, h, d)
    
    if (!match) {
      throw new Error(
        'Invalid expiration format in refreshJwtConfig.expiresIn. Ensure it is a valid format like "7d", "24h", "30m", etc.'
      );
    }
  
    const value = parseInt(match[1], 10); // Récupère la valeur numérique
    const unit = match[2]; // Récupère l'unité (s, m, h, d)
  
    // Calculer la date d'expiration
    let expiresAt: Date;
    const now = new Date();
  
    switch (unit) {
      case 's': // Secondes
        expiresAt = addMinutes(now, value / 60);
        break;
      case 'm': // Minutes
        expiresAt = addMinutes(now, value);
        break;
      case 'h': // Heures
        expiresAt = addHours(now, value);
        break;
      case 'd': // Jours
        expiresAt = addDays(now, value);
        break;
      default:
        throw new Error('Unsupported time unit in refreshJwtConfig.expiresIn');
    }
  
    console.log("Token expiration calculated successfully:", expiresAt);
    return expiresAt;
  }


/**
 * Converts a duration string to days.
 * 
 * @param {string} duration - The duration string (e.g., '1d', '2h', '3m', etc.).
 * @returns {number} The duration in days.
 */
function getDaysFromDuration(duration: string): number {
    const milliseconds = ms(duration);
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    return hours / 24;
}

/**
 * Adds a specified number of days to the current date.
 * 
 * @param {number} days - The number of days to add.
 * @returns {Date} The resulting date.
 */
function addDaysFromNow(days: number): Date {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}