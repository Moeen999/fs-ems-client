import { X, Trash2 } from "lucide-react";

const DeleteEmployeeModal = ({ open, employee, onClose, onConfirm, loading }) => {
  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
              Confirm delete
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Delete employee?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone. The employee profile and linked user account will be marked as deleted.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 mb-6">
            <p className="text-sm text-slate-500">Employee</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="text-sm text-slate-500">{employee.position}</p>
            <p className="text-sm text-slate-500">{employee.email}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="btn-primary w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white"
            >
              <span className="inline-flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {loading ? "Deleting..." : "Delete employee"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
