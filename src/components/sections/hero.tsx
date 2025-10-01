import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Servilleta
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Curso inicial para la Olimpiada Matemática Argentina
          </p>
          <p className="text-lg md:text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
            Colección de notas escritas por mí para dar clases.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              href="/index"
            >
              Ver índice completo
            </Link>
            <Link
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-all"
              href="/contar/que-es-contar"
            >
              Empezar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
