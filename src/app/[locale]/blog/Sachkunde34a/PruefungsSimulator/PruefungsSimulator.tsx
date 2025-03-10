"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, ChevronRight, HelpCircle, RefreshCw, Timer, ClipboardList, Shield } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Importieren der Fragen-Datenbank
import { questionData, Question } from './questionData';

// Prüfungsmodi
type PruefungsModus = 'Training' | 'Simulation' | 'Themenbereich' | 'Schwierigkeit';

// Hauptkomponente für den Prüfungssimulator
const PruefungsSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('modus');
  const [selectedModus, setSelectedModus] = useState<PruefungsModus>('Training');
  const [selectedCategory, setSelectedCategory] = useState<Question['category'] | 'Alle'>('Alle');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Question['difficulty'] | 'Alle'>('Alle');
  
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    timeSpent: 0
  });
  const [testActive, setTestActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Funktion zum Filtern der Fragen je nach gewähltem Modus
  const filterQuestions = () => {
    let filteredQuestions = [...questionData];

    if (selectedModus === 'Themenbereich' && selectedCategory !== 'Alle') {
      filteredQuestions = filteredQuestions.filter(q => q.category === selectedCategory);
    }

    if (selectedModus === 'Schwierigkeit' && selectedDifficulty !== 'Alle') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === selectedDifficulty);
    }

    // Zufällige Auswahl und Reihenfolge für den Test
    return filteredQuestions.sort(() => Math.random() - 0.5).slice(0, selectedModus === 'Simulation' ? 30 : 10);
  };

  // Prüfung starten
  const startTest = () => {
    const questions = filterQuestions();
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setScoreData({
      correct: 0,
      incorrect: 0,
      total: questions.length,
      timeSpent: 0
    });
    setTestActive(true);
    setShowResults(false);
    setTimeRemaining(selectedModus === 'Simulation' ? 60 * 60 : 0); // 60 Minuten für Simulationsmodus
    setActiveTab('pruefung');
  };

  // Timer-Effekt
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (testActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (selectedModus === 'Simulation') {
              // Bei Zeitablauf zur Ergebnisseite
              endTest();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Zeitmessung für die Statistik
    if (testActive && selectedModus !== 'Simulation') {
      timer = setInterval(() => {
        setScoreData(prev => ({
          ...prev,
          timeSpent: prev.timeSpent + 1
        }));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testActive, timeRemaining, selectedModus]);

  // Antwort überprüfen
  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = currentQuestion.answers.find(a => a.id === selectedAnswer)?.isCorrect;
    
    setScoreData(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));
    
    setAnswerSubmitted(true);
  };

  // Zur nächsten Frage
  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
    } else {
      endTest();
    }
  };

  // Test beenden
  const endTest = () => {
    setTestActive(false);
    setShowResults(true);
    setActiveTab('ergebnis');
  };

  // Timer-Anzeige formatieren
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Bestandene/Nicht bestandene Anzeige
  const isPassed = () => {
    const percentageCorrect = (scoreData.correct / scoreData.total) * 100;
    return percentageCorrect >= 50; // Annahme: 50% sind zum Bestehen erforderlich
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            34a Sachkundeprüfungs-Simulator
          </CardTitle>
          <CardDescription>
            Bereiten Sie sich optimal auf Ihre 34a Sachkundeprüfung vor
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue={activeTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="modus" disabled={testActive}>Prüfungsmodus</TabsTrigger>
              <TabsTrigger value="pruefung" disabled={!testActive && !showResults}>Prüfung</TabsTrigger>
              <TabsTrigger value="ergebnis" disabled={!showResults}>Ergebnis</TabsTrigger>
            </TabsList>

            {/* Modus-Auswahl */}
            <TabsContent value="modus">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Wählen Sie Ihren Prüfungsmodus</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all ${selectedModus === 'Training' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                      onClick={() => setSelectedModus('Training')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Trainingsmodus</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">10 zufällige Fragen ohne Zeitbegrenzung. Ideal zum Üben.</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${selectedModus === 'Simulation' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                      onClick={() => setSelectedModus('Simulation')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Prüfungssimulation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">30 Fragen in 60 Minuten. Reale Prüfungsbedingungen.</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${selectedModus === 'Themenbereich' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                      onClick={() => setSelectedModus('Themenbereich')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Nach Themenbereich</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Gezieltes Üben bestimmter Themenbereiche.</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all ${selectedModus === 'Schwierigkeit' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                      onClick={() => setSelectedModus('Schwierigkeit')}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Nach Schwierigkeit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Üben mit leichten, mittleren oder schweren Fragen.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Zusatzoptionen je nach Modus */}
                {selectedModus === 'Themenbereich' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Wählen Sie einen Themenbereich</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Button 
                        variant={selectedCategory === 'Alle' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Alle')}
                        className="justify-start"
                      >
                        Alle Themenbereiche
                      </Button>
                      <Button 
                        variant={selectedCategory === 'Recht' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Recht')}
                        className="justify-start"
                      >
                        Rechtskunde
                      </Button>
                      <Button 
                        variant={selectedCategory === 'Sicherheitstechnik' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Sicherheitstechnik')}
                        className="justify-start"
                      >
                        Sicherheitstechnik
                      </Button>
                      <Button 
                        variant={selectedCategory === 'Umgang' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Umgang')}
                        className="justify-start"
                      >
                        Umgang mit Menschen
                      </Button>
                      <Button 
                        variant={selectedCategory === 'Notwehr' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Notwehr')}
                        className="justify-start"
                      >
                        Notwehr/Nothilfe
                      </Button>
                      <Button 
                        variant={selectedCategory === 'Datenschutz' ? "default" : "outline"}
                        onClick={() => setSelectedCategory('Datenschutz')}
                        className="justify-start"
                      >
                        Datenschutz
                      </Button>
                    </div>
                  </div>
                )}

                {selectedModus === 'Schwierigkeit' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Wählen Sie die Schwierigkeitsstufe</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button 
                        variant={selectedDifficulty === 'Alle' ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty('Alle')}
                      >
                        Alle Stufen
                      </Button>
                      <Button 
                        variant={selectedDifficulty === 'leicht' ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty('leicht')}
                      >
                        Leicht
                      </Button>
                      <Button 
                        variant={selectedDifficulty === 'mittel' ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty('mittel')}
                      >
                        Mittel
                      </Button>
                      <Button 
                        variant={selectedDifficulty === 'schwer' ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty('schwer')}
                      >
                        Schwer
                      </Button>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={startTest} className="px-8">
                    Prüfung starten
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Prüfungsbereich */}
            <TabsContent value="pruefung">
              {testActive && currentQuestionIndex < currentQuestions.length && (
                <div className="space-y-6">
                  {/* Fortschrittsanzeige */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-muted-foreground">
                      Frage {currentQuestionIndex + 1} von {currentQuestions.length}
                    </div>
                    {selectedModus === 'Simulation' && (
                      <div className={`flex items-center gap-1 ${timeRemaining < 300 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        <Timer className="w-4 h-4" />
                        <span>{formatTime(timeRemaining)}</span>
                      </div>
                    )}
                  </div>
                  <Progress value={(currentQuestionIndex / currentQuestions.length) * 100} className="h-2" />

                  {/* Frage und Kategorie */}
                  <div>
                    <Badge 
                      variant="outline" 
                      className={`mb-2 ${
                        currentQuestions[currentQuestionIndex].category === 'Recht' ? 'border-blue-500 text-blue-700' :
                        currentQuestions[currentQuestionIndex].category === 'Sicherheitstechnik' ? 'border-purple-500 text-purple-700' :
                        currentQuestions[currentQuestionIndex].category === 'Umgang' ? 'border-green-500 text-green-700' :
                        currentQuestions[currentQuestionIndex].category === 'Notwehr' ? 'border-red-500 text-red-700' :
                        currentQuestions[currentQuestionIndex].category === 'Datenschutz' ? 'border-teal-500 text-teal-700' :
                        'border-amber-500 text-amber-700'
                      }`}
                    >
                      {currentQuestions[currentQuestionIndex].category}
                    </Badge>
                    
                    <h2 className="text-xl font-semibold mb-6">
                      {currentQuestions[currentQuestionIndex].text}
                    </h2>
                  </div>

                  {/* Antwortoptionen */}
                  <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {currentQuestions[currentQuestionIndex].answers.map((answer) => (
                        <div
                          key={answer.id}
                          className={`flex items-start space-x-2 p-4 border rounded-lg transition-all ${
                            answerSubmitted && answer.id === selectedAnswer
                              ? answer.isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          } ${
                            answerSubmitted && answer.isCorrect && answer.id !== selectedAnswer
                              ? "border-green-500 bg-green-50"
                              : ""
                          }`}
                        >
                          <RadioGroupItem
                            value={answer.id}
                            id={answer.id}
                            disabled={answerSubmitted}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={answer.id}
                              className={`block text-base font-medium ${
                                answerSubmitted && answer.isCorrect ? "text-green-700" : ""
                              }`}
                            >
                              {answer.text}
                            </Label>
                            
                            {answerSubmitted && answer.id === selectedAnswer && answer.explanation && (
                              <p className={`mt-2 text-sm ${answer.isCorrect ? "text-green-600" : "text-red-600"}`}>
                                {answer.explanation}
                              </p>
                            )}
                          </div>
                          
                          {answerSubmitted && (
                            <div className="ml-2">
                              {answer.isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : answer.id === selectedAnswer ? (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  {/* Hinweis, falls vorhanden */}
                  {!answerSubmitted && currentQuestions[currentQuestionIndex].hint && (
                    <div className="flex items-start mt-4 text-sm text-muted-foreground">
                      <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tipp: {currentQuestions[currentQuestionIndex].hint}</span>
                    </div>
                  )}

                  {/* Erklärung nach Beantwortung */}
                  {answerSubmitted && currentQuestions[currentQuestionIndex].explanation && (
                    <Alert className="mt-4">
                      <AlertTitle>Erklärung</AlertTitle>
                      <AlertDescription>
                        {currentQuestions[currentQuestionIndex].explanation}
                        {currentQuestions[currentQuestionIndex].reference && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Referenz: {currentQuestions[currentQuestionIndex].reference}
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Aktions-Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={endTest}
                    >
                      Prüfung beenden
                    </Button>
                    
                    {!answerSubmitted ? (
                      <Button 
                        onClick={checkAnswer}
                        disabled={!selectedAnswer}
                      >
                        Antwort prüfen
                      </Button>
                    ) : (
                      <Button onClick={nextQuestion}>
                        {currentQuestionIndex < currentQuestions.length - 1 ? (
                          <>
                            Nächste Frage <ChevronRight className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          "Zur Auswertung"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Ergebnisbereich */}
            <TabsContent value="ergebnis">
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center rounded-full p-4 bg-primary/10 mb-4">
                      {isPassed() ? (
                        <CheckCircle className="h-12 w-12 text-green-500" />
                      ) : (
                        <AlertCircle className="h-12 w-12 text-red-500" />
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {isPassed() ? "Bestanden!" : "Nicht bestanden"}
                    </h2>
                    <p className="text-muted-foreground">
                      {isPassed()
                        ? "Glückwunsch! Sie haben die Prüfung erfolgreich absolviert."
                        : "Leider haben Sie die Mindestanforderungen nicht erreicht. Versuchen Sie es erneut."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Korrekt</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{scoreData.correct}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Falsch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{scoreData.incorrect}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Erfolgsquote</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {Math.round((scoreData.correct / scoreData.total) * 100)}%
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Zeit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{formatTime(scoreData.timeSpent)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert className={isPassed() ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
                    <AlertTitle className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      {isPassed() ? "Prüfungshinweis" : "Lernempfehlung"}
                    </AlertTitle>
                    <AlertDescription>
                      {isPassed()
                        ? "In der realen §34a Sachkundeprüfung müssen Sie eine Erfolgsquote von mindestens 50% erreichen. Neben diesem schriftlichen Teil gibt es auch einen mündlichen Prüfungsteil."
                        : "Konzentrieren Sie sich besonders auf die Themenbereiche, in denen Sie Fehler gemacht haben. Nutzen Sie unsere Lernmaterialien, um diese Bereiche zu vertiefen."}
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setActiveTab('modus');
                        setShowResults(false);
                      }}
                    >
                      Zurück zur Auswahl
                    </Button>
                    <Button 
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => {
                        startTest();  // Prüfung neu starten mit den gleichen Einstellungen
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Nochmal versuchen
                    </Button>
                  </div>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-muted/50 border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            <p>Die Übungsfragen entsprechen dem aktuellen Prüfungsstandard gemäß §34a GewO. Regelmäßige Updates garantieren aktuelle Inhalte.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PruefungsSimulator;