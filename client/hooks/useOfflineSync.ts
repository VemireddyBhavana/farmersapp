import { useState, useEffect } from 'react';
import { backend, CommunityPost, PostComment } from '../lib/MockBackend';

type OfflineAction = 
  | { type: 'CREATE_POST'; payload: Omit<CommunityPost, "id" | "upvotes" | "comments" | "timestamp"> }
  | { type: 'UPVOTE_POST'; payload: { postId: string } }
  | { type: 'ADD_COMMENT'; payload: { postId: string, comment: Omit<PostComment, "id" | "timestamp"> } };

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<OfflineAction[]>([]);
  const [syncing, setSyncing] = useState(false);

  // Load queue on mount
  useEffect(() => {
    const saved = localStorage.getItem('agri_offline_queue');
    if (saved) {
      try {
        setQueue(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse offline queue", e);
      }
    }
  }, []);

  // Save queue whenever it changes
  useEffect(() => {
    localStorage.setItem('agri_offline_queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Process queue when coming online
  useEffect(() => {
    if (isOnline && queue.length > 0 && !syncing) {
      processQueue();
    }
  }, [isOnline, queue, syncing]);

  const processQueue = async () => {
    setSyncing(true);
    
    // In a real app, this would be API calls. Since we have a synchronous MockBackend,
    // we simulate network delay.
    const currentQueue = [...queue];
    setQueue([]); // Clear queue optimistically

    for (const action of currentQueue) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
      try {
        if (action.type === 'CREATE_POST') {
          backend.addCommunityPost(action.payload);
        } else if (action.type === 'UPVOTE_POST') {
          backend.upvotePost(action.payload.postId);
        } else if (action.type === 'ADD_COMMENT') {
          backend.addComment(action.payload.postId, action.payload.comment);
        }
      } catch (err) {
        console.error("Failed to sync action", action, err);
        // In real app, might want to re-queue failures
      }
    }
    
    setSyncing(false);
    // Force a re-render of components using the backend by emitting an event or just letting them poll.
    // For simplicity, we just dispatch a custom event that UI can listen to.
    window.dispatchEvent(new Event('community_sync_complete'));
  };

  const addActionToQueue = (action: OfflineAction) => {
    if (isOnline) {
      // Execute immediately if online (simulated API call)
      if (action.type === 'CREATE_POST') backend.addCommunityPost(action.payload);
      if (action.type === 'UPVOTE_POST') backend.upvotePost(action.payload.postId);
      if (action.type === 'ADD_COMMENT') backend.addComment(action.payload.postId, action.payload.comment);
      window.dispatchEvent(new Event('community_sync_complete'));
    } else {
      // Queue if offline
      setQueue(prev => [...prev, action]);
    }
  };

  return { isOnline, queueLength: queue.length, syncing, addActionToQueue };
}
