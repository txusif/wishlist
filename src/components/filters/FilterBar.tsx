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
    <div className="py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-end">
        <div className="flex items-center space-x-2 sm:ml-auto">
          <Filter
            onClick={resetFilters}
            className={`h-5 w-5 ${
              hasActiveFilters ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
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
            className="w-full sm:w-40"
          />
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
            className="w-full sm:w-40"
          />
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
            className="w-full sm:w-40"
          />
        </div>
      </div>
    </div>
  );
}

// function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "INR",
//   }).format(amount);
// }
