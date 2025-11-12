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
    { id: 1, title: "الحروف", icon: "🔤", locked: false, progress: 100, position: "center" },
    { id: 2, title: "المقاطع", icon: "🎵", locked: false, progress: 100, position: "right" },
    { id: 3, title: "الكلمات", icon: "📝", locked: false, progress: 50, position: "left" },
    { id: 4, title: "الجمل", icon: "💬", locked: true, progress: 0, position: "right" },
    { id: 5, title: "القراءة", icon: "📖", locked: true, progress: 0, position: "center" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)',
      backgroundImage: `
        repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 50px, rgba(0,0,0,0.1) 52px),
        repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 80px, rgba(0,0,0,0.1) 82px)
      `
    }}>
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/progress")}
          className="w-14 h-14 rounded-full bg-white hover:bg-white/90 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </Button>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-primary">{user.streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-warning">{user.xp}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 rounded-full bg-white hover:bg-white/90 shadow-lg"
        >
          <Menu className="w-6 h-6 text-primary" />
        </Button>
      </div>

      {/* Mascot at Top */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-2xl border-4 border-white">
            <img 
              src={mascotReading} 
              alt="Mascot" 
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Lesson Path */}
      <div className="max-w-md mx-auto pt-56 pb-20 px-4 relative">
        {lessons.map((lesson, index) => {
          const isActive = !lesson.locked;
          const isCompleted = lesson.progress === 100;
          const isInProgress = lesson.progress > 0 && lesson.progress < 100;
          
          // Calculate horizontal offset based on position
          const offsetX = 
            lesson.position === "left" ? -60 :
            lesson.position === "right" ? 60 : 0;

          return (
            <div key={lesson.id} className="relative flex justify-center mb-4">
              {/* Connecting Dots */}
              {index < lessons.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 py-2" style={{ transform: `translateX(${offsetX}px)` }}>
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        isActive ? 'bg-warning' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Lesson Node */}
              <div 
                className="relative"
                style={{ transform: `translateX(${offsetX}px)` }}
              >
                <button
                  onClick={() => !lesson.locked && navigate(`/lesson/${lesson.id}`)}
                  disabled={lesson.locked}
                  className={`
                    relative w-32 h-32 rounded-full flex items-center justify-center
                    transition-all duration-300 font-heading text-5xl
                    ${lesson.locked 
                      ? 'bg-gray-600 cursor-not-allowed opacity-60' 
                      : isCompleted
                        ? 'bg-gradient-to-b from-warning via-yellow-500 to-orange-600 shadow-2xl cursor-pointer hover:scale-110'
                        : isInProgress
                          ? 'bg-gradient-to-b from-yellow-400 via-warning to-yellow-600 shadow-2xl cursor-pointer hover:scale-110'
                          : 'bg-gradient-to-b from-yellow-300 via-warning to-orange-500 shadow-2xl cursor-pointer hover:scale-110'
                    }
                  `}
                  style={{
                    boxShadow: lesson.locked 
                      ? 'inset 0 -8px 0 rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.3)'
                      : 'inset 0 -12px 0 rgba(180,100,0,0.4), 0 12px 30px rgba(255,180,0,0.5)'
                  }}
                >
                  {/* Inner Circle */}
                  <div className={`
                    absolute inset-3 rounded-full flex items-center justify-center
                    ${lesson.locked 
                      ? 'bg-gray-700' 
                      : 'bg-gradient-to-b from-yellow-200 to-yellow-400'
                    }
                  `}>
                    {lesson.locked ? "🔒" : isCompleted ? "✓" : lesson.icon}
                  </div>
                  
                  {/* Small decorative bumps */}
                  {!lesson.locked && (
                    <>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-warning" 
                           style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-warning" 
                           style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rounded-full bg-warning" 
                           style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 rounded-full bg-warning" 
                           style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                    </>
                  )}
                </button>

                {/* Lesson Title Below */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <p className={`text-sm font-heading font-bold ${
                    lesson.locked ? 'text-gray-400' : 'text-white'
                  }`}>
                    {lesson.title}
                  </p>
                </div>

                {/* Completion Stars */}
                {!lesson.locked && isCompleted && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                    {[1, 2, 3].map((star) => (
                      <span key={star} className="text-xl drop-shadow-lg">⭐</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
