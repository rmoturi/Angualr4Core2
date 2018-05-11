using System.ComponentModel.DataAnnotations;

namespace BusinessLibrary.Model
{
    public class Contact
    {
        public int ContactId { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
        public string Phone { get; set; }
		[Required]
		public bool? Active { get; set; }
	}
}
