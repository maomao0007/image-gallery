const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading photos...</p>
        <p className="text-gray-400 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
};

export default Loading