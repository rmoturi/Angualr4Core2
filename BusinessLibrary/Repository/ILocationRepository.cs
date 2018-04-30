using System;
using System.Collections.Generic;
using System.Text;
using BusinessLibrary.Model;
using System.Threading.Tasks;

namespace BusinessLibrary
{
	public interface ILocationRepository
    {
		Task<List<Location>> GetAllLocations();
		Task<bool> SaveLocation(Location model);
	
		Task<List<SelfInfo>> GetSelfInfoLocations();
		Task<List<SelfInfo>> GetSelfInfoEmployers();

		Task<List<Employer>> GetAllEmployers();
	}
}
