import React, { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { WishlistItem, AddItemFormData, Priority } from "../../types";
import { useWishlistStore } from "../../store/wishlistStore";
import { Plus } from "lucide-react";

interface AddEditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: WishlistItem | null;
}

export function AddEditItemModal({
  isOpen,
  onClose,
  itemToEdit,
}: AddEditItemModalProps) {
  const isEditing = !!itemToEdit;
  const { addItem, updateItem, uniqueSources, uniqueCategories } =
    useWishlistStore();

  const initialFormState: AddItemFormData = {
    name: "",
    link: "",
    source: "",
    image_url: "",
    category: "",
    priority: "Medium",
    price: "",
    bought: false,
  };

  const [formData, setFormData] = useState<AddItemFormData>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddItemFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingNewSource, setIsAddingNewSource] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  // When the modal opens or the item to edit changes, reset the form
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        const { id, created_at, ...editData } = itemToEdit;
        setFormData(editData);
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
      setIsAddingNewSource(false);
      setIsAddingNewCategory(false);
    }
  }, [isOpen, itemToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof AddItemFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddItemFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.link.trim()) {
      newErrors.link = "Product link is required";
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = "Please enter a valid URL";
    }

    if (!formData.source.trim()) {
      newErrors.source = "Source is required";
    }

    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = "Please enter a valid image URL";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else {
      const priceValue = parseFloat(formData.price.replace(/,/g, ""));
      if (isNaN(priceValue) || priceValue <= 0) {
        newErrors.price = "Please enter a valid price greater than zero";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && itemToEdit) {
        await updateItem(itemToEdit.id, formData);
      } else {
        await addItem(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to validate URLs
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const sources = uniqueSources();
  const categories = uniqueCategories();

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Wishlist Item" : "Add New Wishlist Item"}
    >
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Product Name*
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={errors.name ? "border-error focus-visible:ring-error" : ""}
            autoComplete="off"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-error">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Product Link*
          </label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/product"
            className={errors.link ? "border-error focus-visible:ring-error" : ""}
            autoComplete="off"
          />
          {errors.link && (
            <p className="mt-1 text-xs text-error">{errors.link}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="source"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Source*
            </label>
            <div className="flex gap-2">
              {isAddingNewSource ? (
                <Input
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter new source"
                  className={
                    errors.source ? "border-error focus-visible:ring-error" : ""
                  }
                  autoComplete="off"
                />
              ) : (
                <Select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select source" },
                    ...sources.map((source) => ({
                      value: source,
                      label: source,
                    })),
                  ]}
                  className={
                    errors.source ? "border-error focus-visible:ring-error" : ""
                  }
                />
              )}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsAddingNewSource(!isAddingNewSource)}
                title={isAddingNewSource ? "Select existing" : "Add new"}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.source && (
              <p className="mt-1 text-xs text-error">{errors.source}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Category*
            </label>
            <div className="flex gap-2">
              {isAddingNewCategory ? (
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter new category"
                  className={
                    errors.category ? "border-error focus-visible:ring-error" : ""
                  }
                  autoComplete="off"
                />
              ) : (
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select category" },
                    ...categories.map((category) => ({
                      value: category,
                      label: category,
                    })),
                  ]}
                  className={
                    errors.category ? "border-error focus-visible:ring-error" : ""
                  }
                />
              )}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                title={isAddingNewCategory ? "Select existing" : "Add new"}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.category && (
              <p className="mt-1 text-xs text-error">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Priority
            </label>
            <Select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={priorityOptions}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Price*
            </label>
            <Input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className={
                errors.price ? "border-error focus-visible:ring-error" : ""
              }
              autoComplete="off"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-error">{errors.price}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Image URL
          </label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={
              errors.image_url ? "border-error focus-visible:ring-error" : ""
            }
            autoComplete="off"
          />
          {errors.image_url && (
            <p className="mt-1 text-xs text-error">{errors.image_url}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Leave empty to use default image
          </p>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="gradient" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Item"
              : "Add Item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}