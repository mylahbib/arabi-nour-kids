import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import mascotReading from "@/assets/mascot-reading.png";
import lessonsData from "@/data/lessons.json";

interface UserData {
  name: string;
  age: string;
  dialect: string;
  xp: number;
  streak: number;
  completedLessons?: string[];
}

interface Course {
  id: string | number;
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

  // Get completed lessons from user data
  const completedLessons = user.completedLessons || [];

  // Generate courses from lessons.json
  const alphabetCourses = lessonsData.unit1.lessons.map((lesson, index) => {
    const isCompleted = completedLessons.includes(lesson.id);

    // A lesson is unlocked if:
    // 1. It's the first lesson, OR
    // 2. The previous lesson is completed
    const prevLesson = index > 0 ? lessonsData.unit1.lessons[index - 1] : null;
    const isUnlocked = index === 0 || (prevLesson && completedLessons.includes(prevLesson.id));

    return {
      id: lesson.id,
      title: `حرف ${lesson.letter} - ${lesson.example}`,
      icon: lesson.letter,
      completed: isCompleted,
      locked: !isUnlocked
    };
  });

  const units: Unit[] = [
    {
      id: 1,
      title: "الْحُرُوفُ الْعَرَبِيَّةُ",
      icon: "📘",
      progress: Math.round((alphabetCourses.filter(c => c.completed).length / alphabetCourses.length) * 100),
      courses: alphabetCourses
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky via-sky/50 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sun */}
        <div className="absolute top-4 left-8 w-20 h-20 rounded-full bg-warning flex items-center justify-center animate-float">
          <span className="text-4xl">😊</span>
        </div>
        
        {/* Moon */}
        <div className="absolute top-20 right-8 w-16 h-16 rounded-full bg-warning/80 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-3xl">🌙</span>
        </div>

        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/90 rounded-full"
            style={{
              width: `${80 + i * 20}px`,
              height: `${40 + i * 10}px`,
              top: `${100 + i * 80}px`,
              left: `${i * 30}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}

        {/* Bottom Grass Layer */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-grass rounded-t-[50%]" />
        
        {/* Trees */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute bottom-16"
            style={{ left: `${20 + i * 30}%` }}
          >
            <div className="w-16 h-20 bg-grass rounded-full opacity-80" />
          </div>
        ))}
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/progress")}
          className="w-14 h-14 rounded-2xl bg-white/90 hover:bg-white shadow-lg"
        >
          <span className="text-3xl">🏠</span>
        </Button>
        
        <div className="flex items-center gap-3 bg-white/95 rounded-full px-6 py-2 shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-warning text-lg">{user.streak}</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-warning text-lg">{user.xp}</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">🧩</span>
            <span className="font-bold text-success text-lg">7</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 rounded-2xl bg-white/90 hover:bg-white shadow-lg"
        >
          <span className="text-3xl">⚙️</span>
        </Button>
      </div>

      {/* Header with Mascot */}
      <div className="relative pt-24 pb-8 px-4 z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-block mb-4">
            <div className="w-32 h-32 rounded-full bg-light-blue flex items-center justify-center shadow-2xl border-8 border-warning">
              <img 
                src={mascotReading} 
                alt="Mascot" 
                className="w-28 h-28 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Units Journey Path */}
      <div className="max-w-md mx-auto px-4 pb-32 relative z-10">
        {/* Winding Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '-50px' }}>
          <path
            d="M 50 100 Q 150 150, 250 200 T 150 350 T 250 500 T 150 650 T 250 800"
            fill="none"
            stroke="hsl(var(--path-yellow))"
            strokeWidth="40"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>

        <div className="space-y-32 relative">
          {units.map((unit, unitIndex) => {
            const isExpanded = expandedUnit === unit.id;
            const isLocked = unit.progress === 0 && unitIndex > 0;
            const completedCourses = unit.courses.filter(c => c.completed).length;
            const totalCourses = unit.courses.length;
            
            // Alternate positioning: left, center, right
            const positions = ['left', 'center', 'right', 'center'];
            const position = positions[unitIndex % 4];
            const positionClass = 
              position === 'left' ? 'mr-auto' : 
              position === 'right' ? 'ml-auto' : 
              'mx-auto';

            // Alternate colors for units
            const colors = [
              'bg-light-blue border-white',
              'bg-coral border-white',
              'bg-warning border-white',
              'bg-success border-white'
            ];
            const colorClass = colors[unitIndex % 4];

            return (
              <div key={unit.id} className={`relative w-fit ${positionClass}`}>
                {/* Unit Node */}
                <div
                  onClick={() => !isLocked && setExpandedUnit(isExpanded ? null : unit.id)}
                  className="relative cursor-pointer"
                >
                  {/* Circular Unit Button */}
                  <div className={`
                    w-32 h-32 rounded-full flex items-center justify-center text-6xl
                    shadow-2xl transition-all duration-300 hover:scale-110
                    ${isLocked ? 'bg-muted border-4 border-border opacity-60' : `${colorClass} border-8`}
                  `}>
                    {isLocked ? "🔒" : unit.icon}
                  </div>

                  {/* Unit Label */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40">
                    <div className="bg-white rounded-3xl px-4 py-3 shadow-xl">
                      <h3 className="text-base font-heading font-bold text-secondary text-center leading-tight">
                        {unit.title}
                      </h3>
                    </div>
                  </div>

                  {/* Completion Badge */}
                  {unit.progress === 100 && (
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <div className="bg-warning rounded-full w-12 h-12 flex items-center justify-center shadow-2xl text-2xl border-4 border-white">
                        🎉
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Courses */}
                {isExpanded && !isLocked && (
                  <div className="mt-20 space-y-3 animate-fade-in">
                    {unit.courses.map((course) => (
                      <div key={course.id} className="flex items-center gap-2">
                        {/* Course Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!course.locked) {
                              navigate(`/lesson/${course.id}`);
                            }
                          }}
                          disabled={course.locked}
                          className={`
                            flex-1 flex items-center justify-between gap-3 p-4 rounded-3xl
                            transition-all duration-300 shadow-lg
                            ${course.locked
                              ? 'bg-muted cursor-not-allowed opacity-50'
                              : course.completed
                                ? 'bg-success hover:scale-[1.03] cursor-pointer border-4 border-white'
                                : 'bg-warning hover:scale-[1.03] cursor-pointer border-4 border-white'
                            }
                          `}
                        >
                          {/* Letter/Icon */}
                          <div className={`
                            flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold
                            shadow-lg border-4
                            ${course.locked
                              ? 'bg-muted-foreground/20 border-border text-muted-foreground'
                              : 'bg-white text-secondary border-white'
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
                                ? 'bg-accent border-white'
                                : 'bg-white/90 border-border'
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
              </div>
            );
          })}
        </div>

        {/* Mascot at bottom */}
        <div className="absolute bottom-10 left-8 z-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src={mascotReading} 
            alt="Learning Mascot" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
