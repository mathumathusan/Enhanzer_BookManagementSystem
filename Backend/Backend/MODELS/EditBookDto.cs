namespace Backend.MODELS
{
	public class EditBookDto
	{
		public string title { get; set; }
		public string author { get; set; }

		public string isbn { get; set; }

		public DateTime publicationDate { get; set; }
	}
}
