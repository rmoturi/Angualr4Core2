using System.ComponentModel.DataAnnotations;

namespace DataAccessLibrary.Models
{

	public partial class Employers
	{
		[Key]
		public string ERPEmployerID { get; set; }
		public string EmployerName { get; set; }
		public bool? Active { get; set; }
	}
}
