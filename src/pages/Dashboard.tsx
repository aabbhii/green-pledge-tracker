import { useAuth } from '@/contexts/AuthContext';
import { usePledges } from '@/contexts/PledgeContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Leaf, Plus, CheckCircle, Circle } from 'lucide-react';

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
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Green Pledge</h1>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground">Hello, {user.name}</span>
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Your Impact Dashboard</h2>
            <p className="text-muted-foreground">Track your green pledges and environmental impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Pledges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{completed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalImpact}</div>
                <p className="text-sm text-muted-foreground">units saved</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">{completed} of {total} pledges completed</p>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Pledges</h3>
            <Link to="/add-pledge">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Pledge
              </Button>
            </Link>
          </div>

          {userPledges.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Leaf className="h-16 w-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No pledges yet</h3>
                <p className="text-muted-foreground mb-4">Start your green journey by creating your first pledge!</p>
                <Link to="/add-pledge">
                  <Button>Create Your First Pledge</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {userPledges.map((pledge) => (
                <Card key={pledge.id} className={pledge.completed ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{pledge.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{pledge.category}</p>
                      </div>
                      <button onClick={() => togglePledge(pledge.id)}>
                        {pledge.completed ? (
                          <CheckCircle className="h-6 w-6 text-primary" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{pledge.description}</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Impact: {pledge.impactMetric} {pledge.impactUnit}</span>
                      <span>{new Date(pledge.startDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
