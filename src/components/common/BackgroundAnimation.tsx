export default function BackgroundAnimation() {
  return (
    <div className="h-screen sticky top-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full animate-scroll-bg">
        <div className="pattern">
          {/* Repeat pattern twice for seamless loop */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <div className="h-[190px] w-full bg-[#ffd95f]"></div>
              <div className="h-[198px] w-full bg-[#ffefc8]"></div>
              <div className="h-[198px] w-full bg-[#ffd95f]"></div>
              <div className="h-[198px] w-full bg-[#ffefc8]"></div>
              <div className="h-[198px] w-full bg-[#ffd95f]"></div>
              <div className="h-[198px] w-full bg-[#ffefc8]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
