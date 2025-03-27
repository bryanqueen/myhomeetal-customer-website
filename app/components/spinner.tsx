function Spinner() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-black/90 text-center">Authenticating...</p>
    </div>
  );
}

export default Spinner;