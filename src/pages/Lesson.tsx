import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { toast } from "sonner";

const letters = [
  { letter: "أ", name: "ألف", example: "أسد", image: "🦁" },
  { letter: "ب", name: "باء", example: "بطة", image: "🦆" },
  { letter: "ت", name: "تاء", example: "تفاحة", image: "🍎" },
];

type Activity = "listen" | "write" | "speak";

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [activity, setActivity] = useState<Activity>("listen");
  const [xpEarned, setXpEarned] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentLetter = letters[currentLetterIndex];
  const progress = ((currentLetterIndex + 1) / letters.length) * 100;

  // Safety check - if currentLetter is undefined, navigate back
  if (!currentLetter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <Card className="p-8 text-center">
          <p className="text-xl text-muted-foreground mb-4">الدرس غير متوفر</p>
          <Button onClick={() => navigate("/home")}>العودة للرئيسية</Button>
        </Card>
      </div>
    );
  }

  const handleActivityComplete = (success: boolean) => {
    setShowFeedback(true);

    if (success) {
      const earnedXp = activity === "listen" ? 1 : activity === "write" ? 2 : 3;
      setXpEarned((prev) => prev + earnedXp);
      
      toast.success("ممتاز! 🌟", {
        description: `لقد ربحت ${earnedXp} نقطة!`,
      });

      setTimeout(() => {
        setShowFeedback(false);
        if (activity === "listen") {
          setActivity("write");
        } else if (activity === "write") {
          setActivity("speak");
        } else {
          // Move to next letter or complete
          if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex((prev) => prev + 1);
            setActivity("listen");
          } else {
            handleLessonComplete();
          }
        }
      }, 1500);
    } else {
      toast.error("قريب! حاول مرة أخرى 💪");
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  const handleLessonComplete = () => {
    // Update user data
    const userData = JSON.parse(localStorage.getItem("khutwa_user") || "{}");
    userData.xp = (userData.xp || 0) + xpEarned;
    userData.streak = (userData.streak || 0) + 1;
    localStorage.setItem("khutwa_user", JSON.stringify(userData));

    toast.success("أحسنت! 🎉", {
      description: `لقد أكملت الدرس وربحت ${xpEarned} نقطة إجمالية!`,
    });

    setTimeout(() => navigate("/home"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/home")}>
            ← رجوع
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-2xl">⭐ {xpEarned}</span>
            <ProgressBar value={progress} className="w-40 h-3" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="p-8 shadow-2xl border-4 border-primary/20 bg-white/90 backdrop-blur">
          {activity === "listen" && (
            <div className="text-center space-y-6 animate-fade-in" dir="rtl">
              <h2 className="text-3xl font-bold text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                استمع وتعلم
              </h2>
              
              <div className="my-12">
                <div className={`text-[200px] animate-bounce-soft ${showFeedback ? "animate-celebrate" : ""}`}>
                  {currentLetter.letter}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-4xl font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {currentLetter.name}
                </h3>
                <div className="flex items-center justify-center gap-4 text-3xl">
                  <span>{currentLetter.image}</span>
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{currentLetter.example}</span>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant="kid"
                  size="xl"
                  onClick={() => {
                    // Simulate audio playback
                    toast.info(`🔊 ${currentLetter.name}`);
                  }}
                  className="mb-4"
                >
                  <span className="text-2xl ml-2">🔊</span>
                  استمع للنطق
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleActivityComplete(false)}
                >
                  حرف آخر؟
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => handleActivityComplete(true)}
                >
                  <span className="text-xl">فهمت! ✓</span>
                </Button>
              </div>
            </div>
          )}

          {activity === "write" && (
            <div className="text-center space-y-6 animate-fade-in" dir="rtl">
              <h2 className="text-3xl font-bold text-accent" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                ارسم الحرف
              </h2>

              <div className="my-8 p-12 bg-accent/10 rounded-3xl border-4 border-dashed border-accent/30">
                <div className="text-[150px] opacity-30 select-none">
                  {currentLetter.letter}
                </div>
              </div>

              <p className="text-xl text-muted-foreground">
                ارسم الحرف بإصبعك على الشاشة
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    toast.info("جرب مرة أخرى!");
                  }}
                >
                  مسح
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => handleActivityComplete(true)}
                >
                  <span className="text-xl">أكملت! ✓</span>
                </Button>
              </div>
            </div>
          )}

          {activity === "speak" && (
            <div className="text-center space-y-6 animate-fade-in" dir="rtl">
              <h2 className="text-3xl font-bold text-secondary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                انطق الحرف
              </h2>

              <div className="my-12">
                <div className="text-[150px] animate-float">
                  🎙️
                </div>
              </div>

              <div className="text-8xl font-bold text-primary mb-6" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {currentLetter.letter}
              </div>

              <Button
                variant="kid"
                size="xl"
                onClick={() => {
                  toast.info("جاري الاستماع... 🎤");
                  setTimeout(() => handleActivityComplete(true), 1500);
                }}
              >
                <span className="text-2xl ml-2">🎤</span>
                اضغط للنطق
              </Button>

              <p className="text-lg text-muted-foreground pt-4">
                قل الحرف بصوت عالٍ وواضح
              </p>
            </div>
          )}
        </Card>

        {/* Encouragement */}
        {showFeedback && (
          <div className="mt-6 text-center">
            <Card className="p-6 bg-primary/10 border-2 border-primary animate-celebrate">
              <p className="text-2xl font-bold text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                ممتاز! واصل التقدم! 🌟
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
