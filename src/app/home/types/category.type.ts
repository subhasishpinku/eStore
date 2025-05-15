export interface Category {
    _id: string; // Unique identifier for each category
    category_name: string; // Name of the category
    parent_category_id?: string; // Optional: ID of the parent category (if it's a subcategory)
}