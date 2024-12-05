"use client";

import CardListNextPageComponent from "@/components/cardsList/cardlistnextpage.component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BaralhoCardsPage = () => {
  
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('favorites');
    router.push('/login');
  };

  return (
    <div className="text-center">
          <CardListNextPageComponent />
          <button onClick={() => logout()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Logout
          </button>
    </div>
  );
};

export default BaralhoCardsPage;