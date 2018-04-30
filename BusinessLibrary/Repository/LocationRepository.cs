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
	public class LocationRepository : ILocationRepository
	{
		public async Task<List<Location>> GetAllLocations()
		{
			using (LocationDBContext db = new LocationDBContext())
			{
				return await (from l in db.Locations
								select new Location
								{
									LocationID = l.LocationID.Trim(),
									ERPEmployerID = l.ERPEmployerID.Trim(),
									Name = l.Name.Trim(),
									Address1 = l.Address1,
									Address2 = l.Address2,
									City = l.City,
									State = l.State,
									ZIP = l.ZIP,
									Country = l.Country,
									Active = l.Active ,
									ADCountryCode = l.ADCountryCode,
									ADCountryAbrv = l.ADCountryAbrv									
								}).ToListAsync();

			}
		}

		public async Task<bool> SaveLocation(Location model)
		{
			using (LocationDBContext db = new LocationDBContext())
			{
				Locations location = db.Locations.Where(x => x.LocationID == model.LocationID).FirstOrDefault();
				if (location == null)
				{
					location = new Locations()
					{
						LocationID = model.LocationID.Trim(),
						ERPEmployerID = model.ERPEmployerID.Trim(),
						Name = model.Name.Trim(),
						Address1 = model.Address1,
						Address2 = model.Address2,
						City = model.City,
						State = model.State,
						ZIP = model.ZIP,
						Country = model.Country,
						Active = model.Active ?? null,
						ADCountryAbrv = model.ADCountryAbrv,
						ADCountryCode = model.ADCountryCode ?? null
					};
					db.Locations.Add(location);

				}
				else
				{
					location.LocationID = model.LocationID.Trim();
					location.ERPEmployerID = model.ERPEmployerID.Trim();
					location.Name = model.Name.Trim();
					location.Address1 = model.Address1;
					location.Address2 = model.Address2;
					location.City = model.City;
					location.State = model.State;
					location.ZIP = model.ZIP;
					location.Country = model.Country;
					location.Active = model.Active;
					location.ADCountryAbrv = model.ADCountryAbrv;
					location.ADCountryCode = Convert.ToInt32(model.ADCountryCode);
				}

				return await db.SaveChangesAsync() >= 1;
			}
		}

		//public async Task<bool> DeleteLocationByID(int id)
		//{
		//	using (ContactDBContext db = new ContactDBContext())
		//	{

		//		Contacts contact = db.Contacts.Where(x => x.ContactId == id).FirstOrDefault();
		//		if (contact != null)
		//		{
		//			db.Locations.Remove(contact);
		//		}
		//		return await db.SaveChangesAsync() >= 1;
		//	}
		//}

		public async Task<List<SelfInfo>> GetSelfInfoLocations()
		{
			using (LocationDBContext db = new LocationDBContext())
			{
				return await (from si in db.SelfInfo
							  select new SelfInfo
							  {
								  LocationID = si.LocationID.Trim()
							  }).Distinct().ToListAsync();

			}
		}

		public async Task<List<SelfInfo>> GetSelfInfoEmployers()
		{
			using (LocationDBContext db = new LocationDBContext())
			{
				return await (from si in db.SelfInfo
							  select new SelfInfo
							  {
								  EmployerID = si.ERPEmployerID.Trim()
							  }).Distinct().ToListAsync();

			}
		}

		public async Task<List<Employer>> GetAllEmployers()
		{
			using (LocationDBContext db = new LocationDBContext())
			{
				return await (from e in db.Employers
							  select new Employer
							  {
								  ERPEmployerID = e.ERPEmployerID.Trim(),
								  EmployerName = e.EmployerName,
								  Active = e.Active
							  }).Distinct().ToListAsync();
			}
		}

	}
}

