using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLibrary.Model;
using DataAccessLibrary.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary
{
	public class EmployeeRepository : IEmployeeRepository
	{

		public async Task<List<Employee>> GetAllEmployees()
		{
			using (ContactDBContext db = new ContactDBContext())
			{
				return await (from e in db.Employees
							  select new Employee
							  {
								  Code = e.Code,
								  Name = e.Name,
								  Gender = e.Gender,
								  AnnualSalary = e.AnnualSalary,
								  DateOfBirth = e.DateOfBirth
							  }).ToListAsync();
			}
		}

		public async Task<bool> DeleteEmployee(string code)
		{
			using (ContactDBContext db = new ContactDBContext())
			{

				Employees employee = db.Employees.Where(x => x.Code == code).FirstOrDefault();
				if (employee != null)
				{
					db.Employees.Remove(employee);
				}
				return await db.SaveChangesAsync() >= 1;
			}
		}
	}
}
