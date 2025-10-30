import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
// Remove axios import for now to fix the error
// import axios from 'axios';

export interface TimelineEntry {
  id: string;
  timestamp: string;
  imageUrl: string;
  description: string;
  month: 1 | 3 | 6;
  progressPercentage: number;
}

export interface Pledge {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  startDate: string;
  impactMetric: number;
  impactUnit: string;
  completed: boolean;
  timeline: TimelineEntry[];
}

interface PledgeContextType {
  pledges: Pledge[];
  addPledge: (pledge: Omit<Pledge, 'id' | 'userId' | 'timeline'>) => void;
  togglePledge: (id: string) => void;
  getUserPledges: () => Pledge[];
  getAllPledges: () => Pledge[];
  addTimelineEntry: (pledgeId: string, entry: Omit<TimelineEntry, 'id' | 'timestamp' | 'progressPercentage'>) => void;
}

const PledgeContext = createContext<PledgeContextType | undefined>(undefined);

export const PledgeProvider = ({ children }: { children: ReactNode }) => {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch pledges from localStorage when component mounts
    const storedPledges = localStorage.getItem('pledges');
    if (storedPledges) {
      setPledges(JSON.parse(storedPledges));
    }
  }, []);
  
  useEffect(() => {
    // Save pledges to localStorage when they change
    localStorage.setItem('pledges', JSON.stringify(pledges));
  }, [pledges]);

  const addPledge = (pledge: Omit<Pledge, 'id' | 'userId' | 'timeline'>) => {
    const newPledge: Pledge = {
      ...pledge,
      id: Date.now().toString(),
      userId: user?.id || 'anonymous',
      timeline: [],
      completed: false,
    };
    
    setPledges((prevPledges) => [...prevPledges, newPledge]);
  };

  const togglePledge = (id: string) => {
    setPledges((prevPledges) =>
      prevPledges.map((pledge) =>
        pledge.id === id ? { ...pledge, completed: !pledge.completed } : pledge
      )
    );
  };

  const getUserPledges = () => {
    return pledges.filter((pledge) => pledge.userId === user?.id);
  };

  const getAllPledges = () => {
    return pledges;
  };

  const addTimelineEntry = (pledgeId: string, entry: Omit<TimelineEntry, 'id' | 'timestamp' | 'progressPercentage'>) => {
    // Calculate progress percentage based on month
    let progressPercentage = 0;
    if (entry.month === 1) progressPercentage = 16.67; // 1/6 of the way (6 months total)
    else if (entry.month === 3) progressPercentage = 50; // 3/6 of the way
    else if (entry.month === 6) progressPercentage = 100; // 6/6 of the way (complete)
    
    const newEntry: TimelineEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      progressPercentage
    };
    
    setPledges((prevPledges) =>
      prevPledges.map((pledge) =>
        pledge.id === pledgeId
          ? { ...pledge, timeline: [...pledge.timeline, newEntry] }
          : pledge
      )
    );
  };

  return (
    <PledgeContext.Provider value={{ pledges, addPledge, togglePledge, getUserPledges, getAllPledges, addTimelineEntry }}>
      {children}
    </PledgeContext.Provider>
  );
};

export const usePledges = () => {
  const context = useContext(PledgeContext);
  if (context === undefined) {
    throw new Error('usePledges must be used within a PledgeProvider');
  }
  return context;
};
