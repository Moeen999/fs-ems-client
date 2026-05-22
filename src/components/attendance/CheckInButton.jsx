import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CheckInButton = ({ todayRec, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    try {
      await api.post("/attendance");
      onAction();
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (todayRec?.checkout) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
        <p className="text-slate-500 text-sm mt-1">
          Great job! See you tomorrow
        </p>
      </div>
    );
  }

  const isCheckedIn = !!todayRec?.checkIn;

  return (
    <div className="fixed bottom-0 left-4 right-4 sm:absolute sm:bottom-4 sm:right-4 sm:left-auto sm:w-auto flex flex-col z-50">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`w-full sm:max-w-md flex justify-between items-center gap-4 sm:gap-8 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-linear-to-br text-white transition-all ${
          isCheckedIn
            ? "from-slate-700 to-slate-900 hover:shadow-lg active:scale-95"
            : "from-indigo-600 to-indigo-700 hover:shadow-lg active:scale-95"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <Loader2Icon className="size-5 sm:size-7 animate-spin flex-shrink-0" />
        ) : isCheckedIn ? (
          <LogOutIcon className="size-5 sm:size-7 flex-shrink-0" />
        ) : (
          <LogInIcon className="size-5 sm:size-7 flex-shrink-0" />
        )}

        <div className="relative flex flex-col items-center text-center flex-1">
          <h2 className="text-sm sm:text-lg font-medium mb-0.5 sm:mb-1">
            {loading ? "Processing..." : isCheckedIn ? "Check Out" : "Check In"}
          </h2>
          <p className="text-xs opacity-80 line-clamp-1">
            {isCheckedIn ? "End your shift" : "Start your day"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckInButton;
