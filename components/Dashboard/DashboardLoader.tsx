const SkeletonLoader = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-screen flex flex-col items-center p-8">
      <div className="mt-32 w-full max-w-4xl bg-white rounded-lg shadow-md p-6 text-gray-800">
        {/* Title Skeleton */}
        <div className="w-1/3 h-8 bg-gray-300 rounded mb-4"></div>

        {/* User Name Skeleton */}
        <div className="w-1/2 h-6 bg-gray-300 rounded mb-4"></div>

        {/* Description Skeleton */}
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-6"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Task Skeleton */}
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <div className="w-2/3 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
          </div>

          {/* Profile Skeleton */}
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <div className="w-2/3 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
