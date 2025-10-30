import { useState } from 'react';
import { Pledge, TimelineEntry, usePledges } from '../contexts/PledgeContext';
import { Progress } from '../components/ui/progress';

interface PledgeTimelineProps {
  pledge: Pledge;
}

export function PledgeTimeline({ pledge }: PledgeTimelineProps) {
  const { addTimelineEntry } = usePledges();
  const [selectedMonth, setSelectedMonth] = useState<1 | 3 | 6>(1);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Calculate current progress based on timeline entries
  const currentProgress = pledge.timeline.length > 0 
    ? Math.max(...pledge.timeline.map(entry => entry.progressPercentage))
    : 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) return;
    
    // In a real app, you would upload the image to a server
    // For this demo, we'll use the data URL as the image URL
    addTimelineEntry(pledge.id, {
      imageUrl: previewUrl || '',
      description,
      month: selectedMonth
    });
    
    // Reset form
    setDescription('');
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Group timeline entries by month
  const entriesByMonth: Record<number, TimelineEntry[]> = {
    1: [],
    3: [],
    6: []
  };
  
  pledge.timeline.forEach(entry => {
    entriesByMonth[entry.month].push(entry);
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Progress Timeline</h3>
      
      {/* Progress Display */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Pledge Progress</span>
          <span className="text-sm font-medium">{currentProgress.toFixed(1)}%</span>
        </div>
        <Progress value={currentProgress} className="h-2" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Update Period</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setSelectedMonth(1)}
              className={`px-3 py-1 rounded ${selectedMonth === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              1 Month
            </button>
            <button
              type="button"
              onClick={() => setSelectedMonth(3)}
              className={`px-3 py-1 rounded ${selectedMonth === 3 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              3 Months
            </button>
            <button
              type="button"
              onClick={() => setSelectedMonth(6)}
              className={`px-3 py-1 rounded ${selectedMonth === 6 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              6 Months
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          disabled={!imageFile}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Add Progress Update
        </button>
      </form>
      
      <div className="space-y-6 mt-8">
        {[1, 3, 6].map(month => (
          <div key={month} className="border-l-2 border-green-500 pl-4">
            <h4 className="font-medium">{month} Month{month > 1 ? 's' : ''}</h4>
            {entriesByMonth[month].length > 0 ? (
              <div className="space-y-4 mt-2">
                {entriesByMonth[month].map(entry => (
                  <div key={entry.id} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <img 
                        src={entry.imageUrl} 
                        alt="Progress" 
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                    <p className="mt-2">{entry.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic mt-2">No updates yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}