import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData } from "../assets/assets";
import Loading from "../components/Loading";
import PaySlipList from "../components/payslips/PaySlipList";
import GeneratePayslipForm from "../components/payslips/GeneratePayslipForm";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

const Payslips = () => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const fetchPaySlips = useCallback(async () => {
    try {
      const res = await api.get("/payslips");
      console.log(res)
      setPaySlips(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaySlips();
  }, [fetchPaySlips]);

  useEffect(() => {
    if (isAdmin)
      api
        .get("/employees")
        .then((res) => setEmployees(res.data.filter((emp) => !emp.isDeleted)))
        .catch(() => {});
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslips history"}
          </p>
        </div>

        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPaySlips}
          />
        )}
      </div>
      <PaySlipList isAdmin={isAdmin} payslips={paySlips} />
    </div>
  );
};

export default Payslips;
