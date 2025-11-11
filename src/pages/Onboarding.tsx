import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import mascot from "@/assets/mascot.png";

type Dialect = "darija" | "amazigh" | "fusha";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"start" | "dialect" | "info">("start");
  const [dialect, setDialect] = useState<Dialect | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleDialectSelect = (selectedDialect: Dialect) => {
    setDialect(selectedDialect);
    setStep("info");
  };

  const handleStart = () => {
    if (name && age && dialect) {
      localStorage.setItem("khutwa_user", JSON.stringify({ name, age, dialect, xp: 0, streak: 0 }));
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent/20 to-secondary/20">
      <div className="w-full max-w-2xl">
        {step === "start" ? (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <img src={mascot} alt="Mascot" className="w-48 mx-auto mb-6 animate-bounce-soft" />
            </div>

            <Card 
              className="p-8 shadow-2xl border-4 border-primary/20 relative overflow-hidden bg-white/95 backdrop-blur-sm"
              style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'overlay'
              }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  مرحبا بك في خطوة
                </h2>
                <p className="text-xl text-muted-foreground mb-8">ابدأ رحلتك في تعلم العربية</p>
                
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full group hover:bg-background"
                    onClick={() => setStep("dialect")}
                  >
                    <svg className="w-6 h-6 ml-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xl">تسجيل الدخول بجوجل</span>
                  </Button>

                  <Button
                    variant="kid"
                    size="xl"
                    className="w-full"
                    onClick={() => setStep("dialect")}
                  >
                    <span className="text-2xl ml-2">👤</span>
                    <span className="text-xl">الدخول كضيف</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : step === "dialect" ? (
          <div className="text-center animate-fade-in">
            <div className="mb-8 animate-float">
              <div className="text-8xl mb-4">📚</div>
              <h1 className="text-5xl font-bold mb-3 text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                مرحبا بك في خطوة
              </h1>
              <p className="text-xl text-muted-foreground">تعلم أساسيات اللغة العربية</p>
            </div>

            <Card className="p-8 shadow-2xl border-4 border-primary/20">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                اختر لهجتك المفضلة
              </h2>
              <div className="grid gap-4">
                <Button
                  variant="kid"
                  size="xl"
                  onClick={() => handleDialectSelect("darija")}
                  className="group"
                >
                  <span className="text-3xl ml-3">🇲🇦</span>
                  <span className="text-2xl">الدارجة المغربية</span>
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => handleDialectSelect("amazigh")}
                  className="group"
                >
                  <span className="text-3xl ml-3">ⵣ</span>
                  <span className="text-2xl">الأمازيغية</span>
                </Button>
                <Button
                  variant="accent"
                  size="xl"
                  onClick={() => handleDialectSelect("fusha")}
                  className="group"
                >
                  <span className="text-3xl ml-3">🌟</span>
                  <span className="text-2xl">الفصحى</span>
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="text-7xl mb-4 animate-bounce-soft">👋</div>
              <h2 className="text-4xl font-bold mb-2 text-primary" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                أهلا وسهلا!
              </h2>
              <p className="text-xl text-muted-foreground">نحن سعداء بلقائك</p>
            </div>

            <Card className="p-8 shadow-2xl border-4 border-primary/20">
              <div className="space-y-6 text-right" dir="rtl">
                <div>
                  <label className="block text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    ما اسمك؟
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl h-16 text-center border-2 border-primary/30 focus:border-primary rounded-3xl"
                    placeholder="اكتب اسمك هنا"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    كم عمرك؟
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="3"
                    max="12"
                    className="text-2xl h-16 text-center border-2 border-primary/30 focus:border-primary rounded-3xl"
                    placeholder="٣-١٢"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setStep("dialect")}
                    className="flex-1"
                  >
                    <span className="text-xl">رجوع</span>
                  </Button>
                  <Button
                    variant="kid"
                    size="lg"
                    onClick={handleStart}
                    disabled={!name || !age}
                    className="flex-1"
                  >
                    <span className="text-xl">ابدأ التعلم! 🚀</span>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-lg">اللهجة المختارة:</span>
              <span className="text-xl font-bold text-primary">
                {dialect === "darija" && "🇲🇦 الدارجة"}
                {dialect === "amazigh" && "ⵣ الأمازيغية"}
                {dialect === "fusha" && "🌟 الفصحى"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
