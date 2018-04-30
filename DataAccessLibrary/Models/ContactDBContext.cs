using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLibrary.Models
{
	public partial class ContactDBContext : DbContext
	{
		private DbSet<Contacts> _contacts;

		public virtual DbSet<Contacts> Contacts { get => _contacts; set => _contacts = value; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
				optionsBuilder.UseSqlServer(@"Server=tasdbtest;Database=Takatanet;Trusted_Connection=True;");
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Contacts>(entity =>
			{
				entity.HasKey(e => e.ContactId);

				entity.Property(e => e.Email)
					.HasMaxLength(50)
					.IsUnicode(false);

				entity.Property(e => e.FirstName)
					.HasMaxLength(50)
					.IsUnicode(false);

				entity.Property(e => e.LastName)
					.HasMaxLength(50)
					.IsUnicode(false);

				entity.Property(e => e.Phone)
					.HasMaxLength(50)
					.IsUnicode(false);

				entity.Property(e => e.Active);
			});
		}
	}
}