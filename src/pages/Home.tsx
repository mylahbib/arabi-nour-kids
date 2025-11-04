import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";

interface UserData {
  name: string;
  age: string;
  dialect: string;
  xp: number;
  streak: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("khutwa_user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const lessons = [
    { id: 1, title: "الحروف", icon: "🔤", locked: false, progress: 0, color: "from-primary to-primary-glow" },
    { id: 2, title: "المقاطع", icon: "🎵", locked: true, progress: 0, color: "from-accent to-cyan-400" },
    { id: 3, title: "الكلمات", icon: "📝", locked: true, progress: 0, color: "from-secondary to-yellow-400" },
    { id: 4, title: "الجمل", icon: "💬", locked: true, progress: 0, color: "from-purple-400 to-pink-400" },
    { id: 5, title: "القراءة", icon: "📖", locked: true, progress: 0, color: "from-emerald-400 to-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/10 p-4 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6 shadow-xl border-2 border-primary/20 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-float">🎓</div>
              <div>
                <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  مرحبا {user.name}!
                </h1>
                <p className="text-muted-foreground">استمر في التعلم!</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl mb-1">🔥</div>
                <div className="text-2xl font-bold text-primary">{user.streak}</div>
                <div className="text-xs text-muted-foreground">يوم متتالي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1">⭐</div>
                <div className="text-2xl font-bold text-secondary">{user.xp}</div>
                <div className="text-xs text-muted-foreground">نقطة</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Path */}
        <div className="space-y-4" dir="rtl">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            رحلة التعلم 🗺️
          </h2>

          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="relative">
              {/* Connection line */}
              {index < lessons.length - 1 && (
                <div className="absolute right-[50%] top-[100%] w-1 h-8 bg-gradient-to-b from-primary/30 to-transparent transform translate-x-1/2" />
              )}

              <Card
                className={`p-6 shadow-lg border-2 transition-all duration-300 ${
                  lesson.locked
                    ? "opacity-60 grayscale border-muted"
                    : "border-primary/30 hover:border-primary hover:scale-[1.02] cursor-pointer animate-bounce-soft"
                }`}
                onClick={() => !lesson.locked && navigate(`/lesson/${lesson.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-6xl ${lesson.locked ? "" : "animate-float"}`}>
                      {lesson.locked ? "🔒" : lesson.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {lesson.title}
                      </h3>
                      <ProgressBar value={lesson.progress} className="h-3" />
                      <p className="text-sm text-muted-foreground mt-1">
                        {lesson.locked ? "مغلق" : `${lesson.progress}% مكتمل`}
                      </p>
                    </div>
                  </div>

                  {!lesson.locked && (
                    <Button
                      variant="kid"
                      size="lg"
                      className="mr-4"
                    >
                      ابدأ
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Progress Button */}
        <div className="mt-8 text-center">
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate("/progress")}
            className="text-xl"
          >
            <span className="text-2xl ml-2">📊</span>
            شاهد تقدمك
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
