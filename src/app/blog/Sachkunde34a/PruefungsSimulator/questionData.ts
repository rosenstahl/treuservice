// Typen für die Fragen und Antworten
export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
};

export type Question = {
  id: string;
  text: string;
  category: "Recht" | "Sicherheitstechnik" | "Umgang" | "Notwehr" | "Datenschutz" | "ErsteHilfe";
  difficulty: "leicht" | "mittel" | "schwer";
  answers: Answer[];
  hint?: string;
  explanation?: string;
  reference?: string;
};

// Erweiterte Fragendatenbank für den 34a Sachkunde-Prüfungssimulator
export const questionData: Question[] = [
  // Vorhandene Fragen
  {
    id: "q1",
    text: "Welche Aussage zur Notwehr nach § 32 StGB ist korrekt?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Notwehr darf nur gegenüber dem Angreifer ausgeübt werden.", isCorrect: true, explanation: "Notwehr richtet sich nur gegen den Angreifer, nicht gegen unbeteiligte Dritte." },
      { id: "a2", text: "Notwehr darf auch gegenüber unbeteiligten Dritten ausgeübt werden.", isCorrect: false },
      { id: "a3", text: "Notwehr ist grundsätzlich verboten und strafbar.", isCorrect: false },
      { id: "a4", text: "Notwehr darf nur durch Polizeibeamte ausgeübt werden.", isCorrect: false }
    ],
    explanation: "Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder anderen abzuwenden. Sie darf sich nur gegen den Angreifer richten.",
    reference: "§ 32 StGB"
  },
  {
    id: "q2",
    text: "Wann liegt ein Hausfriedensbruch gemäß § 123 StGB vor?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Wenn jemand in ein befriedetes Besitztum eindringt oder dort verweilt, nachdem ihm der Zutritt verboten wurde.", isCorrect: true },
      { id: "a2", text: "Wenn jemand einen Gegenstand aus einem fremden Haus entwendet.", isCorrect: false },
      { id: "a3", text: "Wenn jemand das Eigentum eines anderen beschädigt.", isCorrect: false },
      { id: "a4", text: "Wenn jemand in einem öffentlichen Park nach Schließung verweilt.", isCorrect: false }
    ],
    reference: "§ 123 StGB"
  },
  {
    id: "q3",
    text: "Welche der folgenden Aussagen zur Jedermann-Festnahme gemäß § 127 StPO ist richtig?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Sie kann nur durch Polizeibeamte erfolgen.", isCorrect: false },
      { id: "a2", text: "Sie ist bei allen Straftaten zulässig, auch bei Ordnungswidrigkeiten.", isCorrect: false },
      { id: "a3", text: "Sie ist zulässig, wenn jemand auf frischer Tat betroffen wird und flüchtig ist oder seine Identität nicht sofort festgestellt werden kann.", isCorrect: true },
      { id: "a4", text: "Sie berechtigt zur Durchsuchung der festgehaltenen Person.", isCorrect: false }
    ],
    explanation: "Nach § 127 Abs. 1 StPO darf jedermann einen auf frischer Tat Betroffenen festhalten, wenn er flüchtig ist oder seine Identität nicht sofort festgestellt werden kann.",
    reference: "§ 127 StPO"
  },
  {
    id: "q4",
    text: "Welche Maßnahme ist bei einer Person mit einem akuten Herzinfarkt als Erste-Hilfe-Maßnahme korrekt?",
    category: "ErsteHilfe",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Die Person sollte flach auf dem Boden liegen.", isCorrect: false },
      { id: "a2", text: "Die Person in eine stabile Seitenlage bringen.", isCorrect: false },
      { id: "a3", text: "Die Person in eine halbsitzende Position bringen, Oberkörper hoch lagern.", isCorrect: true },
      { id: "a4", text: "Die Person sollte umhergehen, damit der Kreislauf aktiviert wird.", isCorrect: false }
    ],
    hint: "Denken Sie an die optimale Atmung und Entlastung des Herzens."
  },
  {
    id: "q5",
    text: "Was ist bei der Durchsuchung einer Person im Rahmen des Bewachungsgewerbes zu beachten?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Eine Durchsuchung darf immer durchgeführt werden, wenn ein Verdacht besteht.", isCorrect: false },
      { id: "a2", text: "Eine Durchsuchung darf nur mit ausdrücklicher Einwilligung der betroffenen Person erfolgen, außer bei Gefahr im Verzug.", isCorrect: true },
      { id: "a3", text: "Eine Durchsuchung darf nur von staatlichen Sicherheitsorganen durchgeführt werden.", isCorrect: false },
      { id: "a4", text: "Eine Durchsuchung kann auch gegen den Willen der Person durchgeführt werden.", isCorrect: false }
    ],
    explanation: "Sicherheitspersonal hat kein generelles Durchsuchungsrecht. Eine Durchsuchung ist nur mit Einwilligung der Person oder bei Vorliegen von Hausrecht und Gefahr im Verzug zulässig."
  },
  {
    id: "q6",
    text: "Welche Maßnahmen kann ein Sicherheitsmitarbeiter ergreifen, wenn eine Person das Hausrecht missachtet und trotz Aufforderung ein Objekt nicht verlässt?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Sofortige Festnahme wegen Hausfriedensbruch", isCorrect: false },
      { id: "a2", text: "Anwendung unmittelbaren Zwangs ohne Vorwarnung", isCorrect: false },
      { id: "a3", text: "Nochmalige Aufforderung zum Verlassen, bei Weigerung verhältnismäßige Maßnahmen ergreifen und ggf. Polizei hinzuziehen", isCorrect: true },
      { id: "a4", text: "Den Vorfall ignorieren, da keine rechtliche Handhabe besteht", isCorrect: false }
    ],
    explanation: "Bei Missachtung des Hausrechts darf der Mitarbeiter verhältnismäßige Maßnahmen zur Durchsetzung ergreifen, sollte aber bei Widerstand die Polizei hinzuziehen."
  },
  {
    id: "q7",
    text: "Welches Verhalten ist bei einer verbalen Auseinandersetzung am besten geeignet, um eine Eskalation zu vermeiden?",
    category: "Umgang",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Lauter sprechen als das Gegenüber, um Autorität zu zeigen", isCorrect: false },
      { id: "a2", text: "Mit verschränkten Armen direkt vor der Person stehen", isCorrect: false },
      { id: "a3", text: "Ruhig bleiben, aktiv zuhören und auf Augenhöhe kommunizieren", isCorrect: true },
      { id: "a4", text: "Den Konflikt ignorieren und weggehen", isCorrect: false }
    ],
    hint: "Denken Sie an die Grundprinzipien der Deeskalation."
  },
  {
    id: "q8",
    text: "Was gehört zu den Pflichten eines Mitarbeiters im Bewachungsgewerbe bezüglich des Datenschutzes?",
    category: "Datenschutz",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Persönliche Daten nur bei dienstlicher Notwendigkeit erfassen und nicht an Unbefugte weitergeben", isCorrect: true },
      { id: "a2", text: "Alle Vorfälle in sozialen Medien teilen, um die Öffentlichkeit zu informieren", isCorrect: false },
      { id: "a3", text: "Videoaufzeichnungen für private Zwecke speichern", isCorrect: false },
      { id: "a4", text: "Personenbezogene Daten an andere Sicherheitsdienste ohne Rechtsgrundlage weitergeben", isCorrect: false }
    ],
    explanation: "Der Datenschutz verlangt, dass personenbezogene Daten nur zweckgebunden erhoben und verarbeitet werden dürfen und vor unbefugtem Zugriff zu schützen sind."
  },
  
  // Zusätzliche neue Fragen
  {
    id: "q9",
    text: "Wann ist ein Notwehrexzess gemäß § 33 StGB gegeben?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Wenn die Verteidigung aus Verwirrung, Furcht oder Schrecken über die Grenzen der Notwehr hinausgeht", isCorrect: true },
      { id: "a2", text: "Wenn jede Notwehrhandlung mit übermäßiger Gewalt ausgeführt wird", isCorrect: false },
      { id: "a3", text: "Wenn die Notwehr gegenüber einem Kind oder Jugendlichen ausgeübt wird", isCorrect: false },
      { id: "a4", text: "Wenn die Notwehr mit einer Waffe ausgeübt wird", isCorrect: false }
    ],
    explanation: "Ein Notwehrexzess liegt vor, wenn die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken überschritten werden. In diesem Fall ist der Täter gemäß § 33 StGB nicht strafbar.",
    reference: "§ 33 StGB"
  },
  {
    id: "q10",
    text: "Welche der folgenden Voraussetzungen muss für die Erlaubniserteilung nach § 34a GewO erfüllt sein?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Der Antragsteller muss mindestens 21 Jahre alt sein", isCorrect: false },
      { id: "a2", text: "Der Antragsteller muss die erforderliche Zuverlässigkeit besitzen", isCorrect: true },
      { id: "a3", text: "Der Antragsteller muss einen Hochschulabschluss haben", isCorrect: false },
      { id: "a4", text: "Der Antragsteller muss vorher bei der Polizei gedient haben", isCorrect: false }
    ],
    explanation: "Gemäß § 34a GewO muss der Antragsteller die erforderliche Zuverlässigkeit und persönliche Eignung besitzen. Zudem sind weitere Voraussetzungen wie der Nachweis einer Sachkundeprüfung erforderlich.",
    reference: "§ 34a GewO"
  },
  {
    id: "q11",
    text: "Was versteht man unter dem 'Recht am eigenen Bild'?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Das Recht, jederzeit sein eigenes Bild zu besitzen", isCorrect: false },
      { id: "a2", text: "Das Recht, dass Bilder von einem selbst grundsätzlich nur mit Einwilligung veröffentlicht werden dürfen", isCorrect: true },
      { id: "a3", text: "Das Recht, jedes Bild zu löschen, auf dem man zu sehen ist", isCorrect: false },
      { id: "a4", text: "Das Recht, kostenfrei Kopien von Bildern zu erhalten, auf denen man abgebildet ist", isCorrect: false }
    ],
    explanation: "Das Recht am eigenen Bild ist ein Persönlichkeitsrecht und bedeutet, dass Bilder, auf denen eine Person erkennbar abgebildet ist, grundsätzlich nur mit ihrer Einwilligung verbreitet oder öffentlich zur Schau gestellt werden dürfen.",
    reference: "§ 22 KunstUrhG"
  },
  {
    id: "q12",
    text: "Welche Aussage zur Videoüberwachung durch private Sicherheitsdienste ist korrekt?",
    category: "Sicherheitstechnik",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Private Sicherheitsdienste dürfen ohne Einschränkungen in allen Bereichen Videoüberwachung einsetzen", isCorrect: false },
      { id: "a2", text: "Die Videoüberwachung muss durch geeignete Maßnahmen für die Betroffenen erkennbar sein", isCorrect: true },
      { id: "a3", text: "Die Aufzeichnungen dürfen unbegrenzt lange gespeichert werden", isCorrect: false },
      { id: "a4", text: "Eine Videoüberwachung darf nur mit spezieller polizeilicher Genehmigung erfolgen", isCorrect: false }
    ],
    explanation: "Gemäß Datenschutzrecht muss die Videoüberwachung für die Betroffenen erkennbar sein, z.B. durch entsprechende Hinweisschilder. Zudem gibt es Grenzen für die Speicherdauer und den Überwachungsbereich.",
    reference: "Art. 6 DSGVO, § 4 BDSG"
  },
  {
    id: "q13",
    text: "Was ist ein wichtiges Merkmal der Deeskalation in Konfliktsituationen?",
    category: "Umgang",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Laute, bestimmte Ansprache, um Dominanz zu zeigen", isCorrect: false },
      { id: "a2", text: "Körperlichen Abstand verringern, um Vertrauen aufzubauen", isCorrect: false },
      { id: "a3", text: "Aktives Zuhören und Eingehen auf die Bedürfnisse des Gegenübers", isCorrect: true },
      { id: "a4", text: "Schnelle Entscheidungen ohne Rücksicht auf die Gefühle des Gegenübers", isCorrect: false }
    ],
    explanation: "Aktives Zuhören und das Eingehen auf die Bedürfnisse des Gegenübers sind wichtige Techniken der Deeskalation. Sie signalisieren Respekt und können dazu beitragen, die Situation zu beruhigen."
  },
  {
    id: "q14",
    text: "Welche Aussage zu Zugangskontrollsystemen ist korrekt?",
    category: "Sicherheitstechnik",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Biometrische Zugangskontrollsysteme sind immer sicherer als kartenbasierte Systeme", isCorrect: false },
      { id: "a2", text: "Ein PIN-Code bietet allein den höchsten Sicherheitsstandard", isCorrect: false },
      { id: "a3", text: "Die Kombination verschiedener Authentifizierungsfaktoren erhöht die Sicherheit", isCorrect: true },
      { id: "a4", text: "Alle Zugangskontrollsysteme müssen mit dem Internet verbunden sein", isCorrect: false }
    ],
    explanation: "Die Kombination verschiedener Authentifizierungsfaktoren (Wissen: PIN-Code, Besitz: Karte, Eigenschaft: biometrische Merkmale) erhöht die Sicherheit, da mehrere Hürden überwunden werden müssen."
  },
  {
    id: "q15",
    text: "Was ist bei der Durchführung von Personenkontrollen im Eingangsbereich einer Veranstaltung zu beachten?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Kontrollen dürfen ohne Einwilligung der betroffenen Personen durchgeführt werden", isCorrect: false },
      { id: "a2", text: "Die Kontrolle muss immer durch eine Person gleichen Geschlechts erfolgen", isCorrect: false },
      { id: "a3", text: "Taschen dürfen immer ohne Zustimmung durchsucht werden", isCorrect: false },
      { id: "a4", text: "Die Kontrolle ist nur mit Einwilligung der betroffenen Person oder auf Grundlage des Hausrechts zulässig", isCorrect: true }
    ],
    explanation: "Personenkontrollen dürfen nur mit Einwilligung der betroffenen Person oder auf Grundlage des Hausrechts in Verbindung mit den Teilnahmebedingungen (z.B. auf der Eintrittskarte) durchgeführt werden."
  },
  {
    id: "q16",
    text: "Was ist bei einer Alarmanlage mit Bewegungsmeldern zu beachten?",
    category: "Sicherheitstechnik",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Die Bewegungsmelder sollten so installiert werden, dass Tiere wie Katzen oder kleine Hunde keine Fehlalarme auslösen können", isCorrect: true },
      { id: "a2", text: "Bewegungsmelder funktionieren nur bei Tageslicht", isCorrect: false },
      { id: "a3", text: "Bewegungsmelder müssen immer in Bodennähe angebracht werden", isCorrect: false },
      { id: "a4", text: "Bewegungsmelder dürfen nur in Innenräumen verwendet werden", isCorrect: false }
    ],
    explanation: "Bei der Installation von Bewegungsmeldern ist darauf zu achten, dass sie so angebracht werden, dass keine Fehlalarme durch Haustiere, Zugluft oder andere Faktoren ausgelöst werden."
  },
  {
    id: "q17",
    text: "Wie reagiert man korrekt auf eine aggressive, alkoholisierte Person?",
    category: "Umgang",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Unmittelbar körperliche Zwangsmittel einsetzen", isCorrect: false },
      { id: "a2", text: "Die Person ebenso aggressiv ansprechen, um Respekt zu erzeugen", isCorrect: false },
      { id: "a3", text: "Ruhig bleiben, Sicherheitsabstand halten und deeskalierend einwirken", isCorrect: true },
      { id: "a4", text: "Der Person den Rücken zuwenden und ignorieren", isCorrect: false }
    ],
    explanation: "Bei aggressiven, alkoholisierten Personen ist es wichtig, einen angemessenen Sicherheitsabstand zu halten, ruhig zu bleiben und deeskalierend einzuwirken. Konfrontatives Verhalten kann die Situation verschlimmern."
  },
  {
    id: "q18",
    text: "Was ist bei der Hilfeleistung für eine bewusstlose Person zu tun?",
    category: "ErsteHilfe",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Sofort mit der Herzdruckmassage beginnen", isCorrect: false },
      { id: "a2", text: "Die Person in Schocklage bringen (Beine hoch lagern)", isCorrect: false },
      { id: "a3", text: "Prüfen, ob die Person noch atmet, und bei vorhandener Atmung in die stabile Seitenlage bringen", isCorrect: true },
      { id: "a4", text: "Warten, bis ein Arzt eintrifft, und die Person nicht bewegen", isCorrect: false }
    ],
    explanation: "Bei einer bewusstlosen Person ist es wichtig, zuerst die Atmung zu überprüfen. Wenn die Person normal atmet, sollte sie in die stabile Seitenlage gebracht werden, um die Atemwege freizuhalten."
  },
  {
    id: "q19",
    text: "Was versteht man unter dem Begriff 'Notstand' gemäß § 34 StGB?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Eine Situation, in der man aus akuter Geldnot handelt", isCorrect: false },
      { id: "a2", text: "Die Abwehr eines rechtswidrigen Angriffs", isCorrect: false },
      { id: "a3", text: "Eine gegenwärtige Gefahr für ein Rechtsgut, die nur durch eine Rechtsgutsverletzung abgewendet werden kann", isCorrect: true },
      { id: "a4", text: "Jede Situation, in der man sich bedroht fühlt", isCorrect: false }
    ],
    explanation: "Der rechtfertigende Notstand nach § 34 StGB liegt vor, wenn eine gegenwärtige Gefahr für Leben, Leib, Freiheit, Ehre, Eigentum oder ein anderes Rechtsgut besteht, die nicht anders als durch eine Rechtsgutsverletzung abgewendet werden kann. Das geschützte Interesse muss dabei das beeinträchtigte wesentlich überwiegen.",
    reference: "§ 34 StGB"
  },
  {
    id: "q20",
    text: "Was ist im Umgang mit personenbezogenen Daten im Bewachungsgewerbe zu beachten?",
    category: "Datenschutz",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Personenbezogene Daten dürfen unbegrenzt gesammelt und gespeichert werden", isCorrect: false },
      { id: "a2", text: "Personenbezogene Daten dürfen nur für festgelegte, eindeutige und legitime Zwecke erhoben werden", isCorrect: true },
      { id: "a3", text: "Personenbezogene Daten dürfen ohne Einschränkungen an Dritte weitergegeben werden", isCorrect: false },
      { id: "a4", text: "Für die Verarbeitung personenbezogener Daten im Sicherheitsgewerbe gelten keine besonderen Vorschriften", isCorrect: false }
    ],
    explanation: "Gemäß der DSGVO dürfen personenbezogene Daten nur für festgelegte, eindeutige und legitime Zwecke erhoben werden und müssen dem Grundsatz der Datenminimierung entsprechen.",
    reference: "Art. 5 DSGVO"
  },
  {
    id: "q21",
    text: "Was versteht man unter 'Hausrecht'?",
    category: "Recht",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Das Recht, ein Haus zu besitzen", isCorrect: false },
      { id: "a2", text: "Das Recht des Mieters, seine Miete zu mindern", isCorrect: false },
      { id: "a3", text: "Das Recht des Besitzers oder Eigentümers, zu bestimmen, wer ein Grundstück oder Gebäude betreten darf", isCorrect: true },
      { id: "a4", text: "Das Recht, Häuser ohne Genehmigung zu bauen", isCorrect: false }
    ],
    explanation: "Das Hausrecht ist das Recht des Besitzers oder Eigentümers, zu bestimmen, wer sich in seinen Räumlichkeiten aufhalten darf und wer nicht. Es leitet sich aus dem Eigentums- und Besitzrecht ab.",
    reference: "§§ 903, 1004 BGB, § 123 StGB"
  },
  {
    id: "q22",
    text: "Was ist ein Hauptmerkmal einer guten Team-Kommunikation im Sicherheitsgewerbe?",
    category: "Umgang",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Jeder Mitarbeiter entscheidet autark ohne Absprache mit Kollegen", isCorrect: false },
      { id: "a2", text: "Klare, präzise Ansagen und Rückbestätigungen wichtiger Informationen", isCorrect: true },
      { id: "a3", text: "Kommunikation ausschließlich über schriftliche Notizen", isCorrect: false },
      { id: "a4", text: "Vermeidung von Funkgeräten, um Abhören zu verhindern", isCorrect: false }
    ],
    explanation: "Klare Kommunikation mit Rückbestätigungen wichtiger Informationen ist entscheidend für die Sicherheit im Team und die effektive Bewältigung von Aufgaben und Notfallsituationen."
  },
  {
    id: "q23",
    text: "Was ist beim Umgang mit Überwachungskameras datenschutzrechtlich zu beachten?",
    category: "Datenschutz",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Überwachungskameras dürfen nur mit Zustimmung aller überwachten Personen eingesetzt werden", isCorrect: false },
      { id: "a2", text: "Die Videoüberwachung muss durch gut sichtbare Hinweisschilder kenntlich gemacht werden", isCorrect: true },
      { id: "a3", text: "Überwachungskameras dürfen ausschließlich von der Polizei betrieben werden", isCorrect: false },
      { id: "a4", text: "Aufnahmen dürfen beliebig lange aufbewahrt werden", isCorrect: false }
    ],
    explanation: "Nach der DSGVO muss eine Videoüberwachung transparent erfolgen. Betroffene müssen über die Überwachung informiert werden, z.B. durch gut sichtbare Hinweisschilder.",
    reference: "Art. 12, 13 DSGVO"
  },
  {
    id: "q24",
    text: "Welche Aussage über Eigensicherung im Sicherheitsgewerbe ist korrekt?",
    category: "Sicherheitstechnik",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Eigensicherung ist nur in besonders gefährlichen Einsätzen relevant", isCorrect: false },
      { id: "a2", text: "Eigensicherung hat immer Vorrang vor der Aufgabenerfüllung", isCorrect: true },
      { id: "a3", text: "Eigensicherung ist die Absicherung des eigenen Heims", isCorrect: false },
      { id: "a4", text: "Eigensicherung bezieht sich ausschließlich auf die Verwendung von Schutzausrüstung", isCorrect: false }
    ],
    explanation: "Eigensicherung bedeutet, dass die Sicherheit der eigenen Person und der Kollegen stets Vorrang hat. Ohne angemessene Eigensicherung kann auch die Aufgabenerfüllung gefährdet sein."
  },
  {
    id: "q25",
    text: "Was ist bei einer starken Blutung als Erste-Hilfe-Maßnahme korrekt?",
    category: "ErsteHilfe",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Die Wunde ausspülen und desinfizieren", isCorrect: false },
      { id: "a2", text: "Direkten Druck auf die Wunde ausüben und hochhalten, wenn möglich", isCorrect: true },
      { id: "a3", text: "Ein Tourniquet (Abbindung) an der nächsten Extremität anlegen", isCorrect: false },
      { id: "a4", text: "Die Wunde mit Watte füllen, um die Blutung zu stoppen", isCorrect: false }
    ],
    explanation: "Bei starken Blutungen ist direkter Druck auf die Wunde die wichtigste Maßnahme. Wenn möglich, sollte die betroffene Extremität hochgehalten werden, um den Blutfluss zu reduzieren."
  },
  {
    id: "q26",
    text: "Was ist der Unterschied zwischen Besitz und Eigentum im juristischen Sinne?",
    category: "Recht",
    difficulty: "schwer",
    answers: [
      { id: "a1", text: "Es gibt keinen Unterschied, beide Begriffe meinen dasselbe", isCorrect: false },
      { id: "a2", text: "Besitz ist die tatsächliche Herrschaft über eine Sache, Eigentum ist das rechtliche Verhältnis zur Sache", isCorrect: true },
      { id: "a3", text: "Besitz bezieht sich auf bewegliche Sachen, Eigentum nur auf Immobilien", isCorrect: false },
      { id: "a4", text: "Besitz ist immer rechtswidrig, Eigentum immer rechtmäßig", isCorrect: false }
    ],
    explanation: "Besitz ist die tatsächliche Herrschaft einer Person über eine Sache (faktisches Verhältnis), während Eigentum das rechtliche Verhältnis zur Sache beschreibt und die umfassendste Herrschaft über eine Sache darstellt.",
    reference: "§§ 854, 903 BGB"
  },
  {
    id: "q27",
    text: "Was versteht man unter Zivilcourage im Sicherheitskontext?",
    category: "Umgang",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Die Pflicht, bei jeder Straftat sofort einzugreifen", isCorrect: false },
      { id: "a2", text: "Die private Überwachung von Nachbarn", isCorrect: false },
      { id: "a3", text: "Mutiges Eintreten für andere ohne sich selbst zu gefährden", isCorrect: true },
      { id: "a4", text: "Die Selbstjustiz bei kleineren Vergehen", isCorrect: false }
    ],
    explanation: "Zivilcourage bedeutet, dass man für andere eintritt und Hilfe leistet, ohne sich selbst unverhältnismäßig zu gefährden. Wichtig ist, Hilfe zu holen und als Zeuge zur Verfügung zu stehen."
  },
  {
    id: "q28",
    text: "Welche der folgenden Maßnahmen ist bei einem epileptischen Anfall korrekt?",
    category: "ErsteHilfe",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Die Person festhalten, um Verletzungen zu vermeiden", isCorrect: false },
      { id: "a2", text: "Einen Gegenstand zwischen die Zähne schieben", isCorrect: false },
      { id: "a3", text: "Umgebung sichern und nach dem Anfall in die stabile Seitenlage bringen", isCorrect: true },
      { id: "a4", text: "Sofort eine Herzdruckmassage beginnen", isCorrect: false }
    ],
    explanation: "Bei einem epileptischen Anfall sollte man die Umgebung sichern, damit sich die Person nicht verletzen kann. Nach dem Anfall bringt man die Person in die stabile Seitenlage. Es ist gefährlich, Gegenstände in den Mund zu schieben oder die Person festzuhalten."
  },
  {
    id: "q29",
    text: "Wie sollte ein Sicherheitsmitarbeiter auf verbale Beleidigungen reagieren?",
    category: "Umgang",
    difficulty: "mittel",
    answers: [
      { id: "a1", text: "Mit Gegenbeleidigungen reagieren, um Respekt zu erzwingen", isCorrect: false },
      { id: "a2", text: "Sofort körperlich eingreifen, um weiteren Beleidigungen vorzubeugen", isCorrect: false },
      { id: "a3", text: "Professionell bleiben, nicht provozieren lassen und deeskalierend wirken", isCorrect: true },
      { id: "a4", text: "Den Vorfall ignorieren und dem Beleidiger den Rücken zuwenden", isCorrect: false }
    ],
    explanation: "Professionelles Verhalten bedeutet, ruhig zu bleiben, sich nicht provozieren zu lassen und deeskalierend zu wirken. Beleidigungen sollten dokumentiert werden, rechtfertigen aber keinen körperlichen Eingriff."
  },
  {
    id: "q30",
    text: "Was sollte bei der Zugangskontrolle zu einer Veranstaltung beachtet werden?",
    category: "Sicherheitstechnik",
    difficulty: "leicht",
    answers: [
      { id: "a1", text: "Einlasskontrollen sollten stichprobenartig und unvorhersehbar erfolgen", isCorrect: false },
      { id: "a2", text: "Alle Personen sollten gleichermaßen und systematisch kontrolliert werden", isCorrect: true },
      { id: "a3", text: "Kontrollen sollten nur bei verdächtigen Personen durchgeführt werden", isCorrect: false },
      { id: "a4", text: "Kontrollen sind nur bei Großveranstaltungen notwendig", isCorrect: false }
    ],
    explanation: "Bei Zugangskontrollen sollten alle Personen nach dem gleichen System kontrolliert werden, um Diskriminierung zu vermeiden und die Sicherheit zu gewährleisten."
  }
];
