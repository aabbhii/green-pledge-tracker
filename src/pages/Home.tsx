import { Link } from 'react-router-dom';
import { Leaf, Users, TrendingUp, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePledges } from '@/contexts/PledgeContext';

const Home = () => {
  const { getAllPledges } = usePledges();
  const allPledges = getAllPledges();
  
  const totalImpact = allPledges.reduce((sum, p) => sum + p.impactMetric, 0);
  const completedPledges = allPledges.filter(p => p.completed).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Green Pledge</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/auth">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Make a Difference, One Pledge at a Time
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of eco-warriors making real environmental impact. 
            Track your green actions and inspire others to protect our planet.
          </p>
          <Link to="/auth">
            <Button size="lg" className="shadow-lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Community Impact
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">{allPledges.length}</div>
              <div className="text-muted-foreground">Total Pledges</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">{completedPledges}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border text-center">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">{totalImpact}</div>
              <div className="text-muted-foreground">Total Impact</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border text-center">
              <Droplets className="h-12 w-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">Active</div>
              <div className="text-muted-foreground">Community</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-8">
            We believe that small actions create big change. Every pledge you make contributes 
            to a healthier planet. Together, we can create a sustainable future for generations to come.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="outline">Join Us Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
