using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Model
{
	public class Location
	{
		public string ERPEmployerID { get; set; }
		public string LocationID { get; set; }
		public string Name { get; set; }
		public string Address1 { get; set; }
		public string Address2 { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public string ZIP { get; set; }
		public string Country { get; set; }
		public bool? Active { get; set; }
		public int? ADCountryCode { get; set; }
		public string ADCountryAbrv { get; set; }

	}
}
