const Insights = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Insights</h1>

      {/* Section 1: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Journals</h2>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
          <p className="text-2xl font-bold text-green-500">27</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Average Mood</h2>
          <p className="text-2xl font-bold text-purple-500">🙂</p>
        </div>
      </div>

      {/* Section 2: Recent Activity */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
        <ul className="space-y-2">
          <li className="text-gray-700">📝 Journal: "Deep thoughts on purpose" – 2 days ago</li>
          <li className="text-gray-700">✅ Task: "Read 20 pages" – 1 day ago</li>
        </ul>
      </div>
    </div>
  );
};

export default Insights;
