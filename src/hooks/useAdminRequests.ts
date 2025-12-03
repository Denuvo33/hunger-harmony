import { useState, useEffect } from 'react';
import { AdminRequest, AdminRequestStatus } from '@/types';
import { mockAdminRequests } from '@/data/mockData';

const REQUESTS_KEY = 'hungers_harmony_admin_requests';

export function useAdminRequests() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setLoading(true);
    const stored = localStorage.getItem(REQUESTS_KEY);
    if (stored) {
      try {
        setRequests(JSON.parse(stored));
      } catch {
        setRequests(mockAdminRequests);
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(mockAdminRequests));
      }
    } else {
      setRequests(mockAdminRequests);
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(mockAdminRequests));
    }
    setLoading(false);
  };

  const submitRequest = (request: Omit<AdminRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: AdminRequest = {
      ...request,
      id: `req_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [...requests, newRequest];
    setRequests(updated);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
    return newRequest;
  };

  const updateRequestStatus = (requestId: string, status: AdminRequestStatus) => {
    const updated = requests.map((r) =>
      r.id === requestId ? { ...r, status } : r
    );
    setRequests(updated);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  };

  const getPendingRequests = () => requests.filter((r) => r.status === 'pending');

  return {
    requests,
    loading,
    submitRequest,
    updateRequestStatus,
    getPendingRequests,
    reload: loadRequests,
  };
}
