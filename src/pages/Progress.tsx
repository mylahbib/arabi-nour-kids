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

const Progress = () => {
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

  const badges = [
    { id: 1, title: "متعلم نشيط", icon: "🏅", earned: user.xp >= 10, requirement: "10 نقاط" },
    { id: 2, title: "قارئ صغير", icon: "📚", earned: user.xp >= 50, requirement: "50 نقطة" },
    { id: 3, title: "متفوق", icon: "⭐", earned: user.xp >= 100, requirement: "100 نقطة" },
    { id: 4, title: "مثابر", icon: "🔥", earned: user.streak >= 7, requirement: "7 أيام متتالية" },
    { id: 5, title: "بطل القراءة", icon: "🏆", earned: false, requirement: "أكمل جميع الدروس" },
  ];

  const level = Math.floor(user.xp / 20) + 1;
  const xpForNextLevel = level * 20;
  const xpProgress = ((user.xp % 20) / 20) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/home")}>
            ← رجوع إلى الرئيسية
          </Button>
        </div>

        {/* Stats Card */}
        <Card className="p-8 mb-6 shadow-xl border-4 border-primary/20 bg-white/90 backdrop-blur" dir="rtl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-soft">🎓</div>
            <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              تقدم {user.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              المستوى {level} • {user.dialect === "darija" ? "الدارجة" : user.dialect === "amazigh" ? "الأمازيغية" : "الفصحى"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-primary/10 rounded-3xl">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-primary">{user.xp}</div>
              <div className="text-sm text-muted-foreground">إجمالي النقاط</div>
            </div>
            <div className="text-center p-6 bg-destructive/10 rounded-3xl">
              <div className="text-5xl mb-3">🔥</div>
              <div className="text-4xl font-bold text-destructive">{user.streak}</div>
              <div className="text-sm text-muted-foreground">يوم متتالي</div>
            </div>
            <div className="text-center p-6 bg-secondary/10 rounded-3xl">
              <div className="text-5xl mb-3">📊</div>
              <div className="text-4xl font-bold text-secondary">{level}</div>
              <div className="text-sm text-muted-foreground">المستوى الحالي</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>التقدم للمستوى التالي</span>
              <span className="font-bold">{user.xp} / {xpForNextLevel}</span>
            </div>
            <ProgressBar value={xpProgress} className="h-4" />
          </div>
        </Card>

        {/* Badges Section */}
        <Card className="p-8 shadow-xl border-4 border-secondary/20 bg-white/90 backdrop-blur" dir="rtl">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            الأوسمة والإنجازات 🏆
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={`p-6 text-center transition-all duration-300 ${
                  badge.earned
                    ? "border-2 border-primary bg-primary/5 animate-celebrate"
                    : "opacity-50 grayscale border-muted"
                }`}
              >
                <div className={`text-6xl mb-3 ${badge.earned ? "animate-float" : ""}`}>
                  {badge.earned ? badge.icon : "🔒"}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {badge.title}
                </h3>
                <p className="text-sm text-muted-foreground">{badge.requirement}</p>
                {badge.earned && (
                  <div className="mt-3 text-primary font-bold">✓ تم الحصول عليه</div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        {/* Weekly Progress */}
        <Card className="p-8 mt-6 shadow-xl border-4 border-accent/20 bg-white/90 backdrop-blur" dir="rtl">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            نشاط الأسبوع 📅
          </h2>

          <div className="grid grid-cols-7 gap-2">
            {["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day, index) => (
              <div key={day} className="text-center">
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    index < user.streak
                      ? "bg-primary text-white animate-bounce-soft"
                      : "bg-muted"
                  }`}
                >
                  {index < user.streak ? "✓" : ""}
                </div>
                <div className="text-xs">{day}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="kid" size="lg" onClick={() => navigate("/home")}>
              <span className="text-xl">واصل التعلم! 🚀</span>
            </Button>
          </div>
        </Card>

        {/* Motivational Message */}
        <div className="mt-8 text-center">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <p className="text-2xl font-bold text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              {user.xp < 20 && "أنت في البداية الرائعة! استمر! 💪"}
              {user.xp >= 20 && user.xp < 50 && "تقدم ممتاز! أنت تتحسن كل يوم! 🌟"}
              {user.xp >= 50 && "أداء مذهل! أنت نجم حقيقي! ⭐"}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
