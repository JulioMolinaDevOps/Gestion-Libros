import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Book, GENRES } from "../../../../core/models/book.model";
import { BookService } from "../../../../core/services/book.service";
import { NotificationService } from "../../../../shared/components/notification/notification.service";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.scss"],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  loading = false;
  saving = false;
  isEditMode = false;
  bookId: string | null = null;
  genres = GENRES;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      coverImageUrl: [
        "",
        [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(500)],
      ],
      description: ["", [Validators.maxLength(2000)]],
      publicationDate: [null],
      genre: [""],
      publisher: ["", [Validators.maxLength(100)]],
      isbn: ["", [Validators.pattern(/^[\d-]{10,17}$/)]],
      isAvailable: [true],
    });
  }

  private checkEditMode(): void {
    this.bookId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.bookId;

    if (this.isEditMode && this.bookId) {
      this.loadBook(this.bookId);
    }
  }

  private loadBook(id: string): void {
    this.loading = true;
    this.bookService
      .getBookById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (book) => {
          this.patchForm(book);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(["/books"]);
        },
      });
  }

  private patchForm(book: Book): void {
    const publicationDate = book.publicationDate
      ? new Date(book.publicationDate).toISOString().split("T")[0]
      : null;

    this.bookForm.patchValue({
      ...book,
      publicationDate,
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.markFormGroupTouched(this.bookForm);
      return;
    }

    this.saving = true;
    const bookData = this.prepareFormData();

    const operation = this.isEditMode
      ? this.bookService.updateBook(this.bookId!, bookData)
      : this.bookService.createBook(bookData);

    operation.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.saving = false;
        const bookTitle = this.bookForm.value.title || "Book";
        this.notificationService.showSuccess(
          this.isEditMode
            ? `Changes saved for "${bookTitle}".`
            : `"${bookTitle}" created successfully.`,
          4500,
          this.isEditMode ? "Book updated" : "Book created"
        );
        this.router.navigate(["/books"]);
      },
      error: () => {
        this.saving = false;
      },
    });
  }

  private prepareFormData(): Omit<Book, "_id" | "createdAt" | "updatedAt"> {
    const formValue = this.bookForm.value;

    return {
      title: formValue.title!,
      author: formValue.author!,
      coverImageUrl: formValue.coverImageUrl || undefined,
      description: formValue.description || undefined,
      publicationDate: formValue.publicationDate
        ? new Date(formValue.publicationDate)
        : undefined,
      genre: formValue.genre || undefined,
      publisher: formValue.publisher || undefined,
      isbn: formValue.isbn || undefined,
      isAvailable: formValue.isAvailable ?? true,
    };
  }

  onCancel(): void {
    this.router.navigate(["/books"]);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  get title() {
    return this.bookForm.get("title");
  }
  get author() {
    return this.bookForm.get("author");
  }
  get description() {
    return this.bookForm.get("description");
  }
  get coverImageUrl() {
    return this.bookForm.get("coverImageUrl");
  }
  get isbn() {
    return this.bookForm.get("isbn");
  }
  get publisher() {
    return this.bookForm.get("publisher");
  }
}
