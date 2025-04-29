import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                if (token) {
                    setUser(user);
                } else {
                    // If no token, user is not authenticated
                    setUser(null);
                }
            } else {
                setUser(null);
                localStorage.removeItem('token');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const initializeUserData = async (userId) => {
        try {
            // Initialize empty arrays for incomes and expenses
            await api.post('/user/initialize', {
                userId
            });
        } catch (error) {
            console.error('Error initializing user data:', error);
        }
    };

    const register = async (name, email, password) => {
        try {
            // Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Create user in backend
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                firebaseUid: userCredential.user.uid
            });

            // Sign out from Firebase after registration
            await signOut(auth);
            localStorage.removeItem('token');
            setUser(null);

            return { 
                success: true,
                message: response.data.message || 'Registration successful. Please login.'
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Registration failed'
            };
        }
    };

    const login = async (email, password) => {
        try {
            // Login with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Get token from backend
            const response = await api.post('/auth/login', {
                email,
                password
            });
            
            localStorage.setItem('token', `Bearer ${response.data.token}`);
            setUser(userCredential.user);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Login failed'
            };
        }
    };

    const googleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            if (!result.user) {
                throw new Error('No user data received from Google');
            }

            console.log('Google auth successful, user:', result.user.email);

            // Get the Google ID token
            const idToken = await result.user.getIdToken();
            console.log('Got Google ID token');

            // Register/login with backend
            const response = await api.post('/auth/google', {
                token: idToken,
                name: result.user.displayName || 'User',
                email: result.user.email,
                imageUrl: result.user.photoURL,
                firebaseUid: result.user.uid
            });

            console.log('Backend response:', response.data);

            if (!response.data || !response.data.token) {
                throw new Error('No token received from backend');
            }
            
            // Store the token
            localStorage.setItem('token', `Bearer ${response.data.token}`);
            
            // Set the user in state
            setUser(result.user);

            // Initialize user data if needed
            try {
                await initializeUserData(result.user.uid);
                console.log('User data initialized successfully');
            } catch (error) {
                console.error('Error initializing user data:', error);
            }

            return { success: true };
        } catch (error) {
            console.error('Google auth error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            // Clear any partial authentication state
            localStorage.removeItem('token');
            setUser(null);

            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Google authentication failed'
            };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            setUser(null);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Logout failed'
            };
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        googleAuth,
        logout,
        api
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};