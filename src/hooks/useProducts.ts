import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { STORE_CONFIG } from '../config/store';
import { products as localProducts, categories as localCategories } from '../data/products';

export type Product = {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [categories, setCategories] = useState<string[]>(localCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!STORE_CONFIG.googleSheetCsvUrl) {
      // Use local default data if there is no Google Sheet link
      setProducts(localProducts);
      setCategories(localCategories);
      setLoading(false);
      return;
    }

    // Check if we have cached data
    const cachedData = sessionStorage.getItem('cachedProducts');
    const cachedTime = sessionStorage.getItem('cachedProductsTime');
    const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION) {
      try {
        const parsed = JSON.parse(cachedData);
        setProducts(parsed.products);
        setCategories(parsed.categories);
        setLoading(false);
        return;
      } catch (e) {
        // Cache parsing failed, proceed to fetch
      }
    }

    // Fetch from Google Sheet CSV
    Papa.parse(STORE_CONFIG.googleSheetCsvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        // Filter out empty rows that might be parsed
        const parsedProducts = results.data.filter((p: any) => p.name && p.price);
        
        if (parsedProducts.length > 0) {
          const formattedProducts = parsedProducts.map((p: any) => {
            let price = p.price?.toString().trim() || '';
            if (!price.startsWith('₹') && !price.toLowerCase().startsWith('rs')) {
              price = `₹${price}`;
            }
            return {
              ...p,
              price
            };
          });

          setProducts(formattedProducts as Product[]);
          
          // Generate unique categories dynamically from the data
          const cats = Array.from(new Set(formattedProducts.map((p: Product) => p.category).filter(Boolean)));
          const updatedCategories = ['All', ...cats] as string[];
          setCategories(updatedCategories);

          // Save to cache
          sessionStorage.setItem('cachedProducts', JSON.stringify({
             products: formattedProducts,
             categories: updatedCategories
          }));
          sessionStorage.setItem('cachedProductsTime', Date.now().toString());
        }
        
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching or parsing Google Sheet:", err);
        // Fallback to local data on error
        setProducts(localProducts);
        setCategories(localCategories);
        setLoading(false);
      }
    });
  }, []);

  return { products, categories, loading };
}
