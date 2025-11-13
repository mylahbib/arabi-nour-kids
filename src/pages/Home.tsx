import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import mascotReading from "@/assets/mascot-reading.png";

interface UserData {
  name: string;
  age: string;
  dialect: string;
  xp: number;
  streak: number;
}

interface Course {
  id: number;
  title: string;
  icon: string;
  completed: boolean;
  locked: boolean;
}

interface Unit {
  id: number;
  title: string;
  icon: string;
  courses: Course[];
  progress: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<number | null>(1);

  useEffect(() => {
    const userData = localStorage.getItem("khutwa_user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const arabicLetters = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي", "ء"];
  
  const units: Unit[] = [
    {
      id: 1,
      title: "الْحُرُوفُ الْعَرَبِيَّةُ",
      icon: "📘",
      progress: 10,
      courses: arabicLetters.map((letter, index) => ({
        id: index + 1,
        title: `حرف ${letter}`,
        icon: letter,
        completed: index < 3,
        locked: index > 2
      }))
    },
    {
      id: 2,
      title: "الْحَرَكَاتُ وَالتَّشْكِيل",
      icon: "✍️",
      progress: 43,
      courses: [
        { id: 2, title: "تَشْكِيلُ الْحُرُوفِ بِالْفَتْحَةِ", icon: "📖", completed: true, locked: false },
        { id: 3, title: "تَشْكِيلُ الْحُرُوفِ بِالْكَسْرَةِ", icon: "📖", completed: true, locked: false },
        { id: 4, title: "تَشْكِيلُ الْحُرُوفِ بِالضَّمَّةِ", icon: "📖", completed: true, locked: false },
        { id: 5, title: "السُّكُون", icon: "📖", completed: false, locked: false },
        { id: 6, title: "الْفَتْحَةُ مَعَ السُّكُون", icon: "📖", completed: false, locked: true },
        { id: 7, title: "الْكَسْرَةُ مَعَ السُّكُون", icon: "📖", completed: false, locked: true },
        { id: 8, title: "الضَّمَّةُ مَعَ السُّكُون", icon: "📖", completed: false, locked: true }
      ]
    },
    {
      id: 3,
      title: "الْمَدُّ وَالتَّشْدِيد",
      icon: "⭐",
      progress: 0,
      courses: [
        { id: 9, title: "مَدُّ الْحُرُوفِ بِالْأَلِفِ", icon: "📖", completed: false, locked: true },
        { id: 10, title: "مَدُّ الْحُرُوفِ بِالْيَاءِ", icon: "📖", completed: false, locked: true },
        { id: 11, title: "مَدُّ الْحُرُوفِ بِالْوَاوِ", icon: "📖", completed: false, locked: true },
        { id: 12, title: "اللَّامُ الْقَمَرِيَّةُ وَالشَّدَّةُ", icon: "📖", completed: false, locked: true },
        { id: 13, title: "اللَّامُ الْقَمَرِيَّةُ", icon: "📖", completed: false, locked: true },
        { id: 14, title: "الشَّدَّةُ مَعَ الْفَتْحَةِ", icon: "📖", completed: false, locked: true },
        { id: 15, title: "الشَّدَّةُ مَعَ الْكَسْرَةِ", icon: "📖", completed: false, locked: true },
        { id: 16, title: "الشَّدَّةُ مَعَ الضَّمَّةِ", icon: "📖", completed: false, locked: true },
        { id: 17, title: "التَّنْوِينُ وَاللَّامُ الشَّمْسِيَّةُ", icon: "📖", completed: false, locked: true },
        { id: 18, title: "الْفَتْحَتَانِ", icon: "📖", completed: false, locked: true },
        { id: 19, title: "الْكَسْرَتَانِ", icon: "📖", completed: false, locked: true },
        { id: 20, title: "الضَّمَّتَانِ", icon: "📖", completed: false, locked: true },
        { id: 21, title: "اللَّامُ الشَّمْسِيَّةُ", icon: "📖", completed: false, locked: true }
      ]
    },
    {
      id: 4,
      title: "آدَابُ الْمُسْلِمِ الصَّغِيرِ",
      icon: "🧠",
      progress: 0,
      courses: [
        { id: 22, title: "التَّشَهُّدُ", icon: "📖", completed: false, locked: true },
        { id: 23, title: "آدَابُ الْقِيَامِ", icon: "📖", completed: false, locked: true },
        { id: 24, title: "آدَابُ الطَّعَامِ", icon: "📖", completed: false, locked: true },
        { id: 25, title: "آدَابُ الْمَجَالِسِ", icon: "📖", completed: false, locked: true },
        { id: 26, title: "آدَابُ الْمَسَاجِدِ", icon: "📖", completed: false, locked: true },
        { id: 27, title: "آدَابُ تِلَاوَةِ الْقُرْآنِ", icon: "📖", completed: false, locked: true },
        { id: 28, title: "الْآدَابُ مَعَ الْوَالِدَيْنِ", icon: "📖", completed: false, locked: true },
        { id: 29, title: "آدَابُ النَّوْمِ", icon: "📖", completed: false, locked: true },
        { id: 30, title: "آدَابُ الدِّرَاسَةِ", icon: "📖", completed: false, locked: true },
        { id: 31, title: "آدَابُ الطَّرِيقِ", icon: "📖", completed: false, locked: true },
        { id: 32, title: "أَحَادِيثُ نَبَوِيَّةٌ", icon: "📖", completed: false, locked: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #8B6F47 0%, #6B4423 50%, #5E382A 100%)'
    }}>
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/progress")}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-secondary" />
        </Button>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-warning text-sm">{user.streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1.5 shadow-lg">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-warning text-sm">{user.xp}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
        >
          <Menu className="w-5 h-5 text-secondary" />
        </Button>
      </div>

      {/* Header with Mascot */}
      <div className="relative pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-block mb-4">
            <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-2xl border-4 border-warning">
              <img 
                src={mascotReading} 
                alt="Mascot" 
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2 drop-shadow-lg">رحلة التعلم</h1>
          <p className="text-base text-white/90 font-body drop-shadow">استمتع بالتعلم خطوة بخطوة</p>
        </div>
      </div>

      {/* Units Journey */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="space-y-6">
          {units.map((unit, unitIndex) => {
            const isExpanded = expandedUnit === unit.id;
            const isLocked = unit.progress === 0 && unitIndex > 0;
            const completedCourses = unit.courses.filter(c => c.completed).length;
            const totalCourses = unit.courses.length;

            return (
              <div key={unit.id} className="relative">
                {/* Connecting Path */}
                {unitIndex < units.length - 1 && (
                  <div className="absolute left-8 top-full w-1 h-6 bg-gradient-to-b from-primary/30 to-transparent" />
                )}

                {/* Unit Node */}
                <div
                  onClick={() => !isLocked && setExpandedUnit(isExpanded ? null : unit.id)}
                  className={`
                    relative bg-white/95 rounded-3xl p-5 shadow-2xl border-4 cursor-pointer
                    transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
                    ${isLocked 
                      ? 'border-text/20 opacity-60 cursor-not-allowed' 
                      : 'border-warning hover:border-accent'
                    }
                    ${isExpanded ? 'ring-4 ring-accent/50' : ''}
                  `}
                >
                  {/* Unit Header */}
                  <div className="flex items-start gap-4">
                    {/* Unit Icon */}
                    <div className={`
                      flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-4xl
                      shadow-xl transition-transform duration-300 border-4
                      ${isLocked 
                        ? 'bg-text/10 border-text/20' 
                        : 'bg-gradient-to-br from-warning to-accent hover:scale-110 border-white'
                      }
                    `}>
                      {isLocked ? "🔒" : unit.icon}
                    </div>

                    {/* Unit Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-heading font-bold text-secondary mb-2 leading-tight">
                        {unit.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-secondary/70 mb-3">
                        <span className="font-bold">{completedCourses}/{totalCourses} دروس</span>
                        <span>•</span>
                        <span className="font-bold">{unit.progress}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-secondary/10 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-success to-success/80 transition-all duration-500 rounded-full shadow-md"
                          style={{ width: `${unit.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Expand Icon */}
                    {!isLocked && (
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center
                        transition-transform duration-300 shadow-md
                        ${isExpanded ? 'rotate-180' : ''}
                      `}>
                        <span className="text-warning text-lg font-bold">▼</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Courses */}
                  {isExpanded && !isLocked && (
                    <div className="mt-6 space-y-2 animate-fade-in">
                      {unit.courses.map((course, courseIndex) => (
                        <div key={course.id} className="flex items-center gap-2">
                          {/* Course Button with Letter */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!course.locked) {
                                navigate(`/lesson/${course.id}`);
                              }
                            }}
                            disabled={course.locked}
                            className={`
                              flex-1 flex items-center justify-between gap-3 p-4 rounded-2xl
                              transition-all duration-300 shadow-lg
                              ${course.locked
                                ? 'bg-gray-200 cursor-not-allowed opacity-50'
                                : course.completed
                                  ? 'bg-gradient-to-br from-success to-success/80 hover:scale-[1.03] cursor-pointer border-4 border-white'
                                  : 'bg-gradient-to-br from-warning to-accent hover:scale-[1.03] cursor-pointer border-4 border-white'
                              }
                            `}
                          >
                            {/* Letter Icon */}
                            <div className={`
                              flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold
                              shadow-lg border-3
                              ${course.locked
                                ? 'bg-gray-300 border-gray-400 text-gray-500'
                                : course.completed
                                  ? 'bg-white text-success border-success'
                                  : 'bg-white text-secondary border-warning'
                              }
                            `}>
                              {course.locked ? "🔒" : course.completed ? "✓" : course.icon}
                            </div>

                            {/* Course Title */}
                            <div className="flex-1 text-right">
                              <div className="text-base font-heading font-bold text-white drop-shadow-md">
                                {course.title}
                              </div>
                            </div>

                            {/* Play Icon */}
                            {!course.locked && !course.completed && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                                <span className="text-primary text-lg">▶️</span>
                              </div>
                            )}

                            {/* Stars for completed */}
                            {course.completed && (
                              <div className="flex gap-1">
                                {[1, 2, 3].map((star) => (
                                  <span key={star} className="text-white text-lg drop-shadow-lg">⭐</span>
                                ))}
                              </div>
                            )}
                          </button>

                          {/* Exercise Icon */}
                          {!course.locked && (
                            <button
                              className={`
                                flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl
                                transition-all duration-300 hover:scale-110 shadow-lg border-4
                                ${course.completed
                                  ? 'bg-gradient-to-br from-accent to-accent/80 border-white'
                                  : 'bg-white/80 border-gray-300'
                                }
                              `}
                            >
                              🧩
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Unit Celebration for Completed */}
                  {unit.progress === 100 && (
                    <div className="absolute -top-4 -right-4 animate-bounce">
                      <div className="bg-gradient-to-br from-warning to-accent rounded-full w-12 h-12 flex items-center justify-center shadow-2xl text-xl border-4 border-white">
                        🎉
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
