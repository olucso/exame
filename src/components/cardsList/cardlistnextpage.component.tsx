import { useEffect, useState } from 'react';

type Card = {
  value: string;
  suit: string;
  image: string;
};

export default function Home() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const savedDeck = localStorage.getItem('deck');
      if (savedDeck) {
        setDeck(JSON.parse(savedDeck));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            'https://deckofcardsapi.com/api/deck/new/draw/?count=52',
            {
              method: 'GET',
            }
          );
    
          if (!response.ok) {
            console.error(`HTTP Error: ${response.status}`);
            throw new Error(`Failed to fetch deck. Status: ${response.status}`);
          }
    
          const data = await response.json();
          const cards = data.cards.map((card: any) => ({
            value: card.value,
            suit: card.suit,
            image: card.image,
          }));
    
          setDeck(cards);
        } catch (error: any) {
          setError(`Error: ${error.message}`);
          console.error('Fetch Error:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchDeck();
  }, []);

  useEffect(() => {
    if (deck.length > 0) {
      localStorage.setItem('deck', JSON.stringify(deck));
    }
  }, [deck]);

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
  };

  const handleLogout = () => {
    localStorage.removeItem('deck');
    setDeck([]);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Deck de Cartas</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={shuffleDeck}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Embaralhar Cartas
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {loading && <p className="text-center">Carregando deck...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {deck.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
              className="w-20 h-auto mb-2"
            />
            <p className="text-lg font-semibold">{`${card.value} of ${card.suit}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
