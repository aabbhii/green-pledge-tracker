import { useAuth } from '@/contexts/AuthContext';
import { usePledges } from '@/contexts/PledgeContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, TrendingUp, Users, Award } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const { getAllPledges } = usePledges();

  if (!user) return <Navigate to="/auth" />;

  const allPledges = getAllPledges();
  const completedPledges = allPledges.filter(p => p.completed);
  const totalImpact = completedPledges.reduce((sum, p) => sum + p.impactMetric, 0);
  
  const categoryStats = allPledges.reduce((acc, pledge) => {
    acc[pledge.category] = (acc[pledge.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Green Pledge</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Community Impact</h2>
            <p className="text-muted-foreground">See how our community is making a difference together</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Total Pledges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{allPledges.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{completedPledges.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Total Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalImpact.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">units saved</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Leaf className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{Object.keys(categoryStats).length}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/20 h-2 rounded-full w-32">
                        <div 
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(count / allPledges.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count} pledges</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedPledges.slice(-5).reverse().map((pledge) => (
                  <div key={pledge.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{pledge.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {pledge.category} • {pledge.impactMetric} {pledge.impactUnit}
                      </p>
                    </div>
                  </div>
                ))}
                {completedPledges.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No completed pledges yet. Be the first!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Community;
