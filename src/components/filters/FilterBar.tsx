import { Filter } from "lucide-react";
import { useWishlistStore } from "../../store/wishlistStore";
import { Priority } from "../../types";
import { Select } from "../ui/Select";

export function FilterBar() {
  const {
    filters,
    setSourceFilter,
    setCategoryFilter,
    setPriorityFilter,
    resetFilters,
    uniqueSources,
    uniqueCategories,
  } = useWishlistStore();

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null
  );

  return (
    <div className="py-3">
      <div className="flex flex-col gap-3">
        {/* Title and Reset Filter Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Filters</h2>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm"
            title="Reset filters"
          >
            <Filter
              className={`h-4 w-4 ${
                hasActiveFilters ? "text-primary" : "text-muted-foreground"
              }`}
            />
            {hasActiveFilters && (
              <span className="text-primary text-xs">Clear</span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns - Mobile: vertical stack, Tablet+: horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2">
          <div className="md:w-auto">
            <Select
              value={filters.source || ""}
              onChange={(e) => setSourceFilter(e.target.value || null)}
              options={[
                { value: "", label: "All Sources" },
                ...uniqueSources().map((source) => ({
                  value: source,
                  label: source,
                })),
              ]}
              className="w-full"
            />
          </div>
          <div className="md:w-auto">
            <Select
              value={filters.category || ""}
              onChange={(e) => setCategoryFilter(e.target.value || null)}
              options={[
                { value: "", label: "All Categories" },
                ...uniqueCategories().map((category) => ({
                  value: category,
                  label: category,
                })),
              ]}
              className="w-full"
            />
          </div>
          <div className="md:w-auto">
            <Select
              value={filters.priority || ""}
              onChange={(e) =>
                setPriorityFilter((e.target.value as Priority) || null)
              }
              options={[
                { value: "", label: "All Priorities" },
                { value: "High", label: "High Priority" },
                { value: "Medium", label: "Medium Priority" },
                { value: "Low", label: "Low Priority" },
              ]}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
