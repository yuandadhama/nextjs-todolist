import { motion } from "framer-motion";

const SuccessModal = ({
  message,
  name,
  description,
  dateTime,
  closeAfterSuccess,
}: {
  message: string;
  name: string;
  description: string;
  dateTime: string;
  closeAfterSuccess: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center px-3 justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
            ✅
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-semibold text-green-600">{message}</h2>

        {/* Task Details */}
        <div className="mt-3 text-left flex flex-col text-gray-700 text-xs">
          <p className="text-sm">
            <strong>Name:</strong> {name}
          </p>
          <p className="break-all mb-2">
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Date:</strong> {dateTime.split("T")[0]}
          </p>
        </div>

        {/* Close Button */}
        <button
          className="mt-4 px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          onClick={closeAfterSuccess}
        >
          Ok
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;
