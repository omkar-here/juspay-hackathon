import { useState } from 'react';
import BottomSheet from './components/BottomSheet';

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 font-sans">
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsSheetOpen(true)}
        className="bg-[#0055A5] relative text-white font-semibold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        Open Menu
      </button>

      {/* The Component */}
      <BottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />

    </div>
  );
}

export default App;