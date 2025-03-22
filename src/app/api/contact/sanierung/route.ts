import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular
    const { anrede, vorname, nachname, email, telefon, firma, anmerkungen } = formData.kontakt;
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Sanierungs-Anfrage von ${vorname} ${nachname}`;
    
    // Helper-Funktionen für die Anzeige
    const getSchadensartText = (): string => {
      switch (formData.schadensart.hauptkategorie) {
        case 'brand': return 'Brandschaden'
        case 'wasser': return 'Wasserschaden'
        case 'schimmel': return 'Schimmelbefall'
        case 'sonstiges': return formData.schadensart.sonstigesText || 'Sonstige Sanierung'
        default: return 'Nicht angegeben'
      }
    }

    const getObjektTypText = (): string => {
      switch (formData.objekt.typ) {
        case 'wohnung': return 'Wohnung'
        case 'haus': return 'Haus'
        case 'gewerbe': return 'Gewerbe'
        case 'keller': return 'Keller'
        case 'dachboden': return 'Dachboden'
        case 'sonstiges': return formData.objekt.typCustom || 'Sonstiges Objekt'
        default: return 'Nicht angegeben'
      }
    }

    // Material-Liste formatieren
    const getMaterialListe = (): string => {
      const materialMap: Record<string, string> = {
        'holz': 'Holz',
        'textilien': 'Textilien',
        'kunststoff': 'Kunststoff', 
        'tapete': 'Tapete',
        'bodenbelag': 'Bodenbelag',
        'moebel': 'Möbel',
        'elektrogeraete': 'Elektrogeräte'
      };
      
      if (!formData.details.brandMaterialien || formData.details.brandMaterialien.length === 0) {
        return "Keine angegeben";
      }
      
      return formData.details.brandMaterialien
        .map((material: string) => materialMap[material] || material)
        .join(', ');
    }

    // Wasserursache formatieren
    const getWasserursacheText = (): string => {
      const ursacheMap: Record<string, string> = {
        'rohrbruch': 'Rohrbruch',
        'unwetter': 'Unwetter/Starkregen',
        'hochwasser': 'Hochwasser',
        'loeschwasser': 'Löschwasser',
        'sonstige': 'Sonstige Ursache'
      };
      
      if (formData.details.wasserUrsache === 'sonstige' && formData.details.wasserUrsacheCustom) {
        return `${ursacheMap[formData.details.wasserUrsache]}: ${formData.details.wasserUrsacheCustom}`;
      }
      
      return formData.details.wasserUrsache ? ursacheMap[formData.details.wasserUrsache] : 'Nicht angegeben';
    }

    // Formatiere Datum
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Nicht angegeben';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE');
      } catch {
        return dateString;
      }
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Sanierungs-Anfrage über das Kontaktformular:
    
Name: ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}

Schadensart: ${getSchadensartText()}
Objekttyp: ${getObjektTypText()}
Objektfläche: ${formData.objekt.flaeche} m²

${formatFormData(formData)}`;
    
    // Formatierte Daten für HTML-E-Mail
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
  <h1>Neue Sanierungs-Anfrage</h1>
  
  <div class="contact-info">
    <h2>Kontaktdaten</h2>
    <p><strong>Name:</strong> ${anrede ? `${anrede}. ` : ''}${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    ${firma ? `<p><strong>Firma:</strong> ${firma}</p>` : ''}
    ${anmerkungen ? `<p><strong>Anmerkungen:</strong> ${anmerkungen}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Schadensart</h2>
    <table>
      <tr>
        <td class="label">Typ:</td>
        <td>${getSchadensartText()}</td>
      </tr>
      
      ${formData.schadensart.hauptkategorie === 'brand' ? `
      <tr>
        <td class="label">Verschmutzungsgrad:</td>
        <td>${formData.details.brandVerschmutzungsgrad === 'leicht' ? 'Leicht' : 
               formData.details.brandVerschmutzungsgrad === 'mittel' ? 'Mittel' : 'Stark'}</td>
      </tr>
      <tr>
        <td class="label">Betroffene Materialien:</td>
        <td>${getMaterialListe()}</td>
      </tr>
      ` : ''}
      
      ${formData.schadensart.hauptkategorie === 'wasser' ? `
      <tr>
        <td class="label">Ursache:</td>
        <td>${getWasserursacheText()}</td>
      </tr>
      <tr>
        <td class="label">Wasserart:</td>
        <td>${formData.details.wasserArt === 'sauber' ? 'Sauberes Wasser' : 'Kontaminiertes Wasser'}</td>
      </tr>
      ${formData.details.wasserZeitpunkt ? `
      <tr>
        <td class="label">Zeitpunkt:</td>
        <td>${formatDate(formData.details.wasserZeitpunkt)}</td>
      </tr>
      ` : ''}
      ` : ''}
      
      ${formData.schadensart.hauptkategorie === 'schimmel' ? `
      <tr>
        <td class="label">Sichtbarkeit:</td>
        <td>${formData.details.schimmelSichtbar ? 'Ja' : 'Nein, aber es gibt Anzeichen'}</td>
      </tr>
      <tr>
        <td class="label">Befallene Fläche:</td>
        <td>${formData.details.schimmelFlaeche} m²</td>
      </tr>
      ${formData.details.schimmelUrsacheBekannt && formData.details.schimmelUrsache ? `
      <tr>
        <td class="label">Bekannte Ursache:</td>
        <td>${formData.details.schimmelUrsache}</td>
      </tr>
      ` : ''}
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Objekt & Fläche</h2>
    <table>
      <tr>
        <td class="label">Objekttyp:</td>
        <td>${getObjektTypText()}</td>
      </tr>
      <tr>
        <td class="label">Fläche:</td>
        <td>${formData.objekt.flaeche} m²</td>
      </tr>
      ${formData.objekt.betroffeneBereiche && formData.objekt.betroffeneBereiche.length > 0 ? `
      <tr>
        <td class="label">Betroffene Bereiche:</td>
        <td>${formData.objekt.betroffeneBereiche.join(', ')}</td>
      </tr>
      ` : ''}
      ${formData.objekt.schadensbeschreibung ? `
      <tr>
        <td class="label">Beschreibung:</td>
        <td>${formData.objekt.schadensbeschreibung}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Adresse</h2>
    <table>
      <tr>
        <td class="label">Straße:</td>
        <td>${formData.adresse.strasse} ${formData.adresse.hausnummer}</td>
      </tr>
      <tr>
        <td class="label">Ort:</td>
        <td>${formData.adresse.plz} ${formData.adresse.ort}</td>
      </tr>
      <tr>
        <td class="label">Etage:</td>
        <td>${formData.adresse.etage === 0 ? 'Erdgeschoss' : `${formData.adresse.etage}. Etage`} 
            ${formData.adresse.aufzug ? '(Aufzug vorhanden)' : ''}</td>
      </tr>
      <tr>
        <td class="label">Parkmöglichkeit:</td>
        <td>${formData.adresse.parkmoeglichkeit === 'gut' ? 'Gut' : 
               formData.adresse.parkmoeglichkeit === 'eingeschraenkt' ? 'Eingeschränkt' : 'Schwierig'}</td>
      </tr>
      ${formData.adresse.zugaenglichkeit ? `
      <tr>
        <td class="label">Zugänglichkeit:</td>
        <td>${formData.adresse.zugaenglichkeit}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Termindetails</h2>
    <table>
      ${formData.kontakt.wunschtermin ? `
      <tr>
        <td class="label">Gewünschter Termin:</td>
        <td>${formatDate(formData.kontakt.wunschtermin)}
            ${formData.kontakt.wunschzeit ? ` um ${formData.kontakt.wunschzeit} Uhr` : ''}</td>
      </tr>
      ` : ''}
      ${formData.kontakt.bevorzugteKontaktzeit ? `
      <tr>
        <td class="label">Bevorzugte Kontaktzeit:</td>
        <td>${formData.kontakt.bevorzugteKontaktzeit === 'vormittags' ? 'Vormittags (8-12 Uhr)' : 
               formData.kontakt.bevorzugteKontaktzeit === 'nachmittags' ? 'Nachmittags (12-17 Uhr)' : 
               formData.kontakt.bevorzugteKontaktzeit === 'abends' ? 'Abends (17-20 Uhr)' : 
               'Keine Angabe'}</td>
      </tr>
      ` : ''}
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