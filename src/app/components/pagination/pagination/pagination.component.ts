import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() page: number = 0;

  @Output() change = new EventEmitter<number>();

  changePage(page: number): void {
    this.page = page - 1;
    this.change.emit(this.page);
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page -= 1;
      this.change.emit(this.page);
    }
    console.log("previousPage", this.page)
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.total / this.limit);
    this.page += 1;
    if (this.page + 1 <= totalPages) {
      this.change.emit(this.page);
    } else {
      this.page -= 1;
    }
  }

  getPages(): number[] {
    const pagesToShow: number[] = [];
    const totalPages = Math.ceil(this.total / this.limit);
  
    for (let i = this.page - 3; (i <= this.page + 3); i++) {
      if (i > 0 && i <= totalPages) {
        pagesToShow.push(i);
      }
    }
  
    return pagesToShow;
  }

  checkFinalPage(): boolean {
    const totalPages = Math.ceil(this.total / this.limit);
    return !(this.page + 1 === totalPages);
  }
}
