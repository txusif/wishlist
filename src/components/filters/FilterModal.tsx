import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useWishlistStore } from "../../store/wishlistStore";
import { Priority } from "../../types";
import { X } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const {
    filters,
    setSourceFilter,
    setCategoryFilter,
    setPriorityFilter,
    resetFilters,
    uniqueSources,
    uniqueCategories,
  } = useWishlistStore();

  const priorityOptions: Priority[] = ["High", "Medium", "Low"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Items">
      <div className="space-y-6">
        {/* Sources */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Sources</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueSources().map((source) => (
              <Button
                key={source}
                variant={filters.source === source ? "gradient" : "outline"}
                size="sm"
                onClick={() =>
                  setSourceFilter(filters.source === source ? null : source)
                }
              >
                {source}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories().map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "gradient" : "outline"}
                size="sm"
                onClick={() =>
                  setCategoryFilter(
                    filters.category === category ? null : category
                  )
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Priority</h3>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((priority) => (
              <Button
                key={priority}
                variant={filters.priority === priority ? "gradient" : "outline"}
                size="sm"
                onClick={() =>
                  setPriorityFilter(
                    filters.priority === priority ? null : priority
                  )
                }
              >
                {priority}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(filters.source || filters.category || filters.priority) && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Active Filters
            </h3>
            <div className="flex flex-wrap gap-2">
              {filters.source && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSourceFilter(null)}
                  className="group"
                >
                  Source: {filters.source}
                  <X className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
                </Button>
              )}
              {filters.category && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCategoryFilter(null)}
                  className="group"
                >
                  Category: {filters.category}
                  <X className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
                </Button>
              )}
              {filters.priority && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPriorityFilter(null)}
                  className="group"
                >
                  Priority: {filters.priority}
                  <X className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={resetFilters}
            disabled={
              !filters.source && !filters.category && !filters.priority
            }
          >
            Reset All
          </Button>
          <Button variant="gradient" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}