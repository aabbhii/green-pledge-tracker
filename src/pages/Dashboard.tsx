import { useAuth } from '../contexts/AuthContext';
import { usePledges } from '../contexts/PledgeContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Leaf, Plus, CheckCircle, Circle, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import analyticsBg from '../assets/analytics-bg.jpg';
import { PledgeTimeline } from '../components/PledgeTimeline';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { getUserPledges, togglePledge } = usePledges();

  if (!user) return <Navigate to="/auth" />;

  const userPledges = getUserPledges();
  const completed = userPledges.filter(p => p.completed).length;
  const total = userPledges.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const totalImpact = userPledges.filter(p => p.completed).reduce((sum, p) => sum + p.impactMetric, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Green Pledge</h1>
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground hidden sm:inline">Hello, {user.name}</span>
            <Link to="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" size="sm">Community</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Analytics Section */}
          <section className="relative overflow-hidden rounded-2xl" style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute inset-0 opacity-10">
              <img src={analyticsBg} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl backdrop-blur-sm">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Impact Analytics</h2>
                  <p className="text-muted-foreground">Your environmental contribution at a glance</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{total}</div>
                    <p className="text-sm text-muted-foreground">Total Pledges</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-full">
                        {total > 0 ? Math.round((completed / total) * 100) : 0}%
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{completed}</div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{totalImpact}</div>
                    <p className="text-sm text-muted-foreground">Impact Units</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {total - completed}
                    </div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Overall Progress</h3>
                    <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-3">
                    {completed} of {total} pledges completed • Keep up the great work!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Pledges Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold">Your Pledges</h3>
                <p className="text-sm text-muted-foreground">Manage and track your environmental commitments</p>
              </div>
              <Link to="/add-pledge">
                <Button className="shadow-lg hover:shadow-xl transition-shadow">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Pledge
                </Button>
              </Link>
            </div>

            {userPledges.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="text-center py-16">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <Leaf className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No pledges yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start your green journey by creating your first pledge and make a real difference!
                  </p>
                  <Link to="/add-pledge">
                    <Button size="lg" className="shadow-lg">Create Your First Pledge</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {userPledges.map((pledge) => (
                  <Card 
                    key={pledge.id} 
                    className={`transition-all hover:shadow-lg ${
                      pledge.completed 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{pledge.title}</CardTitle>
                          </div>
                          <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {pledge.category}
                          </div>
                        </div>
                        <button 
                          onClick={() => togglePledge(pledge.id)}
                          className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                        >
                          {pledge.completed ? (
                            <CheckCircle className="h-7 w-7 text-primary" />
                          ) : (
                            <Circle className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-muted-foreground">{pledge.description}</p>
                      
                      {/* Pledge Timeline Component */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <PledgeTimeline pledge={pledge} />
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Leaf className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-primary">{pledge.impactMetric} {pledge.impactUnit}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(pledge.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
