import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Component for displaying pagination controls.
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  /**
   * Event emitter for page change.
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Navigates to the specified page number.
   * @param pageNumber - The page number to navigate to.
   */
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }

  /**
   * Returns an array of page numbers from 1 to the total number of pages.
   * @returns An array of page numbers.
   */
  getPageRange(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}