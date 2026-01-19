// hooks/useProjects.js
"use client";
import { useState, useEffect } from "react";

export function useProjects({ 
  category = null, 
  subcategory = null, 
  service = null,
  limit = 6, 
  featured = null,
  sortBy = 'createdAt',
  order = 'desc'
} = {}) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build query string
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (subcategory) params.append('subcategory', subcategory);
        if (service) params.append('service', service);
        if (limit) params.append('limit', limit.toString());
        if (featured !== null) params.append('featured', featured.toString());
        if (sortBy) params.append('sortBy', sortBy);
        if (order) params.append('order', order);
        
        const response = await fetch(`/api/projects?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.projects || []);
          setPagination(data.pagination || null);
        } else {
          throw new Error(data.error || "Failed to fetch projects");
        }
        
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [category, subcategory, service, limit, featured, sortBy, order]);

  return { projects, isLoading, error, pagination };
}