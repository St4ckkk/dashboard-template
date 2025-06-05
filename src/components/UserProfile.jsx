'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Key,
  FileText,
  Info,
  Shield,
  Bell,
  Monitor,
} from 'lucide-react';
import Button from './ui/Button';

export default function ProfileSettingsComponent() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] = useState('general');

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    company: 'Tech Innovations Inc.',
    website: 'www.alexjohnson.com',
    position: 'Senior Frontend Developer',
    joinDate: 'January 15, 2022',
    bio: 'Experienced frontend developer with 5+ years of experience in React, Vue, and Angular. Passionate about creating intuitive user interfaces and maintaining high-quality code standards.',
    skills: [
      'React',
      'JavaScript',
      'TypeScript',
      'CSS',
      'Tailwind CSS',
      'UI/UX Design',
    ],
    education: [
      {
        degree: 'Master of Computer Science',
        institution: 'Stanford University',
        year: '2018-2020',
      },
      {
        degree: 'Bachelor of Engineering',
        institution: 'MIT',
        year: '2014-2018',
      },
    ],
  });

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      darkMode: false,
      compactView: true,
      language: 'english',
      timezone: 'UTC-5 (Eastern Standard Time)',
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      activityDigest: true,
      marketingUpdates: false,
    },
    security: {
      twoFactorAuth: false,
      passwordLastChanged: '2023-03-15',
      sessionTimeout: '30 minutes',
      loginAlerts: true,
    },
    privacy: {
      shareData: false,
      cookiePreferences: {
        necessary: true,
        functional: true,
        analytics: true,
        advertising: false,
      },
    },
  });

  const handleEditToggle = () => {
    if (isEditing) {
      showToast('info', 'Changes discarded');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast('success', 'Profile updated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleToggleSetting = (section, setting) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: !settings[section][setting],
      },
    });
    showToast('success', 'Setting updated successfully');
  };

  const handleSaveSettings = (section) => {
    showToast(
      'success',
      `${
        section.charAt(0).toUpperCase() + section.slice(1)
      } settings saved successfully`
    );
  };

  const showToast = (type, message) => {
    console.log(`${type}: ${message}`);
  };

  const renderToggle = (value, section, setting) => {
    return (
      <button
        onClick={() => handleToggleSetting(section, setting)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          value ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header/Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-48 relative">
          <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>{' '}
              <Button
                className="absolute bottom-2 right-2 rounded-full shadow !p-1.5 !text-gray-700 hover:!text-purple-600"
                variant="transparent"
              >
                <Camera size={16} />
              </Button>
            </div>
          </div>{' '}
          <div className="absolute right-6 top-6 flex gap-3">
            {!isEditing ? (
              <Button onClick={handleEditToggle} variant="banner" icon={Edit}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} variant="banner" icon={Save}>
                  Save Changes
                </Button>
                <Button onClick={handleEditToggle} variant="banner" icon={X}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-6 px-8">
          {/* Name and Title */}
          <div className="mb-6">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="text-2xl font-bold mb-1 border-b border-gray-300 pb-1 w-full focus:outline-none focus:border-purple-600"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                name="position"
                value={userData.position}
                onChange={handleInputChange}
                className="text-gray-500 text-sm border-b border-gray-300 pb-1 w-full focus:outline-none focus:border-purple-600"
              />
            ) : (
              <p className="text-gray-500 text-sm">{userData.position}</p>
            )}
          </div>{' '}
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <Button
                variant="tab"
                active={activeTab === 'personal'}
                onClick={() => setActiveTab('personal')}
              >
                Personal Info
              </Button>
              <Button
                variant="tab"
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </Button>
              <Button
                variant="tab"
                active={activeTab === 'activity'}
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </Button>
              <Button
                variant="tab"
                active={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
              >
                Account Settings
              </Button>
            </nav>
          </div>
          {/* Tab Content Container with Fixed Height */}
          <div className="min-h-[700px]">
            {/* Personal Info Tab Content */}
            <div className={`${activeTab === 'personal' ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Contact Info */}
                <div className="col-span-1">
                  <h2 className="text-lg font-medium mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="text-sm border-b border-gray-300 focus:outline-none focus:border-purple-600"
                          />
                        ) : (
                          <p className="text-sm">{userData.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="text-sm border-b border-gray-300 focus:outline-none focus:border-purple-600"
                          />
                        ) : (
                          <p className="text-sm">{userData.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Location</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleInputChange}
                            className="text-sm border-b border-gray-300 focus:outline-none focus:border-purple-600"
                          />
                        ) : (
                          <p className="text-sm">{userData.location}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Company</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="company"
                            value={userData.company}
                            onChange={handleInputChange}
                            className="text-sm border-b border-gray-300 focus:outline-none focus:border-purple-600"
                          />
                        ) : (
                          <p className="text-sm">{userData.company}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Website</p>
                        {isEditing ? (
                          <input
                            type="url"
                            name="website"
                            value={userData.website}
                            onChange={handleInputChange}
                            className="text-sm border-b border-gray-300 focus:outline-none focus:border-purple-600"
                          />
                        ) : (
                          <p className="text-sm">{userData.website}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="mt-1 text-gray-500 w-5 h-5" />
                      <div className="ml-4">
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-sm">{userData.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle & Right Column - Bio, Skills & Education */}
                <div className="col-span-1 lg:col-span-2">
                  {/* Bio */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">About</h2>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
                      />
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {userData.bio}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}{' '}
                      {isEditing && (
                        <Button
                          variant="transparent"
                          className="!px-3 !py-1 !bg-gray-100 !text-purple-600 !text-xs !font-medium"
                        >
                          + Add Skill
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-lg font-medium mb-3">Education</h2>
                    <div className="space-y-4">
                      {userData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-gray-200 pl-4 py-1"
                        >
                          <p className="text-sm font-medium">{edu.degree}</p>
                          <p className="text-xs text-gray-500">
                            {edu.institution}, {edu.year}
                          </p>
                        </div>
                      ))}{' '}
                      {isEditing && (
                        <Button
                          variant="transparent"
                          className="!text-purple-600 !text-sm !p-0 mt-2"
                        >
                          + Add Education
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Tab Content */}
            <div
              className={`${
                activeTab === 'notifications' ? 'block' : 'hidden'
              }`}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Comments</p>
                        <p className="text-xs text-gray-500">
                          Get notified when someone comments on your posts
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Project Updates</p>
                        <p className="text-xs text-gray-500">
                          Get notified about project status changes
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Marketing</p>
                        <p className="text-xs text-gray-500">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Push Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Receive notifications on your mobile device
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Desktop Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          Show notifications in your browser
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Tab Content */}
            <div className={`${activeTab === 'activity' ? 'block' : 'hidden'}`}>
              <div className="space-y-6">
                <h3 className="font-medium">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FileText className="text-gray-500 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        You created a new document
                      </p>
                      <p className="text-xs text-gray-500">Today at 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Info className="text-gray-500 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        You updated your profile information
                      </p>
                      <p className="text-xs text-gray-500">
                        Yesterday at 4:15 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Key className="text-gray-500 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        Password changed successfully
                      </p>
                      <p className="text-xs text-gray-500">
                        June 2, 2025 at 9:41 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="text-gray-500 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Account created</p>
                      <p className="text-xs text-gray-500">
                        January 15, 2022 at 2:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Tab Content */}
            <div className={`${activeTab === 'settings' ? 'block' : 'hidden'}`}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-64 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">
                    Settings
                  </h3>{' '}
                  <nav className="space-y-1">
                    <Button
                      variant="settingsTab"
                      active={activeSettingsSection === 'general'}
                      onClick={() => setActiveSettingsSection('general')}
                      icon={Monitor}
                      fullWidth
                    >
                      General
                    </Button>
                    <Button
                      variant="settingsTab"
                      active={activeSettingsSection === 'notifications'}
                      onClick={() => setActiveSettingsSection('notifications')}
                      icon={Bell}
                      fullWidth
                    >
                      Notifications
                    </Button>
                    <Button
                      variant="settingsTab"
                      active={activeSettingsSection === 'security'}
                      onClick={() => setActiveSettingsSection('security')}
                      icon={Shield}
                      fullWidth
                    >
                      Security
                    </Button>
                    <Button
                      variant="settingsTab"
                      active={activeSettingsSection === 'privacy'}
                      onClick={() => setActiveSettingsSection('privacy')}
                      icon={Info}
                      fullWidth
                    >
                      Privacy
                    </Button>
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                  {/* General Settings */}
                  {activeSettingsSection === 'general' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                          General Settings
                        </h2>
                        <Button
                          onClick={() => handleSaveSettings('general')}
                          variant="primary"
                          icon={Save}
                        >
                          Save Changes
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Dark Mode</h3>
                            <p className="text-xs text-gray-500">
                              Enable dark theme for the dashboard
                            </p>
                          </div>
                          {renderToggle(
                            settings.general.darkMode,
                            'general',
                            'darkMode'
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Compact View
                            </h3>
                            <p className="text-xs text-gray-500">
                              Display more content with reduced spacing
                            </p>
                          </div>
                          {renderToggle(
                            settings.general.compactView,
                            'general',
                            'compactView'
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Language</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Select your preferred language
                          </p>
                          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                            <option value="english">English (US)</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-sm font-medium">Timezone</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Select your timezone
                          </p>
                          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/20">
                            <option value="utc-5">
                              UTC-5 (Eastern Standard Time)
                            </option>
                            <option value="utc-8">
                              UTC-8 (Pacific Standard Time)
                            </option>
                            <option value="utc+0">
                              UTC+0 (Greenwich Mean Time)
                            </option>
                            <option value="utc+1">
                              UTC+1 (Central European Time)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSettingsSection === 'notifications' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                          Notification Settings
                        </h2>
                        <Button
                          onClick={() => handleSaveSettings('notifications')}
                          variant="primary"
                          icon={Save}
                        >
                          Save Changes
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Email Notifications
                            </h3>
                            <p className="text-xs text-gray-500">
                              Receive important updates via email
                            </p>
                          </div>
                          {renderToggle(
                            settings.notifications.email,
                            'notifications',
                            'email'
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Push Notifications
                            </h3>
                            <p className="text-xs text-gray-500">
                              Allow browser push notifications
                            </p>
                          </div>
                          {renderToggle(
                            settings.notifications.push,
                            'notifications',
                            'push'
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              SMS Notifications
                            </h3>
                            <p className="text-xs text-gray-500">
                              Receive critical alerts via text message
                            </p>
                          </div>
                          {renderToggle(
                            settings.notifications.sms,
                            'notifications',
                            'sms'
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Activity Digest
                            </h3>
                            <p className="text-xs text-gray-500">
                              Weekly summary of account activity
                            </p>
                          </div>
                          {renderToggle(
                            settings.notifications.activityDigest,
                            'notifications',
                            'activityDigest'
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Marketing Updates
                            </h3>
                            <p className="text-xs text-gray-500">
                              Receive news and promotional messages
                            </p>
                          </div>
                          {renderToggle(
                            settings.notifications.marketingUpdates,
                            'notifications',
                            'marketingUpdates'
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSettingsSection === 'security' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                          Security Settings
                        </h2>
                        <Button
                          onClick={() => handleSaveSettings('security')}
                          variant="primary"
                          icon={Save}
                        >
                          Save Changes
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-xs text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          {renderToggle(
                            settings.security.twoFactorAuth,
                            'security',
                            'twoFactorAuth'
                          )}
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-sm font-medium">
                            Change Password
                          </h3>
                          <p className="text-xs text-gray-500 mb-4">
                            Last changed:{' '}
                            {settings.security.passwordLastChanged}
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                              />
                            </div>{' '}
                            <Button
                              onClick={() =>
                                showToast(
                                  'success',
                                  'Password updated successfully'
                                )
                              }
                              variant="primary"
                            >
                              Update Password
                            </Button>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-sm font-medium">
                            Session Management
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <p className="text-xs text-gray-500">
                                Session Timeout
                              </p>
                            </div>
                            <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600/20 text-sm">
                              <option>15 minutes</option>
                              <option>30 minutes</option>
                              <option>1 hour</option>
                              <option>4 hours</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Login Alerts
                            </h3>
                            <p className="text-xs text-gray-500">
                              Get notified of new logins to your account
                            </p>
                          </div>
                          {renderToggle(
                            settings.security.loginAlerts,
                            'security',
                            'loginAlerts'
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeSettingsSection === 'privacy' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                          Privacy Settings
                        </h2>
                        <Button
                          onClick={() => handleSaveSettings('privacy')}
                          variant="primary"
                          icon={Save}
                        >
                          Save Changes
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              Data Sharing
                            </h3>
                            <p className="text-xs text-gray-500">
                              Allow us to share anonymized usage data
                            </p>
                          </div>
                          {renderToggle(
                            settings.privacy.shareData,
                            'privacy',
                            'shareData'
                          )}
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-sm font-medium">
                            Cookie Preferences
                          </h3>
                          <p className="text-xs text-gray-500 mb-4">
                            Manage how we use cookies
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-medium">
                                  Necessary Cookies
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Required for basic functionality
                                </p>
                              </div>
                              <div className="text-xs text-gray-400">
                                Required
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-medium">
                                  Functional Cookies
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Enhance your user experience
                                </p>
                              </div>
                              {renderToggle(
                                settings.privacy.cookiePreferences.functional,
                                'privacy',
                                'functional'
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-medium">
                                  Analytics Cookies
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Help us improve our services
                                </p>
                              </div>
                              {renderToggle(
                                settings.privacy.cookiePreferences.analytics,
                                'privacy',
                                'analytics'
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-medium">
                                  Advertising Cookies
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Tailored advertising based on browsing
                                </p>
                              </div>
                              {renderToggle(
                                settings.privacy.cookiePreferences.advertising,
                                'privacy',
                                'advertising'
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-sm font-medium">
                            Data Export & Deletion
                          </h3>
                          <p className="text-xs text-gray-500 mb-4">
                            Manage your personal data
                          </p>{' '}
                          <div className="flex gap-4">
                            <Button
                              onClick={() =>
                                showToast(
                                  'info',
                                  'Data export requested. You will receive a download link by email.'
                                )
                              }
                              variant="secondary"
                            >
                              Export Data
                            </Button>
                            <Button
                              onClick={() =>
                                showToast(
                                  'warning',
                                  'This action cannot be undone. Please confirm deletion via the email we just sent.'
                                )
                              }
                              variant="danger"
                            >
                              Request Account Deletion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
