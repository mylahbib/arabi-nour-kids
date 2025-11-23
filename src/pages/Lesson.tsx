import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { toast } from "sonner";

import rabbitAlif from "@/assets/rabbit-alif.jpg";
import lessonsData from "@/data/lessons.json";

// Get all letters from JSON
const allLetters = lessonsData.unit1.lessons.map((lesson) => ({
  id: lesson.id,
  letter: lesson.letter,
  name: lesson.name,
  example: lesson.example,
  // Use the uploaded image for Alif, otherwise use emoji
  image: lesson.letter === "أ" ? rabbitAlif : lesson.image,
  order: lesson.order,
}));

type LessonStep =
  | "intro_screen"
  | "show_letter"
  | "show_image"
  | "game_find_letter"
  | "game_match_letter"
  | "game_trace_letter"
  | "game_bubble_letter"
  | "speak_letter"
  | "review_screen"
  | "completion_screen";

const lessonFlow: LessonStep[] = [
  "intro_screen",
  "show_letter",
  "show_image",
  "game_find_letter",
  "game_match_letter",
  "game_trace_letter",
  "game_bubble_letter",
  "speak_letter",
  "review_screen",
  "completion_screen",
];

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);
  const [bubbles, setBubbles] = useState<Array<{ id: number; letter: string; left: number; delay: number }>>([]);

  const currentStep = lessonFlow[currentStepIndex];

  // Find the letter based on lesson ID from URL params
  // Default to first letter if no ID or not found
  const currentLetter = allLetters.find((letter) => letter.id === id) || allLetters[0];
  const progress = ((currentStepIndex + 1) / lessonFlow.length) * 100;

  // Auto-advance function
  const advanceToNextStep = (delay: number = 2000) => {
    setTimeout(() => {
      if (currentStepIndex < lessonFlow.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }, delay);
  };

  // Safety check
  if (!currentLetter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky via-background to-grass/20 p-4">
        <Card className="p-6 sm:p-8 text-center max-w-md mx-auto">
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">الدرس غير متوفر</p>
          <Button onClick={() => navigate("/home")} size="lg">
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  // Auto-advance for intro, show_letter, show_image, and review screens
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentStep === "intro_screen") {
      // Play intro sound
      toast.info("🎵 مرحباً بك!");
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 3000);
    } else if (currentStep === "show_letter") {
      // Play letter pronunciation automatically
      setTimeout(() => {
        toast.info(`🔊 ${currentLetter.name}`);
      }, 500);
      // Auto-advance after showing letter
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 4000);
    } else if (currentStep === "show_image") {
      // Play word pronunciation automatically
      setTimeout(() => {
        toast.info(`🔊 ${currentLetter.example}`);
      }, 500);
      // Auto-advance after showing image
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 4000);
    } else if (currentStep === "review_screen") {
      // Play review sound
      setTimeout(() => {
        toast.info(`🔊 ${currentLetter.letter} ... ${currentLetter.example}`);
      }, 500);
      // Auto-advance to completion
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, currentLetter]);

  // Initialize bubbles for bubble game
  useEffect(() => {
    if (currentStep === "game_bubble_letter") {
      // Get 2 random wrong letters
      const wrongLetters = allLetters
        .filter((l) => l.letter !== currentLetter.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((l) => l.letter);

      // Create bubble array: 3 correct letters + 2 wrong letters
      const letters = [
        currentLetter.letter,
        wrongLetters[0],
        currentLetter.letter,
        wrongLetters[1],
        currentLetter.letter,
      ];

      const newBubbles = letters.map((letter, idx) => ({
        id: idx,
        letter,
        left: Math.random() * 80 + 10, // 10-90%
        delay: Math.random() * 2,
      }));
      setBubbles(newBubbles);
      setPoppedBubbles([]);
    }
  }, [currentStep, currentLetter]);

  const handleStepComplete = (earnedXp: number = 5) => {
    setXpEarned((prev) => prev + earnedXp);
    toast.success("ممتاز! 🌟", {
      description: `لقد ربحت ${earnedXp} نقطة!`,
    });
    advanceToNextStep();
  };

  const handleLessonComplete = () => {
    const userData = JSON.parse(localStorage.getItem("khutwa_user") || "{}");
    userData.xp = (userData.xp || 0) + xpEarned;
    userData.streak = (userData.streak || 0) + 1;

    // Track completed lessons
    if (!userData.completedLessons) {
      userData.completedLessons = [];
    }

    // Add current lesson to completed if not already there
    if (!userData.completedLessons.includes(currentLetter.id)) {
      userData.completedLessons.push(currentLetter.id);
    }

    // Unlock next lesson
    const currentIndex = allLetters.findIndex((l) => l.id === currentLetter.id);
    if (currentIndex !== -1 && currentIndex < allLetters.length - 1) {
      const nextLesson = allLetters[currentIndex + 1];
      if (!userData.completedLessons.includes(nextLesson.id)) {
        // Ensure next lesson is accessible (not in completed but unlocked)
        toast.info(`🎓 الدرس التالي متاح الآن: ${nextLesson.letter}`);
      }
    }

    localStorage.setItem("khutwa_user", JSON.stringify(userData));

    toast.success("أحسنت! 🎉", {
      description: `لقد أكملت الدرس وربحت ${xpEarned} نقطة إجمالية!`,
    });
  };

  const handleBubblePop = (id: number, letter: string) => {
    if (letter === currentLetter.letter && !poppedBubbles.includes(id)) {
      setPoppedBubbles((prev) => [...prev, id]);

      // Check if all correct bubbles are popped
      const correctBubbles = bubbles.filter((b) => b.letter === currentLetter.letter);
      if (poppedBubbles.length + 1 >= correctBubbles.length) {
        handleStepComplete(10);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky via-background to-grass/20 p-2 sm:p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
            className="text-sm sm:text-base px-3 sm:px-4"
            size="sm"
          >
            ← رجوع
          </Button>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xl sm:text-2xl">⭐ {xpEarned}</span>
            <ProgressBar value={progress} className="w-24 sm:w-40 h-2 sm:h-3" />
          </div>
        </div>

        {/* Main Content Card - Responsive */}
        <Card className="p-4 sm:p-6 md:p-8 shadow-2xl border-4 border-primary/20 bg-white/95 backdrop-blur min-h-[60vh] flex items-center justify-center">

          {/* 1. INTRO SCREEN */}
          {currentStep === "intro_screen" && (
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in w-full" dir="rtl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                مرحباً بك في درس جديد! 🎉
              </div>

              <div className="my-6 sm:my-8 md:my-12">
                <div className="text-6xl sm:text-8xl md:text-9xl animate-float">
                  🐰
                </div>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-md mx-auto px-4">
                سنتعلم اليوم حرف الألف مع أصدقائنا المرحين!
              </p>

              <div className="pt-4 sm:pt-6">
                <div className="text-base sm:text-lg text-muted-foreground animate-pulse">
                  جاري التحضير...
                </div>
              </div>
            </div>
          )}

          {/* 2. SHOW LETTER SCREEN */}
          {currentStep === "show_letter" && (
            <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                هذا هو الحرف
              </div>

              <div className="relative my-6 sm:my-8 md:my-12">
                <div
                  className="text-[clamp(120px,25vw,200px)] font-bold animate-pop-in text-primary"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  onClick={() => {
                    toast.info(`🔊 ${currentLetter.name}`);
                  }}
                >
                  {currentLetter.letter}
                </div>

                {/* Sparkles */}
                <div className="absolute top-0 right-0 text-3xl sm:text-4xl md:text-5xl animate-sparkle">✨</div>
                <div className="absolute bottom-0 left-0 text-3xl sm:text-4xl md:text-5xl animate-sparkle" style={{ animationDelay: "0.3s" }}>✨</div>
                <div className="absolute top-1/2 right-1/4 text-2xl sm:text-3xl md:text-4xl animate-sparkle" style={{ animationDelay: "0.6s" }}>⭐</div>
              </div>

              <Button
                variant="kid"
                size="lg"
                onClick={() => {
                  toast.info(`🔊 ${currentLetter.name}`);
                }}
                className="text-lg sm:text-xl md:text-2xl px-6 sm:px-8 py-4 sm:py-6 h-auto"
              >
                <span className="text-3xl sm:text-4xl ml-2">🔊</span>
                اضغط للاستماع
              </Button>
            </div>
          )}

          {/* 3. SHOW IMAGE SCREEN */}
          {currentStep === "show_image" && (
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                كلمة تبدأ بحرف {currentLetter.letter}
              </div>

              <div className="my-6 sm:my-8 md:my-12 animate-zoom-in">
                {typeof currentLetter.image === "string" && currentLetter.image.startsWith("�") ? (
                  <div className="text-[clamp(100px,20vw,180px)] animate-wiggle">
                    {currentLetter.image}
                  </div>
                ) : (
                  <img
                    src={currentLetter.image}
                    alt={currentLetter.example}
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto rounded-3xl object-cover shadow-2xl animate-wiggle"
                  />
                )}
              </div>

              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {currentLetter.example}
              </div>

              <Button
                variant="kid"
                size="lg"
                onClick={() => {
                  toast.info(`🔊 ${currentLetter.example}`);
                }}
                className="text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 h-auto"
              >
                <span className="text-3xl sm:text-4xl ml-2">🔊</span>
                استمع للكلمة
              </Button>
            </div>
          )}

          {/* 4. GAME 1: FIND THE CORRECT LETTER */}
          {currentStep === "game_find_letter" && (
            <div className="text-center space-y-6 sm:space-y-8 w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                اختر الحرف الصحيح
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
                {(() => {
                  // Generate 2 random wrong letters
                  const wrongLetters = allLetters
                    .filter((l) => l.letter !== currentLetter.letter)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 2)
                    .map((l) => l.letter);

                  // Create array with correct letter in random position
                  const options = [wrongLetters[0], currentLetter.letter, wrongLetters[1]];

                  return options.map((letter) => (
                    <Button
                      key={letter}
                      variant="outline"
                      onClick={() => {
                        if (letter === currentLetter.letter) {
                          handleStepComplete(10);
                        } else {
                          toast.error("حاول مرة أخرى! 💪");
                        }
                      }}
                      className="h-32 sm:h-40 md:h-48 text-6xl sm:text-7xl md:text-8xl font-bold hover:scale-105 active:scale-95 transition-transform border-4 hover:border-primary hover:bg-primary/10"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {letter}
                    </Button>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* 5. GAME 2: DRAG THE LETTER */}
          {currentStep === "game_match_letter" && (
            <div className="text-center space-y-6 sm:space-y-8 w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                اسحب الحرف إلى الصورة
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4">
                {/* Draggable Letter */}
                <div
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  className="text-6xl sm:text-7xl md:text-8xl font-bold bg-primary/10 border-4 border-primary rounded-3xl p-6 sm:p-8 cursor-move hover:scale-110 active:scale-95 transition-transform"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {currentLetter.letter}
                </div>

                {/* Drop Zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleStepComplete(10);
                  }}
                  onClick={() => handleStepComplete(10)} // Touch fallback
                  className="relative border-4 border-dashed border-accent/50 rounded-3xl p-4 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer"
                >
                  {typeof currentLetter.image === "string" && currentLetter.image.startsWith("�") ? (
                    <div className="text-[clamp(80px,15vw,120px)]">
                      {currentLetter.image}
                    </div>
                  ) : (
                    <img
                      src={currentLetter.image}
                      alt={currentLetter.example}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl object-cover"
                    />
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground px-4">
                أو اضغط على الحرف ثم الصورة
              </p>
            </div>
          )}

          {/* 6. GAME 3: TRACE THE LETTER */}
          {currentStep === "game_trace_letter" && (
            <div className="text-center space-y-6 sm:space-y-8 w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                ارسم الحرف بإصبعك
              </div>

              <div className="relative mx-auto max-w-md">
                <div
                  className={`relative p-8 sm:p-12 bg-accent/5 rounded-3xl border-4 ${
                    traceProgress >= 100 ? "border-success animate-pulse-glow" : "border-dashed border-accent/30"
                  }`}
                  onMouseDown={() => setIsTracing(true)}
                  onMouseUp={() => setIsTracing(false)}
                  onMouseMove={() => {
                    if (isTracing && traceProgress < 100) {
                      setTraceProgress((prev) => Math.min(prev + 5, 100));
                    }
                  }}
                  onTouchStart={() => setIsTracing(true)}
                  onTouchEnd={() => {
                    setIsTracing(false);
                    if (traceProgress >= 100) {
                      handleStepComplete(15);
                    }
                  }}
                  onTouchMove={() => {
                    if (isTracing && traceProgress < 100) {
                      setTraceProgress((prev) => Math.min(prev + 5, 100));
                    }
                  }}
                >
                  <div
                    className={`text-[clamp(100px,20vw,180px)] font-bold select-none transition-all ${
                      traceProgress >= 100 ? "text-warning animate-glow" : "text-gray-300"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {currentLetter.letter}
                  </div>
                </div>

                <div className="mt-4">
                  <ProgressBar value={traceProgress} className="h-3 sm:h-4" />
                  <p className="text-sm sm:text-base text-muted-foreground mt-2">
                    {traceProgress >= 100 ? "رائع! 🌟" : `${Math.floor(traceProgress)}%`}
                  </p>
                </div>
              </div>

              {traceProgress < 100 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTraceProgress(0)}
                  className="mt-4"
                >
                  إعادة المحاولة
                </Button>
              )}
            </div>
          )}

          {/* 7. GAME 4: BUBBLE LETTERS */}
          {currentStep === "game_bubble_letter" && (
            <div className="relative text-center w-full h-[60vh] sm:h-[70vh] overflow-hidden" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-4 sm:mb-6 animate-bounce-soft relative z-10" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                انقر على الفقاعات التي تحتوي على حرف {currentLetter.letter}
              </div>

              {/* Bubbles */}
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className={`absolute text-4xl sm:text-5xl md:text-6xl font-bold cursor-pointer select-none ${
                    poppedBubbles.includes(bubble.id) ? "animate-bubble-pop pointer-events-none" : "animate-bubble-float"
                  }`}
                  style={{
                    left: `${bubble.left}%`,
                    animationDelay: `${bubble.delay}s`,
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                  }}
                  onClick={() => handleBubblePop(bubble.id, bubble.letter)}
                >
                  <div className={`bg-gradient-to-br ${
                    bubble.letter === currentLetter.letter
                      ? "from-primary/30 to-primary/60"
                      : "from-muted/30 to-muted/60"
                  } rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border-4 border-white/50 shadow-xl`}>
                    {bubble.letter}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-base sm:text-lg text-muted-foreground bg-white/90 px-4 py-2 rounded-full z-10">
                {poppedBubbles.length} / {bubbles.filter((b) => b.letter === currentLetter.letter).length}
              </div>
            </div>
          )}

          {/* 8. SPEAK LETTER SCREEN */}
          {currentStep === "speak_letter" && (
            <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                الآن دورك!
              </div>

              <div className="my-6 sm:my-8 md:my-12">
                <div className="text-[clamp(100px,20vw,180px)] animate-float">
                  🎙️
                </div>
              </div>

              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-6 sm:mb-8" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {currentLetter.letter}
              </div>

              <Button
                variant="kid"
                size="lg"
                onClick={() => {
                  toast.info("جاري الاستماع... 🎤");
                  setTimeout(() => handleStepComplete(10), 1500);
                }}
                className="text-lg sm:text-xl md:text-2xl px-6 sm:px-8 py-4 sm:py-6 h-auto"
              >
                <span className="text-3xl sm:text-4xl ml-2">🎤</span>
                اضغط وانطق الحرف
              </Button>

              <p className="text-base sm:text-lg text-muted-foreground pt-4 px-4">
                قل الحرف بصوت عالٍ وواضح
              </p>
            </div>
          )}

          {/* 9. REVIEW SCREEN */}
          {currentStep === "review_screen" && (
            <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in w-full" dir="rtl">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                لنراجع ما تعلمناه
              </div>

              <div className="my-6 sm:my-8 md:my-12 relative">
                <div className="text-[clamp(100px,20vw,150px)] font-bold animate-morph text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {currentLetter.letter}
                </div>

                <div className="text-4xl sm:text-5xl md:text-6xl mt-4 sm:mt-6 animate-zoom-in" style={{ animationDelay: "0.8s" }}>
                  ⬇️
                </div>

                <div className="mt-4 sm:mt-6 animate-zoom-in" style={{ animationDelay: "1.5s" }}>
                  {typeof currentLetter.image === "string" && currentLetter.image.startsWith("�") ? (
                    <div className="text-[clamp(80px,15vw,120px)]">
                      {currentLetter.image}
                    </div>
                  ) : (
                    <img
                      src={currentLetter.image}
                      alt={currentLetter.example}
                      className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto rounded-3xl object-cover shadow-2xl"
                    />
                  )}
                </div>
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary animate-bounce-soft" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {currentLetter.letter} ... {currentLetter.example}
              </div>

              <div className="pt-4 text-base sm:text-lg text-muted-foreground animate-pulse">
                جاري الانتقال إلى الختام...
              </div>
            </div>
          )}

          {/* 10. COMPLETION SCREEN */}
          {currentStep === "completion_screen" && (
            <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in w-full relative" dir="rtl">
              {/* Confetti Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl sm:text-3xl md:text-4xl animate-confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  >
                    {["🎉", "⭐", "🌟", "✨", "🎊"][Math.floor(Math.random() * 5)]}
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-success animate-celebrate" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  أحسنت! لقد أكملت الدرس! 🎉
                </div>

                <div className="my-6 sm:my-8 md:my-12">
                  <div className="text-[clamp(100px,20vw,150px)] animate-bounce-soft">
                    🏆
                  </div>
                </div>

                <div className="bg-gradient-to-r from-warning/20 via-success/20 to-primary/20 rounded-3xl p-6 sm:p-8 md:p-10 max-w-md mx-auto border-4 border-success/30 shadow-2xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    ⭐ {xpEarned} نقطة
                  </div>
                  <div className="text-lg sm:text-xl text-muted-foreground">
                    لقد تعلمت حرف {currentLetter.letter} بنجاح!
                  </div>
                </div>

                <div className="pt-6 sm:pt-8">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => {
                      handleLessonComplete();
                      setTimeout(() => navigate("/home"), 1000);
                    }}
                    className="text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-6 h-auto animate-pulse-glow"
                  >
                    الدرس التالي 🚀
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Lesson;
