using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLibrary.Models
{
	public partial class LocationDBContext : DbContext
	{
		private DbSet<Locations> _locations;
		private DbSet<SelfInfo> _selfInfo;
		private DbSet<Employers> _erpEmployers;

		public virtual DbSet<Locations> Locations { get => _locations; set => _locations = value; }
		public virtual DbSet<SelfInfo> SelfInfo { get => _selfInfo; set => _selfInfo = value; }
		public virtual DbSet<Employers> Employers { get => _erpEmployers; set => _erpEmployers = value; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
				optionsBuilder.UseSqlServer(@"Server=tasdbtest;Database=HRDW;Trusted_Connection=True;");

			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Locations>(entity =>
			{
				entity.ToTable("HRDW_Locations");
				entity.HasKey(e => e.LocationID);
			});

			modelBuilder.Entity<SelfInfo>(entity =>
			{
				entity.ToTable("HRDW_Employee_SelfInfo");
				entity.HasKey(e => e.UniversalGUID);
				entity.Property(e => e.LocationID)
					.HasMaxLength(50);
				entity.Property(e => e.ERPEmployerID)
					.HasMaxLength(50);
			});

			modelBuilder.Entity<Employers>(entity =>
			{
				entity.ToTable("HRDW_ERPEmployers");
			});

			
		}
	}
}
