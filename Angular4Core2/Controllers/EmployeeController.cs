using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary;

namespace Angular4Core2.Controllers
{
	public class EmployeeController : Controller
    {

		public IEmployeeRepository EmployeeRepo;
		public EmployeeController(IEmployeeRepository employeeRepo)
		{
			EmployeeRepo = employeeRepo;
		}

		[HttpGet, Produces("application/json")]
		public async Task<IActionResult> GetAllEmployees()
		{
			var data = await EmployeeRepo.GetAllEmployees();
			return Json(new { result = data });
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteEmployee(string id)
		{
			return Json(await EmployeeRepo.DeleteEmployee(id));
		}
	}
}