import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, TestResult, PlacementQuizResult } from '@/types';
import { mockUser } from '@/data/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  placementResult: PlacementQuizResult | null;
  testResults: TestResult[];
  currentTest: {
    testId: string | null;
    answers: Record<string, any>;
    timeSpent: number;
    currentQuestionIndex: number;
  } | null;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_PLACEMENT_RESULT'; payload: PlacementQuizResult }
  | { type: 'ADD_TEST_RESULT'; payload: TestResult }
  | { type: 'START_TEST'; payload: { testId: string } }
  | { type: 'UPDATE_TEST_PROGRESS'; payload: { answers: Record<string, any>; timeSpent: number; currentQuestionIndex: number } }
  | { type: 'COMPLETE_TEST' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_PERSISTED_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  placementResult: null,
  testResults: [],
  currentTest: null,
  isLoading: true,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_PLACEMENT_RESULT':
      return { ...state, placementResult: action.payload };
    case 'ADD_TEST_RESULT':
      return { ...state, testResults: [...state.testResults, action.payload] };
    case 'START_TEST':
      return {
        ...state,
        currentTest: {
          testId: action.payload.testId,
          answers: {},
          timeSpent: 0,
          currentQuestionIndex: 0,
        },
      };
    case 'UPDATE_TEST_PROGRESS':
      return {
        ...state,
        currentTest: state.currentTest ? {
          ...state.currentTest,
          ...action.payload,
        } : null,
      };
    case 'COMPLETE_TEST':
      return { ...state, currentTest: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOAD_PERSISTED_DATA':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadPersistedData();
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      persistData();
    }
  }, [state.user, state.testResults, state.placementResult, state.isLoading]);

  const loadPersistedData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const testResultsData = await AsyncStorage.getItem('testResults');
      const placementResultData = await AsyncStorage.getItem('placementResult');

      const persistedData: Partial<AppState> = {};

      if (userData) {
        persistedData.user = JSON.parse(userData);
        persistedData.isAuthenticated = true;
      }

      if (testResultsData) {
        persistedData.testResults = JSON.parse(testResultsData);
      }

      if (placementResultData) {
        persistedData.placementResult = JSON.parse(placementResultData);
      }

      dispatch({ type: 'LOAD_PERSISTED_DATA', payload: persistedData });
    } catch (error) {
      console.error('Error loading persisted data:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const persistData = async () => {
    try {
      if (state.user) {
        await AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
      await AsyncStorage.setItem('testResults', JSON.stringify(state.testResults));
      if (state.placementResult) {
        await AsyncStorage.setItem('placementResult', JSON.stringify(state.placementResult));
      }
    } catch (error) {
      console.error('Error persisting data:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};