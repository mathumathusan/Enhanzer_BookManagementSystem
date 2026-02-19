import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../Book';
import { BookService } from '../book-service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
})
export class Books implements OnInit {
  books: Book[] = [];


  bookForm: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };

  isEditMode = false; 
  message: string = '';

  constructor(private bookService: BookService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cd.detectChanges();
    });
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  addBook(): void {
    const bookToAdd = { ...this.bookForm };
    this.bookService.addBook(bookToAdd).subscribe(() => {
      this.message = 'Book added successfully!';
      this.resetForm();
      this.loadBooks();
      this.clearMessage();
    });
  }

startEdit(book: Book): void {
  
  const formattedBook = {
    ...book,
    publicationDate: book.publicationDate ? new Date(book.publicationDate).toISOString().split('T')[0] : ''
  };

  this.bookForm = formattedBook;
  this.isEditMode = true;
}


  updateBook(): void {
    const bookToUpdate = { ...this.bookForm };
    this.bookService.updateBook(bookToUpdate.id, bookToUpdate).subscribe(() => {
      this.message = 'Book updated successfully!';
      this.resetForm();
      this.loadBooks();
      this.clearMessage();
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.bookService.deleteBook(id).subscribe(() => {
      this.message = 'Book deleted successfully!';
      this.loadBooks();
      this.clearMessage();
    });
  }

  resetForm(): void {
    this.bookForm = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
    this.isEditMode = false;
  }

  private clearMessage(): void {
    setTimeout(() => this.message = '', 3000);
  }
}
