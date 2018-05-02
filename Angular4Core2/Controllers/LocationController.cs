using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Model;
using BusinessLibrary;
using Microsoft.EntityFrameworkCore;

namespace Angular4Core2.Controllers
{
    public class LocationController : Controller
    {
		public ILocationRepository LocationRepo;

		public LocationController(ILocationRepository locationRepo)
		{
			LocationRepo = locationRepo;
		}

		[HttpGet, Produces("application/json")]
		public async Task<IActionResult> GetLocations()
		{
			var data = await LocationRepo.GetAllLocations();
			return Json(new { result = data });
		}

		[HttpPost, Produces("application/json")]
		public async Task<IActionResult> SaveLocation([FromBody] Location model)
		{
			return Json(await LocationRepo.SaveLocation(model));
		}

		//[HttpDelete]
		//public async Task<IActionResult> DeleteLocationByID(int id)
		//{
		//    return Json(await LocationRepo.DeleteLocationByID(id));
		//}


		[HttpGet, Produces("application/json")]
		public async Task<IActionResult> GetSelfInfoLocations()
		{
			var data = await LocationRepo.GetSelfInfoLocations();
			return Json(new { result = data });
		}

		[HttpGet, Produces("application/json")]
		public async Task<IActionResult> GetSelfInfoEmployers()
		{
			var data = await LocationRepo.GetSelfInfoEmployers();
			return Json(new { result = data });
		}

		[HttpGet, Produces("application/json")]
		public async Task<IActionResult> GetAllEmployers()
		{
			var data = await LocationRepo.GetAllEmployers();
			return Json(new { result = data });
		}

		

	}
}