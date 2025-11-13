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

  const units: Unit[] = [
    {
      id: 1,
      title: "الْحُرُوفُ الْعَرَبِيَّةُ",
      icon: "📘",
      progress: 100,
      courses: [
        { id: 1, title: "29 حرفًا عربيًا (الأبجدية)", icon: "🔤", completed: true, locked: false }
      ]
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
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/progress")}
          className="w-12 h-12 rounded-full bg-surface hover:bg-surface/80 shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </Button>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-surface rounded-full px-3 py-1.5 shadow-md border border-primary/10">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-warning text-sm">{user.streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-surface rounded-full px-3 py-1.5 shadow-md border border-primary/10">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-warning text-sm">{user.xp}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-surface hover:bg-surface/80 shadow-md"
        >
          <Menu className="w-5 h-5 text-primary" />
        </Button>
      </div>

      {/* Header with Mascot */}
      <div className="relative pt-20 pb-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-xl border-4 border-white">
              <img 
                src={mascotReading} 
                alt="Mascot" 
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-text mb-2">رحلة التعلم</h1>
          <p className="text-sm text-text/60 font-body">استمتع بالتعلم خطوة بخطوة</p>
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
                    relative bg-surface rounded-3xl p-5 shadow-lg border-2 cursor-pointer
                    transition-all duration-300 hover:shadow-xl
                    ${isLocked 
                      ? 'border-text/20 opacity-60 cursor-not-allowed' 
                      : 'border-primary/20 hover:border-primary/40'
                    }
                    ${isExpanded ? 'ring-2 ring-primary/30' : ''}
                  `}
                >
                  {/* Unit Header */}
                  <div className="flex items-start gap-4">
                    {/* Unit Icon */}
                    <div className={`
                      flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                      shadow-md transition-transform duration-300
                      ${isLocked 
                        ? 'bg-text/10' 
                        : 'bg-gradient-to-br from-primary to-primary/80 hover:scale-105'
                      }
                    `}>
                      {isLocked ? "🔒" : unit.icon}
                    </div>

                    {/* Unit Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-heading font-bold text-text mb-1 leading-tight">
                        {unit.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-text/60 mb-2">
                        <span>{completedCourses}/{totalCourses} دروس</span>
                        <span>•</span>
                        <span>{unit.progress}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-text/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-success to-success/80 transition-all duration-500 rounded-full"
                          style={{ width: `${unit.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Expand Icon */}
                    {!isLocked && (
                      <div className={`
                        flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center
                        transition-transform duration-300
                        ${isExpanded ? 'rotate-180' : ''}
                      `}>
                        <span className="text-primary text-sm">▼</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Courses */}
                  {isExpanded && !isLocked && (
                    <div className="mt-6 space-y-3 animate-fade-in">
                      {unit.courses.map((course, courseIndex) => (
                        <div key={course.id}>
                          {/* Course Card */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!course.locked) {
                                navigate(`/lesson/${course.id}`);
                              }
                            }}
                            disabled={course.locked}
                            className={`
                              w-full flex items-center gap-3 p-3 rounded-2xl
                              transition-all duration-300 text-right
                              ${course.locked
                                ? 'bg-text/5 cursor-not-allowed opacity-50'
                                : course.completed
                                  ? 'bg-success/10 hover:bg-success/20 cursor-pointer hover:scale-[1.02]'
                                  : 'bg-primary/10 hover:bg-primary/20 cursor-pointer hover:scale-[1.02]'
                              }
                            `}
                          >
                            {/* Course Icon */}
                            <div className={`
                              flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl
                              ${course.locked
                                ? 'bg-text/10'
                                : course.completed
                                  ? 'bg-success shadow-md'
                                  : 'bg-primary shadow-md'
                              }
                            `}>
                              {course.locked ? "🔒" : course.completed ? "✓" : course.icon}
                            </div>

                            {/* Course Title */}
                            <div className="flex-1 text-sm font-body font-semibold text-text">
                              {course.title}
                            </div>

                            {/* Completion Stars */}
                            {course.completed && (
                              <div className="flex gap-1">
                                {[1, 2, 3].map((star) => (
                                  <span key={star} className="text-warning text-xs">⭐</span>
                                ))}
                              </div>
                            )}
                          </button>

                          {/* Exercise Icon after Course */}
                          {!course.locked && (
                            <div className="flex justify-center my-2">
                              <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm
                                transition-all duration-300 hover:scale-110
                                ${course.completed
                                  ? 'bg-accent shadow-md'
                                  : 'bg-text/10'
                                }
                              `}>
                                {course.completed ? "🎯" : "🧩"}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Unit Celebration for Completed */}
                  {unit.progress === 100 && (
                    <div className="absolute -top-3 -right-3 animate-bounce">
                      <div className="bg-warning rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-sm">
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
