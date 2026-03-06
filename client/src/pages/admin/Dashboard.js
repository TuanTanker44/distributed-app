function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[500px] text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">📊 Dashboard</h1>

        <p className="text-gray-600 mb-6">
          Chào mừng bạn đến trang quản trị Quiz App.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            Quản lý Quiz
          </button>

          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
            Xem thống kê
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
