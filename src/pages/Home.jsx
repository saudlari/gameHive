import GameCard from '../components/GameCards.jsx';
import '../pages/Home.css';

function Home() {
  // Datos de ejemplo - esto podría venir de una API en un caso real
  const games = [
    {
      id: 1,
      title: "The Last of Us Part I",
      price: 59.99,
      image: "/games/tlou.jpg", // Asegúrate de tener estas imágenes en tu carpeta public
      description: "Un emocionante juego de supervivencia post-apocalíptico"
    },
    {
      id: 2,
      title: "God of War Ragnarök",
      price: 69.99,
      image: "/games/gow.jpg",
      description: "La nueva aventura de Kratos y Atreus en los nueve reinos"
    },
    {
      id: 3,
      title: "Elden Ring",
      price: 59.99,
      image: "/games/elden-ring.jpg",
      description: "Un vasto mundo abierto lleno de peligros y descubrimientos"
    },
    // Puedes agregar más juegos aquí
  ];

  return (
    <div className="home">
      <h2 className="home-title">Juegos Destacados</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard
            key={game.id}
            title={game.title}
            price={game.price}
            image={game.image}
            description={game.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
