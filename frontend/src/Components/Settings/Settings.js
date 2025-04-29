import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';

function Settings() {
    const [settings, setSettings] = useState({
        currency: 'USD',
        theme: 'light',
        notifications: true,
        language: 'English',
        dateFormat: 'MM/DD/YYYY'
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <h1>Settings</h1>
                <div className="settings-content">
                    <div className="settings-section">
                        <h2>General Settings</h2>
                        <div className="setting-item">
                            <label>Currency</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => handleSettingChange('currency', e.target.value)}
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="JPY">JPY (¥)</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label>Theme</label>
                            <select
                                value={settings.theme}
                                onChange={(e) => handleSettingChange('theme', e.target.value)}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label>Language</label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleSettingChange('language', e.target.value)}
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2>Display Settings</h2>
                        <div className="setting-item">
                            <label>Date Format</label>
                            <select
                                value={settings.dateFormat}
                                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                            >
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label>Notifications</label>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2>Account Settings</h2>
                        <div className="setting-item">
                            <label>Email</label>
                            <input
                                type="email"
                                value="user@example.com"
                                disabled
                            />
                        </div>
                        <div className="setting-item">
                            <label>Password</label>
                            <button className="change-password-btn">
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="settings-actions">
                        <button className="save-btn">
                            Save Changes
                        </button>
                        <button className="reset-btn">
                            Reset to Default
                        </button>
                    </div>
                </div>
            </InnerLayout>
        </SettingsStyled>
    );
}

const SettingsStyled = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: 1rem;
    margin: 0;
    background: #f9f9f9;
    width: calc(100% - 300px);
    margin-left: 300px;
    position: fixed;
    top: 0;
    right: 0;

    @media screen and (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        padding: 0.5rem;
        position: relative;
        height: auto;
        overflow-y: auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        font-weight: bold;
        color: #333;
    }

    .settings-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
        height: calc(100vh - 150px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0;
        }

        @media screen and (max-width: 768px) {
            height: auto;
            padding: 0.5rem;
        }

        .settings-section {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

            h2 {
                color: #333;
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
            }

            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #e0e0e0;

                &:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }

                label {
                    color: #666;
                    font-size: 1rem;
                }

                select, input {
                    padding: 0.5rem 1rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    background: white;
                    color: #333;
                    font-size: 1rem;
                    outline: none;

                    &:disabled {
                        background: #f5f5f5;
                        cursor: not-allowed;
                    }
                }

                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;

                    input {
                        opacity: 0;
                        width: 0;
                        height: 0;

                        &:checked + .slider {
                            background-color: #42ad00;
                        }

                        &:checked + .slider:before {
                            transform: translateX(26px);
                        }
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #ccc;
                        transition: .4s;
                        border-radius: 34px;

                        &:before {
                            position: absolute;
                            content: "";
                            height: 26px;
                            width: 26px;
                            left: 4px;
                            bottom: 4px;
                            background-color: white;
                            transition: .4s;
                            border-radius: 50%;
                        }
                    }
                }

                .change-password-btn {
                    background: none;
                    border: 1px solid #42ad00;
                    color: #42ad00;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: #42ad00;
                        color: white;
                    }
                }
            }
        }

        .settings-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;

            button {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;

                &.save-btn {
                    background: #42ad00;
                    color: white;

                    &:hover {
                        background: #3a9a00;
                    }
                }

                &.reset-btn {
                    background: #e74c3c;
                    color: white;

                    &:hover {
                        background: #c0392b;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .settings-content {
            .settings-section {
                padding: 1rem;
            }

            .setting-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }

            .settings-actions {
                flex-direction: column;

                button {
                    width: 100%;
                }
            }
        }
    }
`;

export default Settings; 