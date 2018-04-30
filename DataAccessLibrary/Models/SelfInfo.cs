using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLibrary.Models
{

	public partial class SelfInfo
	{
		[Key]
		public string UniversalGUID { get; set; }
		public string LocationID { get; set; }
		public string ERPEmployerID { get; set; }
	}

}
