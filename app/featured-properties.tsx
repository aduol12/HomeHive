import { useState, useEffect } from 'react';

interface Property {
  id: string;
  title: string;
  // Add other property fields as needed
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      console.log('Fetching properties...');
      const response = await fetch('/api/properties');
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Add null check and default to empty array
      const properties = data?.properties || [];
      console.log('Featured properties:', properties.slice(0, 3));
      
      setProperties(properties.slice(0, 3));
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setProperties([]); // Set empty array on error
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {properties.length === 0 ? (
        <div>No properties available</div>
      ) : (
        properties.map(property => (
          <div key={property.id}>
            <h3>{property.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}