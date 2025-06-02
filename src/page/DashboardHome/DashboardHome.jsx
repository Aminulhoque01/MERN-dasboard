import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold py-3 px-3">Overview</h1>
      <div className="px-3">
        <Status />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-3"></div>
      </div>
    </section>
  );
};

export default DashboardHome;
