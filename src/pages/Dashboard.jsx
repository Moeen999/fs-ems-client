import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import api from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((error) =>
        toast.error(error.response?.data?.error || error?.message),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashobard
      </p>
    );
  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }

  // return (
  //   <div>
  //       Dashobard
  //   </div>
  // )
};

export default Dashboard;
