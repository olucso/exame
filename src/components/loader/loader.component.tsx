const Loader = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full border-8 border-blue-400 border-t-transparent w-12 h-12">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
  
  export default Loader;