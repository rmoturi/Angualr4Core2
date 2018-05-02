using System;
using System.Collections.Generic;
using System.Text;
using BusinessLibrary.Model;
using System.Threading.Tasks;

namespace BusinessLibrary
{
	public interface IEmployeeRepository
	{
		Task<List<Employee>> GetAllEmployees();
		Task<bool> DeleteEmployee(string code);
	}
}
