
using System.ComponentModel.DataAnnotations;

namespace DataAccessLibrary.Models
{

	public partial class Employees
	{
		[Key]
		public string Code { get; set; }
		public string Name { get; set; }
		public string Gender { get; set; }
		public decimal AnnualSalary { get; set; }
		public string DateOfBirth { get; set; }
	}
}

