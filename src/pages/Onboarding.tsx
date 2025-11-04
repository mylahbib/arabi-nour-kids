import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Dialect = "darija" | "amazigh" | "fusha";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"dialect" | "info">("dialect");
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
        {step === "dialect" ? (
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
