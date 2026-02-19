using Backend.MODELS;
using Backend.MODELS.ENTITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Reflection.Metadata.BlobBuilder;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BooksController : ControllerBase
	{

		private static List<Book> books = new List<Book>();

		[HttpGet]
		public IActionResult GetAllBooks() { 
			return Ok(books);
		}

		[HttpPost]
		public IActionResult PostBook(AddBookDto Addbook) {


			if (Addbook == null)
				return BadRequest("Book data is required.");

			var book=new Book();


			book.id = books.Count > 0 ? books.Max(b => b.id) + 1 : 1;
			book.title=Addbook.title;
			book.author=Addbook.author;
			book.isbn=Addbook.isbn;
			book.publicationDate=Addbook.publicationDate;

			books.Add(book);

			return Ok(book);

			
			
		}

		[HttpGet]
		[Route("{id}")]
		public IActionResult GetBookById(int id) {

			var book = books.FirstOrDefault(b => b.id == id);
			if (book == null) return NotFound($"Book with ID {id} not found.");

			return Ok(book);
		}

		[HttpPut]
		[Route("{id}")]
		public IActionResult EditBookById(int id,EditBookDto newBook) {

			var book = books.FirstOrDefault(x => x.id == id);

			if (book == null) return NotFound();


			book.title=newBook.title;
		    book.author =newBook.author;
			book.publicationDate=newBook.publicationDate;
			book.isbn=newBook.isbn;
			return Ok(book);
		
		}

		[HttpDelete]
		[Route("{id}")]

		public IActionResult RemoveBookById(int id)
		{

			var book = books.FirstOrDefault(b => b.id == id);
			if (book == null) return NotFound($"Book with ID {id} not found.");

			books.Remove(book);
			return NoContent(); // RESTful 204 No Content



		}


	}
}
