import { Link } from 'react-router-dom';
import { Leaf, Users, TrendingUp, Droplets, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { usePledges } from '../contexts/PledgeContext';
import heroForest from '../assets/hero-forest.jpg';
import communityHero from '../assets/community-hero.jpg';

const Home = () => {
  const { getAllPledges } = usePledges();
  const allPledges = getAllPledges();
  
  const totalImpact = allPledges.reduce((sum, p) => sum + p.impactMetric, 0);
  const completedPledges = allPledges.filter(p => p.completed).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
              <Button className="shadow-lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroForest} 
            alt="Beautiful green forest" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join the Green Movement</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Make a Difference, One Pledge at a Time
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our community of eco-warriors making real environmental impact. 
              Track your green actions and inspire others to protect our planet.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="shadow-lg bg-background/50 backdrop-blur-sm">
                  Explore Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">
              Our Community Impact
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real people making real change. Together we're building a sustainable future.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{allPledges.length}</div>
                <div className="text-muted-foreground font-medium">Total Pledges</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{completedPledges}</div>
                <div className="text-muted-foreground font-medium">Completed</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{totalImpact}</div>
                <div className="text-muted-foreground font-medium">Total Impact</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                  <Droplets className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">Active</div>
                <div className="text-muted-foreground font-medium">Community</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-20 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20 hidden lg:block">
          <img src={communityHero} alt="Community planting trees" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Mission</span>
            </div>
            
            <h3 className="text-4xl font-bold mb-6 text-foreground">
              Small Actions, Big Change
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe that every action counts. Whether it's planting a tree, reducing plastic, 
              or conserving water - your pledges contribute to a healthier planet. Join thousands 
              of eco-warriors creating a sustainable future for generations to come.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track Your Impact</h4>
                  <p className="text-muted-foreground">Monitor your environmental contributions with detailed analytics</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Join the Community</h4>
                  <p className="text-muted-foreground">Connect with like-minded individuals making a difference</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">See Real Results</h4>
                  <p className="text-muted-foreground">Visualize the collective impact of our global community</p>
                </div>
              </div>
            </div>
            
            <Link to="/auth">
              <Button size="lg" className="shadow-lg">
                Join Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
