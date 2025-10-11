import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePledges } from '@/contexts/PledgeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddPledge = () => {
  const { user } = useAuth();
  const { addPledge } = usePledges();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [impactMetric, setImpactMetric] = useState('');
  const [impactUnit, setImpactUnit] = useState('');

  if (!user) return <Navigate to="/auth" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addPledge({
      title,
      category,
      description,
      startDate: new Date().toISOString(),
      impactMetric: parseFloat(impactMetric),
      impactUnit,
      completed: false,
    });

    toast({ title: 'Pledge created successfully!' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Green Pledge</h1>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Create a New Pledge</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Pledge Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pledge Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g., Plant 5 trees this month"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Trees">Trees & Plants</SelectItem>
                      <SelectItem value="Plastic">Reduce Plastic</SelectItem>
                      <SelectItem value="Water">Water Conservation</SelectItem>
                      <SelectItem value="Energy">Energy Saving</SelectItem>
                      <SelectItem value="Transport">Sustainable Transport</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Describe your green pledge..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Impact Metric</label>
                    <Input
                      type="number"
                      value={impactMetric}
                      onChange={(e) => setImpactMetric(e.target.value)}
                      required
                      placeholder="e.g., 5"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <Input
                      value={impactUnit}
                      onChange={(e) => setImpactUnit(e.target.value)}
                      required
                      placeholder="e.g., trees, kg, litres"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Pledge
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddPledge;
