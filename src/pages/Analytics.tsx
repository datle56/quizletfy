import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Award,
  Filter,
  Download,
  BarChart3,
} from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Analytics: React.FC = () => {
  const { studySessions, performanceStats, user } = useUserStore();
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [selectedSet, setSelectedSet] = useState('all');

  // Process data for charts
  const processWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      minutes: performanceStats?.weeklyProgress[index] || 0,
      sessions: Math.floor(Math.random() * 3) + 1, // Mock data
    }));
  };

  const processAccuracyData = () => {
    return studySessions.slice(-7).map((session, index) => ({
      session: `Session ${index + 1}`,
      accuracy: (session.cards.filter(card => card.correct).length / session.cards.length) * 100,
      date: session.date,
    }));
  };

  const processDifficultyData = () => {
    const cardStats: { [key: string]: { correct: number; total: number; avgTime: number } } = {};
    
    studySessions.forEach(session => {
      session.cards.forEach(card => {
        if (!cardStats[card.term]) {
          cardStats[card.term] = { correct: 0, total: 0, avgTime: 0 };
        }
        cardStats[card.term].total += 1;
        if (card.correct) cardStats[card.term].correct += 1;
        cardStats[card.term].avgTime += card.timeSpentSec;
      });
    });

    return Object.entries(cardStats)
      .map(([term, stats]) => ({
        term,
        accuracy: (stats.correct / stats.total) * 100,
        avgTime: stats.avgTime / stats.total,
        difficulty: stats.avgTime / stats.total > 120 ? 'Hard' : stats.avgTime / stats.total > 60 ? 'Medium' : 'Easy',
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);
  };

  const weeklyData = processWeeklyData();
  const accuracyData = processAccuracyData();
  const difficultyData = processDifficultyData();

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const difficultyDistribution = [
    { name: 'Easy', value: difficultyData.filter(d => d.difficulty === 'Easy').length, color: '#10B981' },
    { name: 'Medium', value: difficultyData.filter(d => d.difficulty === 'Medium').length, color: '#F59E0B' },
    { name: 'Hard', value: difficultyData.filter(d => d.difficulty === 'Hard').length, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
              <p className="text-gray-600 mt-2">Track your study progress and performance</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.floor((performanceStats?.totalStudyTime || 0) / 60)}h {(performanceStats?.totalStudyTime || 0) % 60}m
                </p>
                <p className="text-gray-600">Total Study Time</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((performanceStats?.correctRate || 0) * 100)}%
                </p>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceStats?.sessionsCount || 0}
                </p>
                <p className="text-gray-600">Study Sessions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceStats?.dailyStreak || 0}
                </p>
                <p className="text-gray-600">Day Streak</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Study Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Study Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="minutes" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Accuracy Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Difficulty Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Difficulty Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {difficultyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Most Difficult Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Challenging Terms</h3>
            <div className="space-y-4">
              {difficultyData.slice(0, 5).map((item, index) => (
                <div key={item.term} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{item.term}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                      item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{item.accuracy.toFixed(1)}% accuracy</span>
                    <span className="text-sm text-gray-500">{item.avgTime.toFixed(0)}s avg</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Study Sessions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Study Set
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cards
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studySessions.slice(-5).reverse().map((session) => {
                  const accuracy = (session.cards.filter(card => card.correct).length / session.cards.length) * 100;
                  return (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{session.setTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{session.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{session.durationMinutes}m</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{session.cards.length}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          accuracy >= 80 ? 'bg-green-100 text-green-800' :
                          accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {accuracy.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;