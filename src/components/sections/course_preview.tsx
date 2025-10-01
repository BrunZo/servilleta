export default function CoursePreviewSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Qué aprenderás?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un vistazo a los conceptos y técnicas que dominarás
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔢</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Combinatoria</h3>
            <p className="text-sm text-gray-600">Contar posibilidades y resolver problemas de conteo</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📐</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Geometría</h3>
            <p className="text-sm text-gray-600">Áreas, ángulos y el teorema de Pitágoras</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Aritmética</h3>
            <p className="text-sm text-gray-600">Ecuaciones y representación decimal</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Estrategias</h3>
            <p className="text-sm text-gray-600">Técnicas para resolver problemas paso a paso</p>
          </div>
        </div>
      </div>
    </div>   
  )
}