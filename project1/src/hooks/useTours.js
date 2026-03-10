import { useState, useMemo } from "react";
import { tours } from "../data/tours";

export function useTours() {
  const [filters, setFilters] = useState({
    continents: [],
    activities: [],
    durations: [],
    priceMax: 200000,
  });

  const [sortBy, setSortBy] = useState("featured");

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (filters.continents.length > 0) {
      result = result.filter((t) => filters.continents.includes(t.continent));
    }

    if (filters.activities.length > 0) {
      result = result.filter((t) => filters.activities.includes(t.activity));
    }

    if (filters.durations.length > 0) {
      result = result.filter((t) => {
        return filters.durations.some((d) => {
          if (d === "1-3") return t.duration >= 1 && t.duration <= 3;
          if (d === "4-7") return t.duration >= 4 && t.duration <= 7;
          if (d === "8-14") return t.duration >= 8 && t.duration <= 14;
          if (d === "15+") return t.duration >= 15;
          return false;
        });
      });
    }

    // priceMax filter — tours.js prices are in NPR
    result = result.filter((t) => t.price <= filters.priceMax);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "duration") result.sort((a, b) => a.duration - b.duration);
    if (sortBy === "featured")
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return result;
  }, [filters, sortBy]);

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      continents: [],
      activities: [],
      durations: [],
      priceMax: 200000,
    });
  };

  const activeFilterCount =
    filters.continents.length +
    filters.activities.length +
    filters.durations.length +
    (filters.priceMax < 200000 ? 1 : 0);

  return {
    tours: filteredTours,
    allTours: tours,
    filters,
    sortBy,
    setSortBy,
    toggleFilter,
    setFilters,
    resetFilters,
    activeFilterCount,
  };
}
