import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Entrümpelung-Anfrage von ${vorname} ${nachname}`;
    
    // Objekttyp als lesbare Bezeichnung
    const getObjektTypLabel = (typ: string) => {
      const labels: Record<string, string> = {
        'wohnung': 'Wohnung',
        'haus': 'Haus',
        'keller': 'Keller',
        'dachboden': 'Dachboden',
        'gewerbe': 'Gewerbeimmobilie',
        'sonstiges': 'Sonstiges'
      };
      return labels[typ] || 'Nicht angegeben';
    };

    // Füllgrad als lesbare Bezeichnung
    const getFuellgradLabel = (fuellgrad: string) => {
      const labels: Record<string, string> = {
        'leer': 'Nahezu leer',
        'wenig': 'Wenig befüllt',
        'mittel': 'Mittel befüllt',
        'voll': 'Stark befüllt'
      };
      return labels[fuellgrad] || 'Nicht angegeben';
    };

    // Parkmöglichkeit als lesbare Bezeichnung
    const getParkmoeglichkeitLabel = (parkmoeglichkeit: string) => {
      const labels: Record<string, string> = {
        'gut': 'Gut (direkt vor dem Gebäude)',
        'eingeschraenkt': 'Eingeschränkt (in der Nähe)',
        'keine': 'Keine/Schwierig'
      };
      return labels[parkmoeglichkeit] || 'Nicht angegeben';
    };

    // Etage als lesbare Bezeichnung
    const getEtageLabel = (etage: number) => {
      return etage === 0 ? 'Erdgeschoss' : `${etage}. Etage`;
    };

    // Entrümpelungsarten, die ausgewählt wurden
    const getSelectedEntrumpelungsarten = () => {
      const arten = [];
      if (formData.entrumpelungsart.moebel) arten.push('Möbel');
      if (formData.entrumpelungsart.elektrogeraete) arten.push('Elektrogeräte');
      if (formData.entrumpelungsart.sperrmuell) arten.push('Sperrmüll');
      if (formData.entrumpelungsart.bauschutt) arten.push('Bauschutt');
      if (formData.entrumpelungsart.sondermuell) arten.push('Sondermüll');
      if (formData.entrumpelungsart.sonstiges && formData.entrumpelungsart.sonstigesText) {
        arten.push(`Sonstiges: ${formData.entrumpelungsart.sonstigesText}`);
      }
      return arten.length > 0 ? arten.join(', ') : 'Keine Angabe';
    };
    
    // Formatiertes Datum
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Nicht angegeben';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return dateString;
      }
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Entrümpelung-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}

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
  </style>
</head>
<body>
  <h1>Neue Entrümpelung-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    <p><strong>Adresse:</strong> ${formData.kontakt.adresseStrasse} ${formData.kontakt.adresseHausnummer}, ${formData.kontakt.adressePlz} ${formData.kontakt.adresseOrt}</p>
    ${formData.kontakt.anmerkungen ? `<p><strong>Anmerkungen:</strong> ${formData.kontakt.anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Objektdetails</h2>
    <table>
      <tr>
        <td class="label">Objekttyp:</td>
        <td>${getObjektTypLabel(formData.objektTyp.typ)}${formData.objektTyp.customDetails ? ` (${formData.objektTyp.customDetails})` : ''}</td>
      </tr>
      <tr>
        <td class="label">Objektgröße:</td>
        <td>${formData.umfangGroesse.flaeche} m², ${formData.umfangGroesse.raumanzahl} ${formData.umfangGroesse.raumanzahl === 1 ? 'Raum' : 'Räume'}</td>
      </tr>
      <tr>
        <td class="label">Füllgrad:</td>
        <td>${getFuellgradLabel(formData.umfangGroesse.fuellgrad)}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Entrümpelungsart</h2>
    <table>
      <tr>
        <td class="label">Zu entrümpelnde Gegenstände:</td>
        <td>${getSelectedEntrumpelungsarten()}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Einsatzdetails</h2>
    <table>
      <tr>
        <td class="label">Adresse:</td>
        <td>${formData.adresseZugang.strasse} ${formData.adresseZugang.hausnummer}, ${formData.adresseZugang.plz} ${formData.adresseZugang.ort}</td>
      </tr>
      <tr>
        <td class="label">Etage:</td>
        <td>${getEtageLabel(formData.adresseZugang.etage)}</td>
      </tr>
      <tr>
        <td class="label">Aufzug:</td>
        <td>${formData.adresseZugang.aufzug ? 'Vorhanden' : 'Nicht vorhanden'}</td>
      </tr>
      <tr>
        <td class="label">Parkmöglichkeit:</td>
        <td>${getParkmoeglichkeitLabel(formData.adresseZugang.parkmoeglichkeit)}</td>
      </tr>
      <tr>
        <td class="label">Wunschtermin:</td>
        <td>${formatDate(formData.terminKontakt.wunschtermin)}${formData.terminKontakt.wunschzeit ? ` um ${formData.terminKontakt.wunschzeit} Uhr` : ''}</td>
      </tr>
    </table>
  </div>
  
  <div class="section">
    <h2>Zusatzleistungen</h2>
    <table>
      <tr>
        <td class="label">Endreinigung:</td>
        <td>${formData.zusatzleistungen.reinigung ? 'Ja' : 'Nein'}</td>
      </tr>
      <tr>
        <td class="label">Entsorgungsnachweis:</td>
        <td>${formData.zusatzleistungen.entsorgungsnachweis ? 'Ja' : 'Nein'}</td>
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