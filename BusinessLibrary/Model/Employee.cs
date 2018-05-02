using System;
using System.Collections.Generic;
using System.Text;
namespace BusinessLibrary.Model
{
	public class Employee
	{
		public string Code { get; set; }
		public string Name { get; set; }
		public string Gender { get; set; }
		public decimal AnnualSalary { get; set; }
		public string DateOfBirth { get; set; }
	}
}
