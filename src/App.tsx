import { useEffect, useState } from "react";

interface IAdvice {
  id: number;
  advice: string;
}

function App() {
  const [advice, setAdvice] = useState<IAdvice | null>(null);

  const url = "https://api.adviceslip.com/advice";
  const getAdvice = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setAdvice(result.slip);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen  text-center">
      <div className="bg-gray-900 py-12  rounded-xl mx-4 desktop:mx-92">
        <span className="text-green-300 tracking-widest">
          ADVICE #{advice?.id}
        </span>
        <blockquote className="font-manrope text-quote text-white my-8 mx-12">
          &ldquo;{advice?.advice}&rdquo;
        </blockquote>

        <div className="flex flex-col gap-0 items-center justify-center">
          <img
            src="/images/pattern-divider-desktop.svg"
            className="w-[80%]"
            alt="divider"
          />
          <button
            type="button"
            onClick={() => {
              getAdvice();
            }}
            className="relative top-19 left-0 bg-green-300 p-4 rounded-full cursor-pointer hover:shadow-2xl hover:transition-shadow hover:duration-500 hover:ease-in"
          >
            <img src="/images/icon-dice.svg" alt="dice icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
