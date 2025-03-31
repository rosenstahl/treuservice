import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatFormData } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Formular-Daten aus dem Request-Body extrahieren
    const formData = await request.json();
    
    // Kontaktdaten aus dem Formular mit verbesserter Fehlerbehandlung
    const email = formData.kontakt?.email || '';
    const telefon = formData.kontakt?.telefon || '';
    const firma = formData.kontakt?.firma || '';
    
    // Verbesserte Namensverarbeitung
    let vorname = '', nachname = '', anrede = '';
    
    // Prüfen, welche Art von Namensdaten vorhanden sind
    if (formData.kontakt?.name) {
      // Split vom vollen Namen (wie im KontaktZusammenfassungStep.tsx)
      const nameParts = formData.kontakt.name.split(' ');
      vorname = nameParts[0] || '';
      nachname = nameParts.slice(1).join(' ') || '';
    } else if (formData.kontakt?.vorname && formData.kontakt?.nachname) {
      // Direkte Felder vorhanden
      vorname = formData.kontakt.vorname;
      nachname = formData.kontakt.nachname;
    } else {
      // Fallback für unerwartete Datenstrukturen
      console.warn('Keine gültigen Namensfelder gefunden:', formData.kontakt);
      vorname = "Unbekannt";
      nachname = "Anfrage";
    }
    
    if (formData.kontakt?.anrede) {
      anrede = formData.kontakt.anrede;
    }
    
    // Betreffzeile für die E-Mail
    const subject = `Neue Reinigungs-Anfrage von ${vorname} ${nachname}`;
    
    // Formatierungshelfer für Reinigungsart
    const getReinigungsartDisplay = () => {
      const artMap: Record<string, string> = {
        'unterhaltsreinigung': 'Unterhaltsreinigung',
        'grundreinigung': 'Grundreinigung',
        'glas_fassade': 'Glas- & Fassadenreinigung',
        'industrie': 'Industriereinigung',
        'reinraum': 'Reinraumreinigung',
        'aussenanlagen': 'Außenanlagenpflege',
        'sonderreinigung': 'Sonderreinigung',
        'verkehrsmittel': 'Verkehrsmittelreinigung',
        'hotel': 'Hotelreinigung',
        'veranstaltung': 'Veranstaltungsreinigung',
        'baureinigung': 'Baureinigung',
        'steinreinigung': 'Steinreinigung',
        'dachreinigung': 'Dachreinigung',
        'solaranlagen': 'Solaranlagenreinigung',
        'sonstiges': 'Sonstige Reinigung'
      };
      
      if (!formData.reinigungsart || !formData.reinigungsart.hauptkategorie) {
        return 'Keine Angabe';
      }
      
      const art = formData.reinigungsart.hauptkategorie;
      const label = artMap[art] || art;
      
      if (art === 'sonstiges' && formData.reinigungsart.sonstigesText) {
        return `${label}: ${formData.reinigungsart.sonstigesText}`;
      }
      
      return label;
    };

    // Formatierungshelfer für Objekttyp
    const getObjektTypDisplay = () => {
      const typMap: Record<string, string> = {
        'buero': 'Büro',
        'wohnhaus': 'Wohnhaus',
        'industrie': 'Industriegebäude',
        'gewerbe': 'Gewerbegebäude',
        'hotel': 'Hotel',
        'krankenhaus': 'Krankenhaus',
        'schule': 'Bildungseinrichtung',
        'aussenbereich': 'Außenbereich',
        'sonstiges': 'Sonstiges'
      };
      
      if (!formData.objektTyp || !formData.objektTyp.typ) {
        return 'Keine Angabe';
      }
      
      const typ = formData.objektTyp.typ;
      return typMap[typ] || typ;
    };

    // Formatierungshelfer für Servicetyp
    const getServiceTypDisplay = () => {
      const serviceMap: Record<string, string> = {
        'standard': 'Standard-Service',
        'express': 'Express-Service',
        'sofort': 'Sofort-Service'
      };
      
      if (!formData.terminService || !formData.terminService.servicetyp) {
        return 'Keine Angabe';
      }
      
      return serviceMap[formData.terminService.servicetyp] || formData.terminService.servicetyp;
    };

    // Formatierungshelfer für Wiederholung
    const getWiederholungDisplay = () => {
      const regelmassigkeitMap: Record<string, string> = {
        'einmalig': 'Einmalig',
        'taeglich': 'Täglich',
        'woechentlich': 'Wöchentlich',
        'monatlich': 'Monatlich',
        'individuell': 'Individuell'
      };
      
      if (!formData.terminService || !formData.terminService.regelmassigkeit) {
        return 'Keine Angabe';
      }
      
      const reg = formData.terminService.regelmassigkeit;
      if (reg === 'individuell' && formData.terminService.individuelleAngabe) {
        return `${regelmassigkeitMap[reg]}: ${formData.terminService.individuelleAngabe}`;
      }
      
      return regelmassigkeitMap[reg] || reg;
    };

    // Formatieren des Datums
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Keine Angabe';
      
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE');
      } catch {
        return dateString;
      }
    };

    // Dienstzeiten als formatierten String zurückgeben
    const getDienstzeitenDisplay = () => {
      if (!formData.terminService || !formData.terminService.dienste) return "Keine Angabe";
      
      const dienste = formData.terminService.dienste;
      const times = [];
      
      if (dienste.tagesdienst) times.push("Tagdienst");
      if (dienste.nachtdienst) times.push("Nachtdienst");
      if (dienste.wochenenddienst) times.push("Wochenenddienst");
      if (dienste.feiertagsdienst) times.push("Feiertagsdienst");
      
      return times.length > 0 ? times.join(", ") : "Keine Angabe";
    };
    
    // Formatierte Daten für Text-E-Mail
    const text = `Neue Reinigungs-Anfrage über das Kontaktformular:
    
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
  <h1>Neue Reinigungs-Anfrage</h1>
  
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
    <h2>Reinigungsdetails</h2>
    <table>
      <tr>
        <td class="label">Reinigungsart:</td>
        <td>${getReinigungsartDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Objekttyp:</td>
        <td>${getObjektTypDisplay()}</td>
      </tr>
      ${formData.objektTyp && formData.objektTyp.sonstigesText ? `
      <tr>
        <td class="label">Objektdetails:</td>
        <td>${formData.objektTyp.sonstigesText}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Flächeninformationen</h2>
    <table>
      <tr>
        <td class="label">Fläche:</td>
        <td>${formData.flaecheInfo?.flaeche || 'Keine Angabe'} m²</td>
      </tr>
      <tr>
        <td class="label">Reinigungskräfte:</td>
        <td>${formData.flaecheInfo?.reinigungskraefte || 1} Personen</td>
      </tr>
      ${formData.flaecheInfo?.raumanzahl ? `
      <tr>
        <td class="label">Raumanzahl:</td>
        <td>${formData.flaecheInfo.raumanzahl}</td>
      </tr>
      ` : ''}
      ${formData.flaecheInfo?.etagenanzahl ? `
      <tr>
        <td class="label">Etagen:</td>
        <td>${formData.flaecheInfo.etagenanzahl}</td>
      </tr>
      ` : ''}
      ${formData.flaecheInfo?.fensteranzahl ? `
      <tr>
        <td class="label">Fensteranzahl:</td>
        <td>${formData.flaecheInfo.fensteranzahl}</td>
      </tr>
      ` : ''}
      ${formData.flaecheInfo?.spezialDetails ? `
      <tr>
        <td class="label">Spezielle Details:</td>
        <td>${formData.flaecheInfo.spezialDetails}</td>
      </tr>
      ` : ''}
    </table>
  </div>
  
  <div class="section">
    <h2>Zeitliche Details</h2>
    <table>
      <tr>
        <td class="label">Service-Typ:</td>
        <td>${getServiceTypDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Regelmäßigkeit:</td>
        <td>${getWiederholungDisplay()}</td>
      </tr>
      <tr>
        <td class="label">Wunschtermin:</td>
        <td>${formatDate(formData.terminService?.wunschtermin || '')}</td>
      </tr>
      ${formData.terminService?.endtermin ? `
      <tr>
        <td class="label">Endtermin:</td>
        <td>${formatDate(formData.terminService.endtermin)}</td>
      </tr>
      ` : ''}
      ${formData.terminService?.wunschzeit ? `
      <tr>
        <td class="label">Wunschzeit:</td>
        <td>${formData.terminService.wunschzeit} Uhr</td>
      </tr>
      ` : ''}
      <tr>
        <td class="label">Dienstzeiten:</td>
        <td>${getDienstzeitenDisplay()}</td>
      </tr>
    </table>
  </div>
  
  ${formData.terminService?.objekt_adresse ? `
  <div class="section">
    <h2>Adresse des zu reinigenden Objekts</h2>
    <table>
      <tr>
        <td class="label">Adresse:</td>
        <td>${formData.terminService.objekt_adresse.strasse} ${formData.terminService.objekt_adresse.hausnummer}, ${formData.terminService.objekt_adresse.plz} ${formData.terminService.objekt_adresse.ort}</td>
      </tr>
    </table>
  </div>
  ` : ''}
</body>
</html>`;
    
    // E-Mail senden
    const result = await sendEmail({
      subject,
      text,
      html,
      replyTo: email || 'keine-email@angegeben.de'
    });
    
    if (result.success) {
      console.log('E-Mail erfolgreich gesendet');
      return NextResponse.json({ success: true });
    } else {
      console.error('Fehler beim Senden der E-Mail:', result.error);
      return NextResponse.json(
        { success: false, message: 'Fehler beim Senden der E-Mail' },
        { status: 500 }
      );
    }
  } catch (error) {
    // Detaillierte Fehlerprotokollierung
    console.error('Fehler bei der Verarbeitung der Reinigungsanfrage:', error);
    
    // Fehlertyp analysieren
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: 'Ungültiges JSON-Format erhalten' },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      console.error('Fehlermeldung:', error.message);
      console.error('Stack Trace:', error.stack);
    }
    
    return NextResponse.json(
      { success: false, message: 'Fehler bei der Verarbeitung der Anfrage' },
      { status: 500 }
    );
  }
}