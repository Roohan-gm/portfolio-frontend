/******************************************************************
 *  UI COMPONENTS
 ******************************************************************/
export type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export const LoadingSpinner: React.FC<{ size?: SpinnerSize }> = ({
  size = "md",
}) => (
  <div className="flex items-center justify-center">
    <div
      className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
    />
  </div>
);

export const ErrorMessage: React.FC<{
  message: string;
  retry?: () => void;
}> = ({ message, retry }) => (
  <div className="text-center py-8">
    <div className="text-red-600 mb-4">⚠️ {message}</div>
    {retry && (
      <button
        onClick={retry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
export default { LoadingSpinner, ErrorMessage };

/******************************************************************/