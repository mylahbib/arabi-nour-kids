import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mascot from "@/assets/mascot.png";

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
    { id: 1, title: "الحروف", icon: "🔤", locked: false, progress: 0, position: "left" },
    { id: 2, title: "المقاطع", icon: "🎵", locked: true, progress: 0, position: "right" },
    { id: 3, title: "الكلمات", icon: "📝", locked: true, progress: 0, position: "left" },
    { id: 4, title: "الجمل", icon: "💬", locked: true, progress: 0, position: "center" },
    { id: 5, title: "القراءة", icon: "📖", locked: true, progress: 0, position: "right" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background p-4 pb-20 relative overflow-hidden">
      {/* Sky & Clouds Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-70">☁️</div>
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-60" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-40 left-1/3 text-7xl animate-float opacity-50" style={{ animationDelay: '2s' }}>☁️</div>
        <div className="absolute bottom-20 right-10 text-4xl">🌳</div>
        <div className="absolute bottom-20 left-10 text-4xl">🌳</div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="p-4 mb-6 shadow-duolingo-lg border-0 bg-card/95 backdrop-blur rounded-2xl">
          <div className="flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-float">🎓</div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-primary">
                  مرحبا {user.name}!
                </h1>
                <p className="text-sm text-muted-foreground font-body">استمر في مغامرتك!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-2 min-w-[60px]">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xl font-bold text-primary">{user.streak}</div>
                <div className="text-[10px] text-muted-foreground">يوم</div>
              </div>
              <div className="text-center bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-2 min-w-[60px]">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xl font-bold text-warning">{user.xp}</div>
                <div className="text-[10px] text-muted-foreground">نقطة</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Adventure Road Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold text-primary mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            طريق المغامرات 🗺️
          </h2>
          <p className="text-lg font-body text-foreground/80">اتبع الطريق وتعلم مع صديقك!</p>
        </div>

        {/* Adventure Road Path */}
        <div className="relative py-8" dir="rtl">
          {/* Winding Path SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#007DD9', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#FF8DA1', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <path
              d="M 50 50 Q 300 100, 200 200 T 250 350 T 200 500 T 250 650"
              stroke="url(#pathGradient)"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          {/* Lesson Nodes */}
          <div className="space-y-16 relative z-10">
            {lessons.map((lesson, index) => {
              const isActive = !lesson.locked;
              const positionClass = 
                lesson.position === "left" ? "mr-auto ml-8" :
                lesson.position === "right" ? "ml-auto mr-8" :
                "mx-auto";
              
              return (
                <div key={lesson.id} className={`relative w-64 ${positionClass}`}>
                  {/* Connection Line to Next Node */}
                  {index < lessons.length - 1 && (
                    <div className="absolute top-full left-1/2 w-1 h-16 -translate-x-1/2 bg-gradient-to-b from-primary/40 to-transparent" />
                  )}

                  {/* Mascot at Current Level */}
                  {isActive && index === 0 && (
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20">
                      <img 
                        src={mascot} 
                        alt="Mascot" 
                        className="w-20 h-20 animate-bounce-soft drop-shadow-lg"
                      />
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-duolingo-md whitespace-nowrap">
                        <p className="text-sm font-body font-semibold text-primary">هيا نبدأ! 🎉</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45" />
                      </div>
                    </div>
                  )}

                  {/* Lesson Node Card */}
                   <Card
                    className={`p-6 rounded-2xl border-4 transition-all duration-300 relative ${
                      lesson.locked
                        ? "opacity-60 grayscale border-muted bg-card/50"
                        : "border-primary shadow-duolingo-lg hover:scale-105 cursor-pointer bg-card animate-pulse-glow"
                    }`}
                    onClick={() => !lesson.locked && navigate(`/lesson/${lesson.id}`)}
                  >
                    {/* Completion Badge */}
                    {!lesson.locked && lesson.progress === 100 && (
                      <Badge className="absolute -top-3 -right-3 bg-success text-success-foreground border-0 rounded-full px-3 py-1 shadow-duolingo-md">
                        ⭐ مكتمل
                      </Badge>
                    )}

                    <div className="text-center">
                      {/* Icon */}
                      <div className={`text-6xl mb-3 ${lesson.locked ? "" : "animate-float"}`}>
                        {lesson.locked ? "🔒" : lesson.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-heading font-bold mb-2 text-foreground">
                        {lesson.title}
                      </h3>

                      {/* Progress Stars */}
                      <div className="flex justify-center gap-1 mb-3">
                        {[1, 2, 3].map((star) => (
                          <span key={star} className="text-2xl">
                            {lesson.locked ? "⭐" : lesson.progress >= star * 33 ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>

                      {/* Status */}
                      <p className="text-sm font-body text-muted-foreground mb-4">
                        {lesson.locked ? "🔒 مغلق" : lesson.progress === 100 ? "✅ مكتمل" : "📚 جاهز"}
                      </p>

                      {/* Button */}
                      {!lesson.locked && (
                        <Button
                          className="w-full rounded-xl font-body font-bold text-lg shadow-duolingo-md hover:shadow-duolingo-lg transition-all"
                          size="lg"
                        >
                          {lesson.progress === 100 ? "إعادة الدرس" : "ابدأ المغامرة"}
                        </Button>
                      )}
                    </div>
                  </Card>

                  {/* Decorative Elements */}
                  {!lesson.locked && (
                    <>
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        ✨
                      </div>
                      <div className="absolute -left-8 top-1/4 text-2xl animate-float" style={{ animationDelay: `${index * 0.7}s` }}>
                        🌟
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Landscape Elements */}
          <div className="mt-16 flex justify-center gap-8 text-5xl">
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>🏆</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🎯</span>
            <span className="animate-float" style={{ animationDelay: '1.5s' }}>🎨</span>
          </div>
        </div>

        {/* Progress Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate("/progress")}
            className="text-xl font-heading rounded-2xl shadow-duolingo-lg hover:shadow-duolingo-xl transition-all px-8 py-6"
            size="lg"
          >
            <span className="text-3xl ml-2">📊</span>
            شاهد تقدمك
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
