import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Moon, Globe, Volume2, Smartphone } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Settings: React.FC = () => {
  const { user, updateUserPreferences } = useUserStore();
  const [preferences, setPreferences] = useState(user?.preferences || {
    darkMode: false,
    language: 'en',
    notifications: true,
    autoPlay: false,
    studyReminders: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    updateUserPreferences(preferences);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLanguageChange = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      language,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and study settings</p>
        </div>

        <div className="space-y-8">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={user?.username || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Language & Region</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Language</p>
                  <select
                    value={preferences.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Study Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Auto-play Audio</p>
                    <p className="text-sm text-gray-500">Automatically play pronunciation</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('autoPlay')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.autoPlay ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.autoPlay ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Study Reminders</p>
                    <p className="text-sm text-gray-500">Get reminded to study daily</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('studyReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.studyReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.studyReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end"
          >
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;