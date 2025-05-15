import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Category } from '../../types/category.type';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss'],
})
export class SidenavigationComponent implements OnDestroy {
  @Output()
  subCategoryClicked: EventEmitter<string> = new EventEmitter<string>();
  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(categoryStore: CategoriesStoreItem) {
    this.subscriptions.add(
      categoryStore.categories$.subscribe((categories) => {
        console.log('Fetched Categories:', categories);
        this.categories = categories;
      })
    );
  }
  getCategories(parentCategoryId?: string): Category[] {
    if (!this.categories || this.categories.length === 0) {
      console.log('Categories not loaded yet');
      return [];
    }
  
    console.log('Parent Category ID:', parentCategoryId);
    
    const filteredCategories = this.categories.filter((category) => {
      const isMatch = parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : !category.parent_category_id; // Handles undefined or null for main categories
      console.log('Checking Category:', category, 'Match:', isMatch);
      return isMatch;
    });
  
    console.log('Filtered Categories:', filteredCategories);
    return filteredCategories;
  }
  
  
  
  

  onSubCategoryClick(subCategory: Category): void {
    console.log('Subcategory Clicked:', subCategory);
    this.subCategoryClicked.emit(subCategory._id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
