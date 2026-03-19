import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Book, BookFilters, GENRES } from "../../../../core/models/book.model";
import { BookService } from "../../../../core/services/book.service";
import { NotificationService } from "../../../../shared/components/notification/notification.service";
import { ConfirmDialogService } from "../../../../shared/components/confirm-dialog/confirm-dialog.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  viewMode: "table" | "cards" = "table";
  Math = Math;
  loading = false;
  filters: BookFilters = {
    page: 1,
    limit: 10,
  };
  total = 0;
  totalPages = 0;
  genres = GENRES;
  private readonly viewModeStorageKey = "books-list-view-mode";
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private router: Router,
    private notificationService: NotificationService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
    this.loadViewMode();
    this.loadBooks();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filters.search = searchTerm || undefined;
        this.filters.page = 1;
        this.loadBooks();
      });
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService
      .getBooks(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.books = response.data;
          this.total = response.total;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onGenreChange(genre: string): void {
    this.filters.genre = genre || undefined;
    this.filters.page = 1;
    this.loadBooks();
  }

  onAvailabilityChange(isAvailable: string): void {
    this.filters.isAvailable =
      isAvailable === "" ? undefined : isAvailable === "true";
    this.filters.page = 1;
    this.loadBooks();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.filters.page = page;
      this.loadBooks();
    }
  }

  onCreate(): void {
    this.router.navigate(["/books/create"]);
  }

  setViewMode(mode: "table" | "cards"): void {
    this.viewMode = mode;
    localStorage.setItem(this.viewModeStorageKey, mode);
  }

  onView(id: string): void {
    this.router.navigate(["/books", id]);
  }

  onEdit(id: string): void {
    this.router.navigate(["/books", id, "edit"]);
  }

  onDelete(id: string): void {
    this.confirmDialogService
      .confirm({
        title: "Delete Book",
        message:
          "Are you sure you want to delete this book? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.deleteBook(id);
        }
      });
  }

  private deleteBook(id: string): void {
    this.bookService
      .deleteBook(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Book deleted successfully");
          this.loadBooks();
        },
      });
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.filters.page - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  }

  private loadViewMode(): void {
    const savedMode = localStorage.getItem(this.viewModeStorageKey);
    const isMobileResolution = window.matchMedia("(max-width: 767px)").matches;

    if (isMobileResolution) {
      this.viewMode = "cards";
      return;
    }

    this.viewMode = savedMode === "cards" ? "cards" : "table";
  }
}
