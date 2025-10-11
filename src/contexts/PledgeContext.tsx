import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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
}

interface PledgeContextType {
  pledges: Pledge[];
  addPledge: (pledge: Omit<Pledge, 'id' | 'userId'>) => void;
  togglePledge: (id: string) => void;
  getUserPledges: () => Pledge[];
  getAllPledges: () => Pledge[];
}

const PledgeContext = createContext<PledgeContextType | undefined>(undefined);

export const PledgeProvider = ({ children }: { children: ReactNode }) => {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedPledges = localStorage.getItem('pledges');
    if (storedPledges) {
      setPledges(JSON.parse(storedPledges));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pledges', JSON.stringify(pledges));
  }, [pledges]);

  const addPledge = (pledge: Omit<Pledge, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newPledge: Pledge = {
      ...pledge,
      id: Date.now().toString(),
      userId: user.id,
    };
    setPledges([...pledges, newPledge]);
  };

  const togglePledge = (id: string) => {
    setPledges(pledges.map(p => 
      p.id === id ? { ...p, completed: !p.completed } : p
    ));
  };

  const getUserPledges = () => {
    return user ? pledges.filter(p => p.userId === user.id) : [];
  };

  const getAllPledges = () => pledges;

  return (
    <PledgeContext.Provider value={{ pledges, addPledge, togglePledge, getUserPledges, getAllPledges }}>
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
