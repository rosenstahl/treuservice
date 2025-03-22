import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma, adresseStrasse, adresseHausnummer, adressePlz, adresseOrt, anmerkungen } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Winterdienst-Anfrage von ${vorname} ${nachname}`;
    
    // Helper-Funktionen für die E-Mail-Formatierung
    const formatArea = (value: number) => {
      return new Intl.NumberFormat('de-DE').format(value);
    };
    
    const packageTypes: { [key: string]: string } = {
      'all-in-one': 'All-In-One Winter Paket',
      'flex': 'Flexibles Winter Paket',
      'on-demand': 'Bedarfspaket (On-Demand)'
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Winterdienst-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}
Adresse: ${adresseStrasse} ${adresseHausnummer}, ${adressePlz} ${adresseOrt}
${anmerkungen ? `Anmerkungen: ${anmerkungen}` : ''}

Winterdienst-Details:
- Adresse zu räumender Fläche: ${formData.address || 'Keine Angabe'}
- Fläche: ${formatArea(formData.area.value)} m²
- Pakettyp: ${packageTypes[formData.package.type] || formData.package.type}

Zusätzliche Optionen:
- Umweltschonender Streu-Paket: ${formData.options.environmentPackage ? 'Ja' : 'Nein'}
- Saisonabschlussreinigung: ${formData.options.finalCleaning ? 'Ja' : 'Nein'}
- Serviceeinsatz außerhalb der Regelzeiten: ${formData.options.offHours.enabled ? 'Ja' : 'Nein'}
${formData.options.offHours.enabled && formData.options.offHours.time ? `  Startzeit: ${formData.options.offHours.time} Uhr` : ''}
- Verlängerte Saisonabdeckung: ${formData.options.seasonExtension.enabled ? 'Ja' : 'Nein'}
${formData.options.seasonExtension.enabled ? `  Zeitraum: ${formData.options.seasonExtension.startDate} - ${formData.options.seasonExtension.endDate}` : ''}

${formatFormData(formData)}`;
    
    // Formatierte Daten für HTML-E-Mail mit verbessertem Styling
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    h1 { color: #0056b3; }
    h2 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; }
    .contact-info { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .contact-info p { margin: 5px 0; }
    .section { margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; background-color: #f1f1f1; padding: 8px; }
    td { padding: 8px; border-bottom: 1px solid #ddd; }
    .label { font-weight: bold; width: 30%; }
    .highlight { background-color: #eaf3fb; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Neue Winterdienst-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${adresseStrasse} ${adresseHausnummer}, ${adressePlz} ${adresseOrt}</p>
    ${anmerkungen ? `<p><strong>Anmerkungen:</strong> ${anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Standort & Fläche</h2>
    <table>
      <tr>
        <td class="label">Adresse der zu räumenden Fläche:</td>
        <td>${formData.address || 'Keine Angabe'}</td>
      </tr>
      <tr>
        <td class="label">Größe der Fläche:</td>
        <td>${formatArea(formData.area.value)} m²</td>
      </tr>
      <tr>
        <td class="label">Flächenerfassung:</td>
        <td>${formData.area.manual ? 'Manuell eingegeben' : 'Über Karte ausgewählt'}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Ausgewähltes Paket</h2>
    <table>
      <tr>
        <td class="label">Pakettyp:</td>
        <td>${packageTypes[formData.package.type] || formData.package.type}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Zusätzliche Optionen</h2>
    <table>
      <tr>
        <td class="label">Haftung:</td>
        <td><span class="highlight">Immer inklusive</span></td>
      </tr>
      <tr>
        <td class="label">Umweltschonender Streu-Paket:</td>
        <td>${formData.options.environmentPackage ? 'Ja' : 'Nein'}</td>
      </tr>
      <tr>
        <td class="label">Saisonabschlussreinigung:</td>
        <td>${formData.options.finalCleaning ? 'Ja' : 'Nein'}</td>
      </tr>
      <tr>
        <td class="label">Serviceeinsatz außerhalb der Regelzeiten:</td>
        <td>
          ${formData.options.offHours.enabled ? 'Ja' : 'Nein'}
          ${formData.options.offHours.enabled && formData.options.offHours.time ? 
            `<br><span style="font-size: 0.9em; color: #666;">Startzeit: ${formData.options.offHours.time} Uhr</span>` 
            : ''}
        </td>
      </tr>
      <tr>
        <td class="label">Verlängerte Saisonabdeckung:</td>
        <td>
          ${formData.options.seasonExtension.enabled ? 'Ja' : 'Nein'}
          ${formData.options.seasonExtension.enabled ? 
            `<br><span style="font-size: 0.9em; color: #666;">Zeitraum: ${formData.options.seasonExtension.startDate} - ${formData.options.seasonExtension.endDate}</span>` 
            : ''}
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
    
    // E-Mail senden
    const result = await sendEmail({
      subject,
      text,
      html,
      replyTo: email
    });
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Fehler beim Senden der E-Mail:', result.error);
      return NextResponse.json(
        { success: false, message: 'Fehler beim Senden der E-Mail' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Fehler bei der Verarbeitung der Anfrage:', error);
    return NextResponse.json(
      { success: false, message: 'Fehler bei der Verarbeitung der Anfrage' },
      { status: 500 }
    );
  }
}