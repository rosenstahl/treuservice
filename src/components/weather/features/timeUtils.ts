/**
 * timeUtils.ts
 * 
 * Hilfsfunktionen für die Arbeit mit Zeitintervallen und zeitbezogenen Formatierungen
 * in der Wettervorhersage-Komponente.
 */

/**
 * Generiert 8 gleichmäßig verteilte Zeitintervalle für die Wettervorhersage,
 * beginnend mit der nächsten geraden Stunde und im 2-Stunden-Takt.
 * 
 * @param customStartTime - Optional: Eine benutzerdefinierte Startzeit (standardmäßig wird die aktuelle Zeit verwendet)
 * @param intervalHours - Optional: Der Abstand zwischen den Intervallen in Stunden (Standard: 2)
 * @param count - Optional: Die Anzahl der zu generierenden Intervalle (Standard: 8)
 * @returns Ein Array von Zeitintervallen mit formatierter Uhrzeit und numerischer Stunde
 */
export function generateTimeIntervals(
  customStartTime?: Date,
  intervalHours = 2,
  count = 8
): { time: string; hour: number; date: Date }[] {
  // Aktuelle Zeit oder benutzerdefinierte Zeit verwenden
  const now = customStartTime || new Date();
  const currentHour = now.getHours();
  const intervals = [];

  // Berechne die Startstunde, sodass sie eine gerade Zahl ist und in der Zukunft liegt
  // Bei gerader aktueller Stunde: aktuelle + intervalHours
  // Bei ungerader aktueller Stunde: aufrunden auf nächste gerade Stunde
  const nextEvenHour = currentHour % 2 === 0 ? currentHour + intervalHours : currentHour + 1;
  const startHour = Math.max(nextEvenHour, currentHour + 1); // Mindestens eine Stunde in der Zukunft
  
  // Generiere die angeforderte Anzahl von Zeitintervallen
  for (let i = 0; i < count; i++) {
    const hour = (startHour + i * intervalHours) % 24;
    
    // Erzeugen eines vollständigen Datumsobjekts für diesen Zeitpunkt
    const intervalDate = new Date(now);
    const dayOffset = Math.floor((startHour + i * intervalHours) / 24); // Wenn wir in den nächsten Tag gehen
    intervalDate.setDate(intervalDate.getDate() + dayOffset);
    intervalDate.setHours(hour, 0, 0, 0); // Setze auf die genaue Stunde, Minuten/Sekunden auf 0
    
    intervals.push({
      time: `${String(hour).padStart(2, '0')}:00`,
      hour,
      date: intervalDate
    });
  }

  return intervals;
}

/**
 * Formatiert einen Zeitraum zwischen jetzt und dem angegebenen Datum in eine benutzerfreundliche Form
 * z.B. "gerade eben", "vor 5 Minuten", "vor 2 Stunden"
 * 
 * @param date - Das zu formatierende Datum
 * @returns Ein benutzerfreundlicher String, der den Zeitraum repräsentiert
 */
export function formatTimeAgo(date: Date | null): string {
  if (!date) return '';
  
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // Differenz in Minuten
  
  if (diff < 1) return 'gerade eben';
  if (diff < 60) return `vor ${diff} ${diff === 1 ? 'Minute' : 'Minuten'}`;
  
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
  
  const days = Math.floor(hours / 24);
  return `vor ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
}

/**
 * Formatiert ein Datum für die Anzeige in der Wettervorhersage
 * 
 * @param date - Das zu formatierende Datum
 * @param format - Das Format ('time' für Uhrzeit, 'day' für Tag, 'full' für beides)
 * @returns Ein formatierter String für die Anzeige
 */
export function formatWeatherDate(date: Date, format: 'time' | 'day' | 'full' = 'time'): string {
  if (format === 'time') {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  } else if (format === 'day') {
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' });
  } else {
    return date.toLocaleDateString('de-DE', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  }
}