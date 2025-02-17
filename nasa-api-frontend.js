import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const NASA_API_ENDPOINT = "https://github.com/AkashKumar6095/nasa-explorer/blob/main/nasa-backend-explorer.js";

export default function NasaApp() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("mars");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(query);
  }, []);

  const fetchData = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching data for query:", searchQuery);
      const response = await fetch(`${NASA_API_ENDPOINT}?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <motion.h1 className="text-3xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        NASA Explorer
      </motion.h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a topic (e.g., Mars)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => fetchData(query)} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.collection?.items?.length > 0 ? (
          data.collection.items.map((item, index) => (
            <Card key={index} className="max-w-sm shadow-lg">
              <CardContent>
                {item.links?.[0]?.href && (
                  <img src={item.links[0].href} alt="NASA Image" className="rounded-lg" />
                )}
                <p className="mt-2 font-semibold">{item.data[0].title}</p>
                <p className="text-sm text-gray-600">{item.data[0].description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
