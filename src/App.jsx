import { useState } from 'react';
import BottomSheet from './components/BottomSheet';

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    // Simulating the phone screen container
    <div className="relative w-[375px] max-w-full h-[812px] max-h-[calc(100vh-40px)] bg-gray-100 rounded-[40px] overflow-hidden shadow-xl border-8 border-gray-800 flex items-center justify-center font-sans">
      {/* The "Open Menu" button from the original design */}
      <button
        onClick={() => setIsSheetOpen(true)}
        className="bg-[#0055A5] text-white font-semibold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        Open Menu
      </button>

      {/* Our Bottom Sheet Component */}
      <BottomSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />

    </div>
  );
}

export default App;