namespace IamHome.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using IamHome.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<IamHome.Models.IamHomeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(IamHome.Models.IamHomeContext context)
        {
            context.Users.AddOrUpdate(x => x.Id,
                new User() { Id = 1, Name = "Janne", Email = "a@a.com", PhoneNumber = 123, Status = true },
                new User() { Id = 2, Name = "Robert", Email = "b@b.com", PhoneNumber = 456, Status = false },
                new User() { Id = 3, Name = "Jon", Email = "c@c.com", PhoneNumber = 789, Status = true }
            );

        }
    }
}
