import { useAuth } from '@/contexts/AuthContext';
import { usePledges } from '@/contexts/PledgeContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Calendar, Award, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { getUserPledges } = usePledges();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/auth" />;

  const userPledges = getUserPledges();
  const completedPledges = userPledges.filter(p => p.completed);
  const totalImpact = completedPledges.reduce((sum, p) => sum + p.impactMetric, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            <Link to="/community">
              <Button variant="outline" size="sm">Community</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
            <p className="text-muted-foreground">View your account details and achievements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Member Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{new Date(user.dateJoined).toLocaleDateString()}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Total Pledges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{userPledges.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Total Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalImpact.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">units saved</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Completed Pledges</CardTitle>
            </CardHeader>
            <CardContent>
              {completedPledges.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No completed pledges yet. Keep going!</p>
              ) : (
                <div className="space-y-3">
                  {completedPledges.map((pledge) => (
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
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
